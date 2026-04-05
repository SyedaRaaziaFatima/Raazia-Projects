const User = require('../models/User');
const Issue = require('../models/Issue');

// Register
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'All fields required' });
        }

        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = new User({ username, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username & password required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // ✅ Return clean user object
        res.json({
            success: true,
            user: {
                username: user.username,
                role: user.role,
                studentId: user.studentId || null
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout (frontend handles it)
exports.logoutUser = (req, res) => {
    res.json({ message: 'Logout on frontend' });
};

// Link student
exports.linkStudent = async (req, res) => {
    try {
        const { username, studentId } = req.body;

        if (!username || !studentId) {
            return res.status(400).json({ error: 'Username & studentId required' });
        }

        await User.findOneAndUpdate({ username }, { studentId });

        res.json({ message: 'Student linked successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get issued books
exports.getMyBooks = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        if (!studentId) {
            return res.status(400).json({ error: 'StudentId required' });
        }

        const issues = await Issue.find({ student: studentId })
            .populate('book')
            .populate('student');

        res.json(issues);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};