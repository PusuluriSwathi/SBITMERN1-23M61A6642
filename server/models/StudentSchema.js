const mongoose= require('mongoose');
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,       
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,   
        required: true
    }
});
module.exports = mongoose.model('Student', StudentSchema);