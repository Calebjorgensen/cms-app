const mongoose = require('mongoose');

// Define the schema for a document
const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   description: { type: String },
   url: { type: String, required: true },
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

// Export the model
module.exports = mongoose.model('Document', documentSchema);
