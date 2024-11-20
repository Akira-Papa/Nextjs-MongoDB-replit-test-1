import { useState } from 'react';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, post: { title: string; content: string }) => Promise<void>;
}

export default function PostList({ posts, onDelete, onUpdate }: PostListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const startEditing = (post: Post) => {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (id: string) => {
    await onUpdate(id, { title: editTitle, content: editContent });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow">
          {editingId === post._id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-md border-gray-300"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full rounded-md border-gray-300"
                rows={4}
              />
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(post._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEditing(post)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(post._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
