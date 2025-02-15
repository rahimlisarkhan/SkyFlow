export function toTitleCaseWithSpace(text: string | null): string {
  const safeText = text || '';
  return safeText
    .split('_')
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(' ');
}

export function ellipsisText(text: string = '', maxLength: number): string {
  if (typeof text !== 'string') {
    text = String(text || '');
  }
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
