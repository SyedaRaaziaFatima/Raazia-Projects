const Issue = require('../models/Issue');
const Book = require('../models/Book');
const Student = require('../models/Student');

exports.issueBook = async (req, res) => {
    try {
        const { bookId, studentId } = req.body;

        const book = await Book.findById(bookId);
        if (!book || book.quantity < 1) return res.status(400).json({ error: 'Book not available' });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        const issue = new Issue({ book: bookId, student: studentId });
        await issue.save();
        book.quantity -= 1;
        await book.save();
        res.status(201).json({ message: 'Book issued successfully', issue });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('book');
        if (!issue || issue.status === 'Returned') return res.status(400).json({ error: 'Invalid return request' });

        issue.status = 'Returned';
        issue.returnDate = new Date();

        const dueDays = 7; 
        const diffTime = issue.returnDate - issue.issueDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > dueDays) {
            issue.fine = (diffDays - dueDays) * 10; 
        }

        await issue.save();

        const book = await Book.findById(issue.book._id);
        book.quantity += 1;
        await book.save();

        res.json({ message: 'Book returned', issue });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getIssuedBooks = async (req, res) => {
    try {
        const issues = await Issue.find().populate('book').populate('student');
        res.json(issues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};