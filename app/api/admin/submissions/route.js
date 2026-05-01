import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const isVercel = process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const dirPath = isVercel ? '/tmp' : path.join(process.cwd(), 'data');
    const filePath = path.join(dirPath, 'submissions.json');
    
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    const submissions = JSON.parse(fileContents || '[]');
    
    // Sort submissions by timestamp descending (newest first)
    submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
