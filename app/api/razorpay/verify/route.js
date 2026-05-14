import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function POST(request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      studentName,
      studentPhone,
      amount
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database logic
      await connectToDatabase();
      
      const newSubmission = await Submission.create({
        studentName,
        studentPhone,
        transactionId: razorpay_payment_id, // Using payment ID as transaction ID
        amount: amount || '50',
      });

      return NextResponse.json({ 
        success: true, 
        message: "Payment verified successfully",
        submissionId: newSubmission._id
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Payment verification failed" 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
