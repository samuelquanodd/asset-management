// /controllers/assetController.js

const Asset = require('../models/assetModel');

// Get all assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get assets' });
  }
};

// Update tags for a specific asset
const addTag = async (io, socket) => {
  const {id, tags} = socket;
  try {
    const asset = await Asset.findById(id);

    if (!asset) {
      return io.emit('tagAddFailed', 'Not Asset Found');
    }

    asset.tags = tags;
    await asset.save();

    io.emit('tagAdded', asset);
  } catch (err) {
    io.emit('tagAddFailed', 'Something went wrong');
  }
};

const removeTag = async (io, socket) => {
  const { assetId, tag } = socket;

  try {
    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    asset.tags = asset.tags.filter(t => t !== tag);
    await asset.save();

    io.emit('tagRemoved', asset);
  } catch (err) {
    io.emit('tagRemoveFailed', { assetId, tag });
  }
};

module.exports = { getAssets, addTag, removeTag };
