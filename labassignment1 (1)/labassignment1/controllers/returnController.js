const Issue = require('../models/Issue');
const Book = require('../models/Book');
exports.returnBook = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('book');
        if (!issue || issue.status === 'Returned') {
            return res.status(400).json({ error: 'Invalid return request' });
        }
        issue.status = 'Returned';
        issue.returnDate = new Date();
        const allowedDays = 7;
        const diffTime = issue.returnDate - issue.issueDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > allowedDays) {
            issue.fine = (diffDays - allowedDays) * 10; // 10 currency units per day late
        }
        await issue.save();
        const book = await Book.findById(issue.book._id);
        book.quantity += 1;
        await book.save();
        res.json({ message: 'Book returned successfully', issue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getReturnHistory = async (req, res) => {
    try {
        const returns = await Issue.find({ status: 'Returned' }).populate('book').populate('student');
        res.json(returns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};