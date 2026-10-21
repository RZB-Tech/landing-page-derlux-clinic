/**
 * Applies one language's texts, keyed by `id`, over the Russian source items. A missing id fails
 * the build, so no card shows up half-translated.
 */
export function translate<T extends { id: string }, P>(
  items: T[],
  texts: Record<string, P>,
  merge: (item: T, text: P) => T,
): T[] {
  return items.map((item) => {
    const text = texts[item.id];
    if (!text) throw new Error(`Missing translation for "${item.id}"`);
    return merge(item, text);
  });
}
