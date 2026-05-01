import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { studentName, studentPhone, transactionId, amount } = data;

    if (!studentName || !studentPhone || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use /tmp on Vercel, otherwise local data directory
    const isVercel = process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_URL;
    const dirPath = isVercel ? '/tmp' : path.join(process.cwd(), 'data');
    const filePath = path.join(dirPath, 'submissions.json');
    
    // Read existing submissions
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      // If file doesn't exist, we will just use '[]'
      if (error.code !== 'ENOENT') throw error;
    }

    const submissions = JSON.parse(fileContents || '[]');
    
    // Create new submission
    const newSubmission = {
      id: Date.now().toString(),
      studentName,
      studentPhone,
      transactionId,
      amount: amount || '10',
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    // Save to file
    try {
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf8');
    } catch (writeError) {
      console.error('Failed to write file:', writeError);
      // Return 200 anyway so frontend doesn't crash, but it won't be saved
      return NextResponse.json({ success: true, warning: 'Could not save to disk', submission: newSubmission }, { status: 200 });
    }

    return NextResponse.json({ success: true, submission: newSubmission }, { status: 201 });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
