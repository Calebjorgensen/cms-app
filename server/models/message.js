const mongoose = require('mongoose');

// Define the schema for a message
const messageSchema = mongoose.Schema({
   id: { type: String, required: true },
   subject: { type: String },
   msgText: { type: String, required: true },
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
});

// Export the model
module.exports = mongoose.model('Message', messageSchema);
