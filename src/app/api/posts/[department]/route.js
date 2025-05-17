import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

function getPosts() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function GET(request, { params }) {
  try {
    const { department } = params;
    const allPosts = getPosts();

    if (department.toLowerCase() === 'all') {
      return NextResponse.json(allPosts);
    }

    const filteredPosts = allPosts.filter(
      (post) => post.department.toLowerCase() === department.toLowerCase()
    );

    return NextResponse.json(filteredPosts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching posts', error: error.message },
      { status: 500 }
    );
  }
}
