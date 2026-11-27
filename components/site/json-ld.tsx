/** Renders one or more schema.org objects as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  // Escape "<" so content can never close the script element early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
