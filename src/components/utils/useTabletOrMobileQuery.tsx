import { useSyncExternalStore } from "react";

const TABLET_OR_MOBILE_QUERY = "(max-width: 850px)";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(TABLET_OR_MOBILE_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(TABLET_OR_MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useTabletOrMobileQuery() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
