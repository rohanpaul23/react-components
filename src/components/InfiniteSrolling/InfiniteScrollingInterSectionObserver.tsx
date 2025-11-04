import React, { useRef, useState, useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export default function InfinitePostsWithIO() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function fetchPosts() {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/posts?limit=20&skip=${skip}`);
    const data = await res.json();
    setPosts((prev) => [...prev, ...data.posts]);
    setSkip((prev) => prev + data.limit);
    if (skip + data.limit >= data.total) setHasMore(false);
    setLoading(false);
  }

  // Reference to the sentinel div at the bottom of the page
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Trigger load when sentinel appears in view
  useIntersectionObserver(sentinelRef, fetchPosts, { rootMargin: "400px" });

  useEffect(() => {
    fetchPosts(); // initial load
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h1>Infinite Scroll with IntersectionObserver</h1>
      {posts.map((p) => (
        <article key={p.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
        </article>
      ))}

      {loading && <div>Loading...</div>}
      {!hasMore && <div>All posts loaded ✅</div>}

      {/* Sentinel element for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
