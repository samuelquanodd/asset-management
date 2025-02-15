import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Container, Typography, Box } from '@mui/material';
import AssetList from './components/AssetList';
import TagForm from './components/TagForm';

const socket = io('http://localhost:5000');

function App() {
  const [assets, setAssets] = useState([]);

  const handleAdd = (assetId, tag) => {
    const asset = assets.find(a => a._id === assetId);
    if (asset && tag) {
      const updatedTags = [...asset.tags, tag];
      socket.emit('addTag', {id: asset._id, tags: updatedTags});
    }
  }

  const handleRemove = (assetId, tag) => {
    socket.emit('removeTag', { assetId, tag });
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/assets')
      .then(res => res.json())
      .then(data => setAssets(data));
  }, []);

  useEffect(() => {
      const handleAdd = (updatedAsset) => {
        const updatedAssets = [...assets];
        const index = assets.findIndex(asset => asset._id === updatedAsset._id);
        if (index > -1) {
          updatedAssets[index] = updatedAsset;
          setAssets(updatedAssets);
        }
      }
  
      const handleRemove = (updatedAsset) => {        
        const updatedAssets = [...assets];
        const index = assets.findIndex(asset => asset._id === updatedAsset._id);
        if (index > -1) {
          updatedAssets[index] = updatedAsset;
          setAssets(updatedAssets);
        }
      }
  
      socket.on('tagAdded', handleAdd);
      socket.on('tagRemoved', handleRemove);
      
  
      return () => {
        socket.off('tagAdded', handleAdd);
        socket.off("tagRemoved", handleRemove);
      };
    });

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Asset Tag Management
        </Typography>
      </Box>
      <AssetList assets={assets} setAssets={setAssets} socket={socket} onRemove={handleRemove} />
      <TagForm assets={assets} setAssets={setAssets} socket={socket} onAdd={handleAdd} onRemove={handleRemove} />
    </Container>
  );
}

export default App;
