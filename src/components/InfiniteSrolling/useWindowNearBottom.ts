import { useEffect, useRef } from "react";

/**
 * Custom React hook that triggers a callback whenever
 * the user scrolls near the bottom of the window.
 *
 * @param {Function} onNearBottom - callback function to run when user nears bottom
 * @param {number} thresholdPx - how many pixels from bottom to trigger (default = 300)
 *
 * Usage:
 * useWindowNearBottom(() => {
 *   // load more data when user nears bottom
 * }, 400);
 */
function useWindowNearBottom(onNearBottom: () => void, thresholdPx = 300) {
  // `ticking` flag prevents multiple requestAnimationFrame calls per scroll frame.
  // This ensures we don’t run the expensive scroll logic too often.
  const ticking = useRef(false);

  useEffect(() => {
    // The scroll handler will be attached to the window
    function onScroll() {
      // If we're already in a rAF cycle, skip this event
      if (ticking.current) return;

      // Mark that a frame is in progress
      ticking.current = true;

      // Use requestAnimationFrame to throttle updates for smoother performance
      requestAnimationFrame(() => {
        // documentElement for most browsers; fallback to body for older ones
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop; // pixels scrolled vertically
        const viewportH = window.innerHeight; // visible height of the window
        const docH = doc.scrollHeight; // total scrollable document height

        // Distance from bottom of document
        const distanceToBottom = docH - (scrollTop + viewportH);

        // If we're within threshold distance from the bottom, trigger callback
        if (distanceToBottom <= thresholdPx) onNearBottom();

        // Reset ticking so the next scroll event can trigger another rAF
        ticking.current = false;
      });
    }

    // Attach scroll event listener on window
    // `{ passive: true }` tells the browser we won't call preventDefault(),
    // improving performance and scroll smoothness
    window.addEventListener("scroll", onScroll, { passive: true });

    // Fire once immediately in case content is shorter than the viewport
    // (i.e., no scroll yet but we still want to fetch initial data)
    onScroll();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", onScroll);
  }, [onNearBottom, thresholdPx]); // re-run effect if callback or threshold changes
}

export default useWindowNearBottom;
