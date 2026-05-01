import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Submission from '@/models/Submission';

export const dynamic = 'force-dynamic'; // Prevent caching of this route

export async function GET() {
  try {
    await connectToDatabase();

    const submissions = await Submission.find({}).sort({ timestamp: -1 });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
