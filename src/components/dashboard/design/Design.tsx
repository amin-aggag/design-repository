import { useNavigate, useViewTransitionState } from "react-router";
import "./Design.css";
import { useLayoutEffect, useRef } from "react";
import {
  getLastOpenedDesign,
  setLastOpenedDesign,
  type DesignOrigin,
} from "./lastOpenedDesign";

export function Design({ id, origin }: { id: number; origin: DesignOrigin }) {
  const navigate = useNavigate();
  const to = `/edit/${id}`;
  const isTransitioning = useViewTransitionState(to);
  const lastOpened = getLastOpenedDesign();
  const isTransitionTarget =
    isTransitioning && lastOpened?.origin === origin;

  const designElementRef = useRef<HTMLDivElement>(null);

  // Mounting mid-transition means we're returning from this design's Edit page.
  // This must run in a layout effect so the scroll lands before the browser
  // captures the new view transition snapshot.
  useLayoutEffect(() => {
    if (!isTransitionTarget || !lastOpened) return;
    window.scrollTo({ top: lastOpened.scrollY, behavior: "instant" });
    designElementRef.current?.scrollIntoView({
      block: "center",
      behavior: "instant",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const handleOnClick: React.MouseEventHandler<HTMLDivElement> = () => {
        const root = document.documentElement;
        root.style.setProperty('--start-radius', '8px');
        root.style.setProperty('--end-radius', '0px');

      setLastOpenedDesign({ origin, scrollY: window.scrollY });
    navigate(to, { viewTransition: true });
  };
  return (
    <div className="design" onClick={handleOnClick} ref={designElementRef}>
      <div className="design-image-wrapper">
        <img
          className="design-image"
          src="/image.png"
          style={{
            viewTransitionName: isTransitionTarget ? "design-image" : "",
          }}
        />
      </div>
      <div className="design-name">
        <h4>Design</h4>
      </div>
    </div>
  );
}
