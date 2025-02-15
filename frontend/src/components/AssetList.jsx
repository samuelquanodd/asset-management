import React, { useState} from 'react';
import { List, ListItem, ListItemText, Chip, Box, Typography, IconButton, Pagination, Button, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AssetList = ({ assets, onRemove }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [groupBy, setGroupBy] = useState(null); // State for grouping by 'manufacturer' or 'category'
  const [anchorEl, setAnchorEl] = useState(null); // For the "Group By" menu

  const totalPages = Math.ceil(assets.length / itemsPerPage);

  const displayedAssets = assets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Grouping assets by the selected tag (manufacturer/category)
  const groupAssets = (assets, groupBy) => {
    if (!groupBy) return { 'All Assets': assets }; // If no grouping, return all assets as a single group

    return assets.reduce((groups, asset) => {
      const groupKey = asset[groupBy];
      if (!groupKey) return groups; // Skip assets without the groupKey (undefined or null)

      // Initialize the group if not already present
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(asset);
      return groups;
    }, {});
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleGroupByClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGroupByClose = (value) => {
    setGroupBy(value);
    setAnchorEl(null);
  };

  const groupedAssets = groupAssets(displayedAssets, groupBy);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        Assets
      </Typography>

      <Button
        variant="outlined"
        onClick={handleGroupByClick}
        sx={{ marginBottom: 2 }}
      >
        Group By: {groupBy || 'None'}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleGroupByClose('manufacturer')}>Manufacturer</MenuItem>
        <MenuItem onClick={() => handleGroupByClose('category')}>Class</MenuItem>
        <MenuItem onClick={() => handleGroupByClose(null)}>None</MenuItem>
      </Menu>

      {Object.keys(groupedAssets).map((groupKey) => {
        const group = groupedAssets[groupKey];

        if (!Array.isArray(group)) {
          console.error(`Expected an array but found:`, group);
          return null;
        }

        return (
          <Box key={groupKey}>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {groupKey === 'All Assets' ? '' : groupKey}
            </Typography>
            <List>
              {group.map((asset) => (
                <ListItem key={`${asset.id}-${asset.name}`} sx={{ borderBottom: '1px solid #ccc' }}>
                  <ListItemText
                    primary={<strong>{asset.name}</strong>}
                    secondary={`Manufacturer: ${asset.manufacturer}`}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {asset.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        color={
                          asset.manufacturer === tag
                            ? 'primary'
                            : asset.category === tag
                              ? 'success'
                              : 'default'
                        }
                        sx={{ margin: '4px' }}
                        onDelete={() => onRemove(asset._id, tag)}
                        deleteIcon={
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        }
                      />
                    ))}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      })}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AssetList;
