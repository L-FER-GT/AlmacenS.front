import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DialogConfirmAccess = ({ open, handleClose, onHandleCorrect, accessCode }) => {
  const [accessKey, setAccessKey] = useState('');
  const [isError, setIsError] = useState(false);

  const handleAssign = () => {
    
    // Lógica para manejar la asignación del accessKey y comparar con accessCode
    if (accessKey === accessCode) {
      onHandleCorrect();
      setAccessKey("");
      handleClose();
    } else {
      setIsError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ingresa el Access Key:</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="accessKey"
          label="Access Key"
          type="text"
          fullWidth
          value={accessKey}
          onChange={(e) => {
            setAccessKey(e.target.value);
            // Limpiar el estado de error al cambiar el texto
            setIsError(false);
          }}
          error={isError}
          helperText={isError ? 'Access Key incorrecto' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleAssign} color="primary">
          Asignar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmAccess;

