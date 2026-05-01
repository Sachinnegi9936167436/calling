import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedSubmission = await Submission.findByIdAndDelete(id);

    if (!deletedSubmission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Submission deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
