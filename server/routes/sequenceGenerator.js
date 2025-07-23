const Sequence = require('../models/sequence');

let maxDocumentId = 0;
let maxMessageId = 0;
let maxContactId = 0;
let sequenceId = null;

async function initializeSequence() {
  try {
    const sequence = await Sequence.findOne({ id: 'sequence' });

    if (!sequence) {
      throw new Error('No sequence document found');
    }

    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;

    console.log('Sequence initialized');
  } catch (err) {
    console.error('Failed to initialize sequence:', err);
  }
}

// Automatically initialize on import
initializeSequence();

async function nextId(collectionType) {
  if (!sequenceId) {
    console.error('Sequence not initialized yet');
    throw new Error('Sequence not initialized');
  }

  let updateObject = {};
  let nextIdValue;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId };
      nextIdValue = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId };
      nextIdValue = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId };
      nextIdValue = maxContactId;
      break;
    default:
      throw new Error(`Invalid collection type: ${collectionType}`);
  }

  try {
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    return nextIdValue;
  } catch (err) {
    console.error('Failed to update sequence:', err);
    throw err;
  }
}

module.exports = { nextId };

