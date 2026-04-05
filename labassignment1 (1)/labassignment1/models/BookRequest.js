const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    book:    { type: mongoose.Schema.Types.ObjectId, ref: 'Book',    required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status:  { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    requestDate: { type: Date, default: Date.now },
    issueDate:   { type: Date, default: null }
});

module.exports = mongoose.model('BookRequest', requestSchema);
