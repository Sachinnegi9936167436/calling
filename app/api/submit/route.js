import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function POST(request) {
  try {
    const data = await request.json();
    const { studentName, studentPhone, transactionId, amount } = data;

    if (!studentName || !studentPhone || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Create new submission
    const newSubmission = await Submission.create({
      studentName,
      studentPhone,
      transactionId,
      amount: amount || '10',
    });

    return NextResponse.json({ success: true, submission: newSubmission }, { status: 201 });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
