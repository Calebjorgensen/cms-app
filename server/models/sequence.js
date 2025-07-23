const mongoose = require('mongoose');

// Define the schema for a sequence counter
const sequenceSchema = mongoose.Schema({
   id: { type: String, required: true },
   maxDocumentId: { type: Number },
   maxMessageId: { type: Number },
   maxContactId: { type: Number }
});

// Export the model
module.exports = mongoose.model('Sequence', sequenceSchema);
