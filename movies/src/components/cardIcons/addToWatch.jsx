import React from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchIcon = ({ movie }) => {
  const handleAddToWatch = (e) => {
    e.preventDefault();
    
  };

  return (
    <IconButton aria-label="add to watch" onClick={handleAddToWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchIcon;
