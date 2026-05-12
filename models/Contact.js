import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
