import React from 'react';

// Splits an SEO H1 into [before, highlight, after]. Highlights the primary
// keyword when the heading contains it, otherwise the phrase after the last
// "for" / "at" so the gradient still lands on the tail like the original design.
const splitHeading = (text, keyword) => {
  const index = keyword ? text.toLowerCase().indexOf(keyword.toLowerCase()) : -1;
  if (index !== -1) {
    return [text.slice(0, index), text.slice(index, index + keyword.length), text.slice(index + keyword.length)];
  }
  const tail = text.match(/^(.*\s(?:for|at)\s)(.+)$/);
  return tail ? [tail[1], tail[2], ''] : [text, '', ''];
};

const SeoHeading = ({ text, keyword, gradientClassName }) => {
  const [before, highlight, after] = splitHeading(text, keyword);
  return (
    <>
      {before}
      {highlight && <span className={gradientClassName}>{highlight}</span>}
      {after}
    </>
  );
};

export default SeoHeading;
