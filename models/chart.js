import mongoose from 'mongoose';

const chartSchema = new mongoose.Schema({
    name: String,
    value: Number
})

module.exports = mongoose.model('Chart', chartSchema)