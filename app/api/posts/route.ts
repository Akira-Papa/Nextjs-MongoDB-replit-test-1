import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const post = await Post.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
