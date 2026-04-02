const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .populate('userId', 'name email phone')
      .select('-createdAt');

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email phone address');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor profile
router.put('/:id', async (req, res) => {
  try {
    let doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Populate userId field for immediate display
    doctor = await Doctor.findById(doctor._id).populate('userId', 'name email phone address');

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctors by specialization
router.get('/specialization/:spec', async (req, res) => {
  try {
    const doctors = await Doctor.find({ specialization: req.params.spec, isActive: true })
      .populate('userId', 'name email phone');

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get authenticated doctor's profile
router.get('/profile/:doctorId', authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
      .populate('userId', 'name email phone address');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    // Check if this is the authenticated doctor
    if (doctor.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create doctor profile (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Only doctors can create their own profile
    if (req.userRole !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can create a profile' });
    }

    const { specialization, licenseNumber, yearsOfExperience, qualifications, bio, availableHours, consultationFee, profileImage } = req.body;

    // Check if doctor profile already exists
    let doctor = await Doctor.findOne({ userId: req.userId });
    if (doctor) {
      return res.status(400).json({ message: 'Doctor profile already exists' });
    }

    doctor = new Doctor({
      userId: req.userId,
      specialization,
      licenseNumber,
      yearsOfExperience,
      qualifications,
      bio,
      availableHours,
      consultationFee,
      profileImage,
    });

    await doctor.save();

    // Populate userId field for immediate display
    doctor = await Doctor.findById(doctor._id).populate('userId', 'name email phone address');

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
