// Blog posts come only from the database (admin → Blogs, /api/blogs). Only
// published posts are shown. One shared fetch per page load, plus the rules
// every component uses for a post's URL, image, excerpt and search meta.
import { useEffect, useState } from 'react';
import config from '../config';
import seoData from '../data/seoPages.json';
import { fitTitle, fitDescription } from './textFit';

const FALLBACK_IMAGE = '/assets/images/blog/blog_web_engineering.webp';

/** Drafts and scheduled posts stay in the admin panel. */
export const isPublished = (post) => !post.status || /^published$/i.test(String(post.status).trim());

const byNewest = (a, b) => String(b.date || '').localeCompare(String(a.date || '')) || b.id - a.id;

let listRequest = null;

/** Published posts, newest first (cached for the page load; retried after a failure). */
export const fetchBlogs = () => {
  if (!listRequest) {
    listRequest = fetch(`${config.API_BASE_URL}/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error(`Blog request failed (${res.status})`);
        return res.json();
      })
      .then((data) => (Array.isArray(data) ? data.filter(isPublished).sort(byNewest) : []))
      .catch((error) => {
        listRequest = null;
        throw error;
      });
  }
  return listRequest;
};

/** { posts, loading, error } for components. */
export const useBlogs = () => {
  const [state, setState] = useState({ posts: [], loading: true, error: null });
  useEffect(() => {
    let active = true;
    fetchBlogs()
      .then((posts) => active && setState({ posts, loading: false, error: null }))
      .catch((error) => active && setState({ posts: [], loading: false, error }));
    return () => {
      active = false;
    };
  }, []);
  return state;
};

/** One published post by slug or numeric id, with every field; null when it doesn't exist. */
export const fetchBlog = async (idOrSlug) => {
  let id = idOrSlug;
  if (!/^\d+$/.test(String(idOrSlug))) {
    const match = (await fetchBlogs()).find((post) => post.slug === idOrSlug);
    if (!match) return null;
    id = match.id;
  }
  const res = await fetch(`${config.API_BASE_URL}/blogs/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog request failed (${res.status})`);
  const post = await res.json();
  return post && post.title && isPublished(post) ? post : null;
};

/** Canonical URL path: the slug when the post has one. */
export const blogPath = (post) => `/blog/${post.slug || post.id}`;

export const blogImage = (post) => {
  const image = post.image;
  if (!image) return FALLBACK_IMAGE;
  if (/^(https?:|data:|\/)/.test(image)) return config.getImageUrl(image);
  return `/assets/images/blog/${image}${image.includes('.') ? '' : '.webp'}`;
};

/** Card summary: the post's own excerpt, else the start of its text (max 150). */
export const blogExcerpt = (post) => fitDescription(post.excerpt || post.body, 150);

/** "Nov 3, 2026" from the stored date (kept as-is when it isn't a date). */
export const blogDate = (post) => {
  const parsed = post.date ? new Date(post.date) : null;
  return parsed && !Number.isNaN(parsed.getTime())
    ? parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : post.date || '';
};

/**
 * Title (max 60 characters) and description (max 160), from the post's SEO
 * fields in the admin panel, else its title and excerpt.
 */
export const getBlogSeo = (post) => {
  const base = (post.seo_title || post.title || '').trim();
  const title = [`${base} | Codigix Blog`, base].find((candidate) => candidate.length <= 60) || fitTitle(base, 60);
  const description = fitDescription(post.seo_description || post.excerpt || post.body, 160);
  return { title, description, canonical: `${seoData.siteUrl}${blogPath(post)}` };
};
