import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Post from '../../../../models/Post';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const data = await request.json();
    const post = await Post.findByIdAndUpdate(params.id, { ...data, updatedAt: Date.now() }, { new: true });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
