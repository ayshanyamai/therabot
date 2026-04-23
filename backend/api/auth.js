import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

export default async function handler(req, res) {
  // Apply CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      if (req.url.endsWith('/register')) {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create user
        const user = await User.create({
          name,
          email,
          password,
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: user.getProfile(),
        });
      } else if (req.url.endsWith('/login')) {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
          return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
          message: 'Login successful',
          token,
          user: user.getProfile(),
        });
      } else {
        res.status(404).json({ message: 'Endpoint not found' });
      }
    } else if (req.method === 'GET') {
      if (req.url.endsWith('/me')) {
        // Apply protect middleware
        await protect(req, res, async () => {
          res.json({
            user: req.user.getProfile(),
          });
        });
      } else {
        res.status(404).json({ message: 'Endpoint not found' });
      }
    } else if (req.method === 'PUT') {
      if (req.url.endsWith('/profile')) {
        // Apply protect middleware
        await protect(req, res, async () => {
          const { name, avatar } = req.body;
          
          const user = await User.findById(req.user._id);
          
          if (name) user.name = name;
          if (avatar) user.avatar = avatar;
          
          await user.save();

          res.json({
            message: 'Profile updated successfully',
            user: user.getProfile(),
          });
        });
      } else {
        res.status(404).json({ message: 'Endpoint not found' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
