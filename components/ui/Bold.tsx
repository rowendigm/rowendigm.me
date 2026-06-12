import { Fragment, type ReactElement, type ReactNode } from "react";

/** Renders the **bold** markers used in content copy. Keys are the
 *  segment's character offset in the source string, stable by content. */
export function Bold({ text }: { text: string }): ReactElement {
  const nodes: ReactNode[] = [];
  let offset = 0;
  let emphasized = false;
  for (const part of text.split("**")) {
    if (part) {
      nodes.push(
        emphasized ? (
          <strong key={offset} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={offset}>{part}</Fragment>
        ),
      );
    }
    offset += part.length + 2;
    emphasized = !emphasized;
  }
  return <>{nodes}</>;
}
