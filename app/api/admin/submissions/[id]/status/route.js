import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }

    if (typeof body.contacted !== 'boolean') {
      return NextResponse.json({ error: 'Invalid contacted status' }, { status: 400 });
    }

    await connectToDatabase();

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      { contacted: body.contacted },
      { new: true } // Return the updated document
    );

    if (!updatedSubmission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, submission: updatedSubmission }, { status: 200 });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
