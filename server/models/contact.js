const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   email: { type: String },
   phone: { type: String },
   imageUrl: { type: String },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

// Export the model
module.exports = mongoose.model('Contact', contactSchema);
