// Case studies come only from the database (admin → Case Studies, /api/projects).
// One shared fetch per page load, plus the rules every component uses for a
// study's URL, client, image, results and search meta.
import { useEffect, useState } from 'react';
import config from '../config';
import seoData from '../data/seoPages.json';

const FALLBACK_IMAGE = '/assets/images/service/erp_dash.webp';
const BRAND = 'Codigix Infotech';

let listRequest = null;

/** All published case studies (cached for the page load; retried after a failure). */
export const fetchCaseStudies = () => {
  if (!listRequest) {
    listRequest = fetch(`${config.API_BASE_URL}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error(`Case studies request failed (${res.status})`);
        return res.json();
      })
      .then((data) => (Array.isArray(data) ? data : []))
      .catch((error) => {
        listRequest = null;
        throw error;
      });
  }
  return listRequest;
};

/** { studies, loading, error } for components. */
export const useCaseStudies = () => {
  const [state, setState] = useState({ studies: [], loading: true, error: null });
  useEffect(() => {
    let active = true;
    fetchCaseStudies()
      .then((studies) => active && setState({ studies, loading: false, error: null }))
      .catch((error) => active && setState({ studies: [], loading: false, error }));
    return () => {
      active = false;
    };
  }, []);
  return state;
};

/** One study by slug or numeric id, with every field (detail endpoint). */
export const fetchCaseStudy = async (idOrSlug) => {
  let id = idOrSlug;
  if (!/^\d+$/.test(String(idOrSlug))) {
    const match = (await fetchCaseStudies()).find((study) => study.slug === idOrSlug);
    if (!match) return null;
    id = match.id;
  }
  const res = await fetch(`${config.API_BASE_URL}/projects/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Case study request failed (${res.status})`);
  const study = await res.json();
  return study && study.title ? study : null;
};

export const parseJSONField = (field, fallback) => {
  if (!field) return fallback;
  try {
    return typeof field === 'string' ? JSON.parse(field) : field;
  } catch {
    return fallback;
  }
};

/** Canonical URL path: the slug when the study has one. */
export const caseStudyPath = (study) => `/case-studies/${study.slug || study.id}`;

/** The study's own client field wins over the sidebar specs (which can be copied from another study). */
export const caseStudyClient = (study) =>
  study.client || study.clientName || parseJSONField(study.sidebarSpecs, {}).client || '';

/** "<title> for <client>", unless the title already names the client. */
export const caseStudyHeadline = (study) => {
  const client = caseStudyClient(study);
  return client && !study.title.toLowerCase().includes(client.toLowerCase()) ? `${study.title} for ${client}` : study.title;
};

export const caseStudyImage = (study, { hero = false } = {}) =>
  config.getImageUrl(hero ? study.heroImage || study.image : study.image || study.heroImage) || FALLBACK_IMAGE;

export const caseStudyCategory = (study) => study.category || study.catName || 'Other';

/** Filter tabs: "All" plus the categories that actually have case studies. */
export const getCategoryTabs = (studies) => ['All', ...new Set(studies.map(caseStudyCategory))];

/** [{ value, label }] from results_impact, skipping incomplete rows. */
export const caseStudyResults = (study) =>
  parseJSONField(study.results_impact || study.results, [])
    .map((item) => ({ value: item.val || item.value, label: item.title || item.label }))
    .filter((item) => item.value && item.label);

// Shortens at a word boundary; descriptions end at a full sentence when one fits
const fit = (text, max) => {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentence = clean.slice(0, max).match(/^(.*[.!?])\s/);
  if (sentence && sentence[1].length >= max * 0.6) return sentence[1];
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

/**
 * Title (max 60 characters) and description (max 160). Hand-written values in
 * seoPages.json → caseStudyDetails (keyed by slug) win; new studies get them
 * generated from their own title and summary.
 */
export const getCaseStudySeo = (study) => {
  const written = (seoData.caseStudyDetails || {})[study.slug] || {};
  const title =
    written.title ||
    [`${study.title} Case Study | ${BRAND}`, `${study.title} | ${BRAND}`, `${study.title} Case Study`, study.title].find(
      (candidate) => candidate.length <= 60
    ) ||
    fit(study.title, 60);
  const client = caseStudyClient(study);
  const description =
    written.description ||
    fit(study.subtitle || study.objective || `How ${BRAND} delivered ${study.title}${client ? ` for ${client}` : ''}.`, 160);
  return { title, description, canonical: `${seoData.siteUrl}${caseStudyPath(study)}` };
};
