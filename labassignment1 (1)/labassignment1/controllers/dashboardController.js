// controllers/dashboardController.js
const Book = require('../models/Book');
const Student = require('../models/Student');
const Issue = require('../models/Issue');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalStudents = await Student.countDocuments();
        const issuedBooks = await Issue.countDocuments({ status: 'Issued' });
        const availableBooks = await Book.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
        const overdueBooks = await Issue.countDocuments({ status: 'Issued', issueDate: { $lte: new Date(new Date() - 7*24*60*60*1000) } });

        res.json({
            totalBooks,
            totalStudents,
            issuedBooks,
            availableBooks: availableBooks[0] ? availableBooks[0].total : 0,
            overdueBooks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};