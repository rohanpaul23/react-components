// File: UsersTable.jsx
// Usage:
// import UsersTable from "./UsersTable";
// const users = [
//   { id: 1, name: "Ada Lovelace", age: 36, occupation: "Mathematician" },
//   { id: 2, name: "Grace Hopper", age: 85, occupation: "Computer Scientist" },
//   ...
// ];
// <UsersTable users={users} initialPageSize={10} pageSizeOptions={[5,10,20]} />

import React, { useEffect, useMemo, useState } from "react";
import "./UsersTable.css";

type User = {
  id: number;
  name: string;
  age: number;
  occupation: string;
};

interface UsersTableProps {
  users?: User[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export default function UsersTable({
  users = [],
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20],
}: UsersTableProps) {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1); // 1-based

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

  // Keep current page in range when page size/users change
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [pageSize, users.length, totalPages]);

  const { slice, from, to } = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, users.length);
    return { slice: users.slice(start, end), from: start + 1, to: end };
  }, [page, pageSize, users]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="users-wrap" role="region" aria-label="Users table with pagination">
      <div className="toolbar">
        <div className="page-size">
          <label htmlFor="pageSize" className="label">Rows per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            aria-label="Select rows per page"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="count" aria-live="polite">
          {users.length === 0 ? "No users" : `Showing ${from}–${to} of ${users.length} users`}
        </div>
      </div>

      <div className="table-scroll">
        <table className="users-table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Occupation</th>
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">No data available</td>
              </tr>
            ) : (
              slice.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.age}</td>
                  <td>{u.occupation}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination" role="navigation" aria-label="Pagination">
        <button
          className="btn"
          onClick={goPrev}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ◀ Prev
        </button>

        <span className="page-info" aria-live="polite">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn"
          onClick={goNext}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}