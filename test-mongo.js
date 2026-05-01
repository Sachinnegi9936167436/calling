import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('No MONGODB_URI found in .env.local');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:');
    console.error(err.message);
    process.exit(1);
  });
