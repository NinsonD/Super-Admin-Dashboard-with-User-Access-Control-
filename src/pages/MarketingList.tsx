import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import CommentSection from "../components/Comments/CommentSection";

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

const MarketingList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "user">("user");

  // Fetch JWT from localStorage (or context)
  const jwt = localStorage.getItem("jwt");
  const pageKey = "marketing_list";

  useEffect(() => {
    // Fetch comments for this page from backend
    fetch(`/api/comments/?page=${pageKey}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]));

    // Fetch user info and permissions from backend
    fetch("/api/profile/", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.username);
        setUserRole(data.role === "admin" ? "admin" : "user");
        setUserPermissions(data.permissions || []);
      })
      .catch(() => {
        setCurrentUser("");
        setUserRole("user");
        setUserPermissions([]);
      });
  }, [jwt]);

  const handleAddComment = async (content: string) => {
    const res = await fetch("/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ content, page: pageKey }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const handleEditComment = async (id: string, content: string) => {
    const res = await fetch(`/api/comments/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const updated = await res.json();
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? updated : comment))
      );
    }
  };

  const handleDeleteComment = async (id: string) => {
    const res = await fetch(`/api/comments/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (res.ok) {
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} userPermissions={userPermissions} />
      <div className="flex-1 flex flex-col">
        <Header
          userName={currentUser}
          userRole={userRole}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing List</h2>
            <p className="text-gray-600 mt-1">
              Manage marketing campaigns and strategies
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Page Overview
              </h3>
              <p className="text-gray-600">
                This is the Marketing List page. Use the comment section below
                to collaborate on marketing initiatives. Your permissions:{" "}
                {userPermissions.join(", ")}.
              </p>
            </div>
            <CommentSection
              comments={comments}
              userPermissions={userPermissions}
              currentUser={currentUser}
              onAddComment={handleAddComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketingList;
