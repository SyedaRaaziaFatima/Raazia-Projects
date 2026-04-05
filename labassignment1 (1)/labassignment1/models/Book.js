const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Science', 'IT', 'Math', 'Fiction', 'Other']
    },
    isbn: {
        type: String,
        unique: true,
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', bookSchema);