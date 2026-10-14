import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { fitHeightToContent } from "./annotationHelpers";

export function useFitAnnotationText(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  isVisible: boolean,
) {
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    fitHeightToContent(textarea);
    document.fonts.ready.then(() => fitHeightToContent(textarea));
  }, [textareaRef]);

  useLayoutEffect(() => {
    if (isVisible && textareaRef.current) {
      fitHeightToContent(textareaRef.current);
    }
  }, [isVisible, textareaRef]);
}
