export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
  
  export function getMaxPosition(annotation: HTMLElement | null) {
    const container = annotation?.offsetParent as HTMLElement | null;
    if (!annotation || !container) {
      return { maxTop: Infinity, maxLeft: Infinity };
    }
  
    return {
      maxTop: Math.max(container.clientHeight - annotation.offsetHeight, 0),
      maxLeft: Math.max(container.clientWidth - annotation.offsetWidth, 0),
    };
  }
  
  export function fitHeightToContent(textarea: HTMLTextAreaElement) {
    const { paddingTop, paddingBottom } = getComputedStyle(textarea);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)}px`;
  }