import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide a student name'],
  },
  studentPhone: {
    type: String,
    required: [true, 'Please provide a student phone number'],
  },
  transactionId: {
    type: String,
    required: [true, 'Please provide a transaction ID'],
  },
  amount: {
    type: String,
    required: [true, 'Please provide the amount paid'],
    default: '10'
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  contacted: {
    type: Boolean,
    default: false
  }
});

// Use the existing model if it exists, otherwise create it
export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
