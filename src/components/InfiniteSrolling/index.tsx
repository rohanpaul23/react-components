import React, { useCallback, useEffect, useRef, useState } from "react";
import useWindowNearBottom from "./useWindowNearBottom";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions?: unknown;
};

type PostsPage = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

const PAGE_SIZE = 20;

/** Fetch a page using skip/limit */
async function fetchPostsPage(skip = 0, limit = PAGE_SIZE): Promise<PostsPage> {
  const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function InfinitePosts() {
  const [items, setItems] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // protect against accidental duplicates
  const seenIds = useRef<Set<number>>(new Set());
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return; // backpressure
    setLoading(true);
    setError(null);
    try {
      const page = await fetchPostsPage(skip, PAGE_SIZE);

      // merge + de-dup
      const next = page.posts.filter((p) => {
        if (seenIds.current.has(p.id)) return false;
        seenIds.current.add(p.id);
        return true;
      });
      setItems((prev) => prev.concat(next));

      const nextSkip = page.skip + page.limit;
      setSkip(nextSkip);
      if (nextSkip >= page.total || page.posts.length === 0) {
        setHasMore(false);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [skip, hasMore, loading]);

  // initial fill
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // trigger load more when close to bottom
  useWindowNearBottom(() => {
    if (!loading && hasMore) loadMore();
  }, 400); // prefetch ~400px before bottom

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Infinite Posts (no IO, no RQ)</h1>

      {items.map((post) => (
        <article
          key={post.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <h2 style={{ fontSize: 18, margin: "0 0 6px" }}>{post.title}</h2>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{post.body}</p>
        </article>
      ))}

      {error && (
        <div style={{ color: "#b91c1c", margin: "8px 0" }}>
          {error} <button onClick={loadMore} style={{ marginLeft: 8 }}>Retry</button>
        </div>
      )}

      {loading && <div style={{ padding: 12 }}>Loading…</div>}

      {!hasMore && !loading && (
        <div style={{ padding: 12, opacity: 0.7 }}>You’re all caught up ✅</div>
      )}

      {/* Accessibility / manual fallback */}
      {hasMore && !loading && (
        <div style={{ textAlign: "center", padding: 8 }}>
          <button onClick={loadMore}>Load more</button>
        </div>
      )}
    </div>
  );
}
