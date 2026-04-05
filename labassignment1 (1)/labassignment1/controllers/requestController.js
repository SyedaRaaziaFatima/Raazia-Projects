const BookRequest = require('../models/BookRequest');
const Issue       = require('../models/Issue');
const Book        = require('../models/Book');
exports.createRequest = async (req, res) => {
    try {
        const { bookId, studentId } = req.body;
        const book = await Book.findById(bookId);
        if (!book || book.quantity < 1) return res.status(400).json({ error: 'Book not available' });
        const existing = await BookRequest.findOne({ book: bookId, student: studentId, status: 'Pending' });
        if (existing) return res.status(400).json({ error: 'Request already pending for this book' });
        const request = await BookRequest.create({ book: bookId, student: studentId });
        res.status(201).json({ message: 'Request sent!', request });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await BookRequest.find()
            .populate('book').populate('student')
            .sort({ requestDate: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.acceptRequest = async (req, res) => {
    try {
        const request = await BookRequest.findById(req.params.id).populate('book');
        if (!request) return res.status(404).json({ error: 'Request not found' });
        if (request.status !== 'Pending') return res.status(400).json({ error: 'Already processed' });

        const book = await Book.findById(request.book._id);
        if (!book || book.quantity < 1) return res.status(400).json({ error: 'Book no longer available' });

        const issue = await Issue.create({ book: request.book._id, student: request.student });
        book.quantity -= 1;
        await book.save();

        request.status = 'Approved';
        request.issueDate = issue.issueDate;
        await request.save();

        res.json({ message: 'Request approved and book issued!', issue });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.rejectRequest = async (req, res) => {
    try {
        const request = await BookRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });
        request.status = 'Rejected';
        await request.save();
        res.json({ message: 'Request rejected' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
