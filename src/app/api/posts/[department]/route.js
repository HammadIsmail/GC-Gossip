import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Post from '../../../models/posts';

export async function GET(req, context) {
  try {
    await connectToDatabase();

    const department = context.params.department;

    let posts;

    if (department.toLowerCase() === 'all') {
      posts = await Post.find().sort({ createdAt: -1 });
    } else {
      posts = await Post.find({
        department: { $regex: `^${department}$`, $options: 'i' },
      }).sort({ createdAt: -1 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching posts', error: error.message },
      { status: 500 }
    );
  }
}
