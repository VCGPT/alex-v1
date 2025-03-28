import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Connect to test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
});

// Clear database after each test
afterEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
}); 