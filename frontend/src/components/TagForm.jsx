import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Typography, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TagForm = ({ assets, onAdd, onRemove }) => {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [newTag, setNewTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(assets);
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (searchQuery.trim() === '') {
        setFilteredAssets(assets);
      } else {
        setFilteredAssets(
          assets.filter(asset =>
            asset.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    }, 300);

    debouncedSearch();
  }, [searchQuery, assets]);

  return (
    <Box sx={{
      marginBottom: 4,
      width: "60%",
      marginX: "auto"
    }}>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>Add/Remove Tags</Typography>

      <TextField
        fullWidth
        label="Search Assets"
        variant="outlined"
        value={searchQuery || ''}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="asset-select-label">Select Asset</InputLabel>
        <Select
          labelId="asset-select-label"
          value={selectedAsset?._id || ''}
          onChange={(e) => {
            setSelectedAsset(assets.find(a => a._id === e.target.value))
          }}
          label="Select Asset"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filteredAssets?.length > 0 ? (
            filteredAssets.map(({ _id, name }) => (
              <MenuItem key={`${_id}-${name}`} value={_id}>
                {name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No assets available</MenuItem>
          )}

        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="New Tag"
        variant="outlined"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          onAdd(selectedAsset._id, newTag);
          setNewTag("");
        }}
        disabled={!selectedAsset || !newTag}
      >
        Add Tag
      </Button>

      {/* Displaying filtered results */}
      {searchQuery && filteredAssets.length === 0 && (
        <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
          No assets found.
        </Typography>
      )}

      {/* Display Current Tags of the selected asset */}
      {selectedAsset && selectedAsset._id && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Current Tags</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
            {assets.find(asset => asset._id === selectedAsset._id).tags.map((tag, tagIndex) => (
              <Chip
                key={tagIndex}
                label={tag}
                color={
                  selectedAsset.manufacturer === tag
                    ? 'primary'
                    : selectedAsset.category === tag
                      ? 'success'
                      : 'default'
                }
                sx={{ margin: '4px' }}
                onDelete={() => onRemove(selectedAsset._id, tag)}
                deleteIcon={
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TagForm;
