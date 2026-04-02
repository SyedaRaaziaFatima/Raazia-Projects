const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const authMiddleware = require('../middleware/auth');

// Get all appointments (with filters)
router.get('/', async (req, res) => {
  try {
    const { patientId, doctorId, status } = req.query;
    const filter = {};

    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'userId specialization')
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, reason, description } = req.body;

    // Verify the user is the patient (or is booking for themselves)
    if (patientId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for appointment conflicts
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['scheduled', 'rescheduled'] },
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      description,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (appointment.patientId.toString() !== req.userId && 
        appointment.doctorId.toString() !== req.userId && 
        req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel appointment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (appointment.patientId.toString() !== req.userId && 
        appointment.doctorId.toString() !== req.userId && 
        req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const cancelledAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Appointment cancelled', appointment: cancelledAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's appointments (patient or doctor)
router.get('/user/appointments', authMiddleware, async (req, res) => {
  try {
    let appointments;

    if (req.userRole === 'patient') {
      appointments = await Appointment.find({ patientId: req.userId })
        .populate('doctorId', 'userId specialization')
        .sort({ appointmentDate: 1 });
    } else if (req.userRole === 'doctor') {
      // For doctor, need to find their doctor ID first
      const doctorProfile = await Doctor.findOne({ userId: req.userId });
      
      if (!doctorProfile) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }

      appointments = await Appointment.find({ doctorId: doctorProfile._id })
        .populate('patientId', 'name email phone')
        .sort({ appointmentDate: 1 });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor's appointments
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'name email phone')
      .sort({ appointmentDate: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
