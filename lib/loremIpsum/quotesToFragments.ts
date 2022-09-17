export default function quotesToFragments(data: string): string[] {
  const sentences = data.split('\n');

  const fragments: string[] = [];

  function cleanup(str: string): string {
    return str.replace(/[.!?]/g, '').toLowerCase().trim();
  }

  for (const sentence of sentences) {
    const parts = sentence.split(/[.,;!?-]/);

    for (const part of parts) {
      if (part.length > 2) {
        fragments.push(cleanup(part));
      }
    }
  }

  return fragments;
}
