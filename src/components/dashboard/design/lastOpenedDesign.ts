export type DesignOrigin = "recents" | "all";

type LastOpenedDesign = {
  origin: DesignOrigin;
  scrollY: number;
};

const STORAGE_KEY = "lastOpenedDesign";

export function setLastOpenedDesign(design: LastOpenedDesign) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(design));
}

export function getLastOpenedDesign(): LastOpenedDesign | null {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
