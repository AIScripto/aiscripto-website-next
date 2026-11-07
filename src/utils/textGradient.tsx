import React from 'react';

/**
 * Formats a title so that key closing words (or an explicitly provided substring) get
 * the brand accent. The default accent is solid amber; the animated-looking gradient is
 * reserved for the homepage (pass `{ gradient: true }`).
 */
export function formatGradientText(
  text: string,
  highlight?: string,
  { gradient: _gradient = true }: { gradient?: boolean } = {},
): React.ReactNode {
  if (!text) return text;
  const accent = 'text-gradient';

  if (highlight && text.includes(highlight)) {
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className={accent}>{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  }

  // If text contains ' & ', highlight the portion after the ampersand
  if (text.includes(' & ')) {
    const parts = text.split(' & ');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]} &amp; <span className={accent}>{parts[1]}</span>
        </>
      );
    }
  }

  const words = text.trim().split(/\s+/);
  if (words.length <= 1) {
    return <span className={accent}>{text}</span>;
  }
  if (words.length === 2) {
    return (
      <>
        {words[0]} <span className={accent}>{words[1]}</span>
      </>
    );
  }

  // For phrases with 3 to 5 words, highlight the last 1-2 words; for 6+ words, highlight the last 3 words
  const highlightCount = words.length >= 6 ? 3 : words.length >= 4 ? 2 : 1;
  const splitIndex = words.length - highlightCount;
  const prefix = words.slice(0, splitIndex).join(' ');
  const gradientPart = words.slice(splitIndex).join(' ');

  return (
    <>
      {prefix} <span className={accent}>{gradientPart}</span>
    </>
  );
}
