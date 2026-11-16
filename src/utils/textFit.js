// Shortens text for search snippets without cutting words in half.

const strip = (text) =>
  String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Words a shortened title shouldn't end on ("…Manufacturing with")
const DANGLING = /\s+(?:a|an|and|as|at|by|for|from|in|into|of|on|or|the|to|with|&|-|–|\||:)$/i;

/** Page title up to `max` characters, ending on a whole word (no "…"). */
export const fitTitle = (text, max = 60) => {
  const clean = strip(text);
  if (clean.length <= max) return clean;
  let cut = clean.slice(0, max + 1).replace(/\s+\S*$/, '');
  while (DANGLING.test(cut)) cut = cut.replace(DANGLING, '');
  return cut;
};

/**
 * Description up to `max` characters: whole sentences when they fill most of
 * it, else up to the last clause (", ") closed with a full stop, else whole
 * words with "…".
 */
export const fitDescription = (text, max = 160) => {
  const clean = strip(text);
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentence = head.match(/^(.*[.!?])(?:\s|$)/);
  if (sentence && sentence[1].length >= max * 0.6) return sentence[1];
  const clause = head.slice(0, max - 1).match(/^(.*),\s/);
  if (clause && clause[1].length >= max * 0.6) return `${clause[1].replace(/\s+(?:and|or)$/i, '')}.`;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

export const stripHtml = strip;
