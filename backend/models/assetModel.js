const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
