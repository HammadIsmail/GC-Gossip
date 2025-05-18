import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Post from '../../../models/posts';
export async function POST(request) {
  try {
    const { header, body, department } = await request.json();

    if (!header || !body || !department) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newPost = await Post.create({
      header,
      body,
      department,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating post', error: error.message },
      { status: 500 }
    );
  }
}
