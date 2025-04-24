import User from '../models/userModel.js';
import Company from '../models/companyModel.js';
import Event from '../models/eventModel.js';
import mongoose from 'mongoose';

const seedDatabase = async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Event.deleteMany({});

    // Create sample users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: true
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456'
    });

    // Create sample companies
    const company1 = await Company.create({
      name: 'TechCorp',
      description: 'A tech company'
    });

    const company2 = await Company.create({
      name: 'Innovate Inc',
      description: 'An innovative company'
    });

    // Create sample events
    const event1 = await Event.create({
      title: 'Tech Conference',
      description: 'A conference about technology',
      date: new Date(),
      location: 'New York',
      organizer: user1._id,
      company: company1._id
    });

    const event2 = await Event.create({
      title: 'Innovation Summit',
      description: 'A summit about innovation',
      date: new Date(),
      location: 'San Francisco',
      organizer: user2._id,
      company: company2._id
    });

    res.status(201).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
};

export { seedDatabase };