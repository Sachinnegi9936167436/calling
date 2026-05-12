import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find({}).sort({ timestamp: -1 });
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
