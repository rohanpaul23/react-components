import { useEffect, useRef } from "react";

/**
 * Custom hook that triggers `onIntersect` when a "sentinel" element
 * near the bottom of the page becomes visible.
 *
 * @param {Function} onIntersect - callback to execute when sentinel enters viewport
 * @param {Object} options - IntersectionObserver options (rootMargin, threshold)
 *
 * Usage:
 * const bottomRef = useRef(null);
 * useIntersectionObserver(bottomRef, () => {
 *   // Load more data here
 * }, { rootMargin: "300px" });
 *
 * <div ref={bottomRef} />  // Place this at the end of your list
 */
function useIntersectionObserver(
  targetRef: React.RefObject<Element>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { root: null, rootMargin: "300px", threshold: 0 }
) {
  // keep a stable reference to the callback to avoid re-subscribing too often
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return; // if element not yet rendered

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // When the element is visible (intersecting with viewport)
        if (entry.isIntersecting) {
          // Trigger the latest version of the callback
          callbackRef.current();
        }
      });
    }, options);

    // Start observing the target element
    observer.observe(target);

    // Clean up observer on unmount
    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [targetRef, options]); // re-subscribe if target or options change
}

export default useIntersectionObserver;
