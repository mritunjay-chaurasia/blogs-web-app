import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const FileUpload = ({ setSelectedFile, selectedFile, handleFileChange }) => {

    return (
        <Box>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <div className='d-flex align-items-center gap-3'>
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>
                {selectedFile && (
                    <div style={{ position: "relative" }}>
                        <Typography variant="body1" style={{ borderRadius: "6px", border: "1px solid grey", width: "fit-content", padding: "5px 19px 0px 5px" }}>
                            {selectedFile.name}
                        </Typography>
                        <ClearIcon onClick={() => setSelectedFile(null)} className='cross-icons' style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }} />
                    </div>
                )}
            </div>
        </Box>
    );
};

export default FileUpload;
