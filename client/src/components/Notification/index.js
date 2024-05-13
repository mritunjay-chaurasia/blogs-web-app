import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const NotificationIcons = ({ showNotification, notificationMessage, setShowNotification }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotification(false);
  };
  const vertical = 'top';
  const horizontal = "right"
  return (
    <div>
      <Snackbar open={showNotification}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NotificationIcons;