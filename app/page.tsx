'use client';
import { useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleCreatePost = async (post: { title: string; content: string }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleUpdatePost = async (id: string, post: { title: string; content: string }) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bulletin Board</h1>
      <PostForm onSubmit={handleCreatePost} />
      <PostList 
        posts={posts}
        onDelete={handleDeletePost}
        onUpdate={handleUpdatePost}
      />
    </main>
  );
}
