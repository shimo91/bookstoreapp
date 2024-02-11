import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Box, Grid, TextField, InputLabel, InputAdornment, IconButton, FormControl, MenuItem, Switch } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { axiosAdmin } from '../../axiosinterceptor';
import { selectOptions } from './Options';
import Select from '@mui/material/Select';
import { arrayBufferToBase64 } from '../../utils'

const EditUser = ({ handleClose, dataid }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userid, setUserId] = useState('');

  const [isEditingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setEditingAddress] = useState(false);

  const [errordata, setError] = useState();
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh

  const [userdata,setUserData]= useState([])
  
  console.log("dataid",dataid)

  useEffect(() => {

    axiosAdmin.get('login/' + dataid).then((res) => {
      setUserData(res.data);
     // console.log("list of rentuserid : ",res.data.rentUser);
     setUserId(res.data._id);
    setName(res.data.first_name + " " + res.data.last_name);
    setEmail(res.data.username);
    setPhoneNumber(res.data.phone);
    setAddress(res.data.address);
      
    })

    

  }, [dataid,refresh]); // Dependency on token ensures it runs only when token changes

  const handleCloseButtonClick = () => {
    handleClose(); // Ensure that handleClose is correctly called
  };


  const handlePhoneNumberEdit = () => {
    setEditingPhoneNumber(!isEditingPhoneNumber);
    setRefresh(!refresh)
  };

  const handleAddressEdit = () => {
    setEditingAddress(!isEditingAddress);
    setRefresh(!refresh)
  };

  const savePhoneNumber = () => {
    // API request to save the changed phone number
    //console.log('Saving phone number:', phoneNumber);
    const formData = {
      userid: userid,
      phone: phoneNumber,
    }
    axiosAdmin.post('login/savephone', formData).then((res) => {
      if (res.data.message) {
        setUserData(res.data.user)
        //console.log("success", res.data.message)
        toast.success(res.data.message, {
          // Set to 15sec
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setRefresh(!refresh);
          },

        });

      }
    }).catch((error) => {
      console.log('Error adding review:', error);

      // Set the error message in the state
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while setting up the request.");
      }

      toast.error(errordata, {
        // Set to 15sec
        position: "top-right",
        autoClose: 3000,
      });
    })
    setEditingPhoneNumber(false); // Disable editing mode after saving
  };

  const saveAddress = () => {
    // API request to save the changed phone number
    //console.log('Saving phone number:', phoneNumber);
    const formData = {
      userid: userid,
      address: address,
    }
    axiosAdmin.post('login/saveaddress', formData).then((res) => {
      if (res.data.message) {
        //console.log("success", res.data.message)
        toast.success(res.data.message, {
          // Set to 15sec
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setRefresh(!refresh);
          },

        });

      }
    }).catch((error) => {
      console.log('Error adding review:', error);

      // Set the error message in the state
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while setting up the request.");
      }

      toast.error(errordata, {
        // Set to 15sec
        position: "top-right",
        autoClose: 3000,
      });
    })
    setEditingAddress(false); // Disable editing mode after saving
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent style={{paddingTop:'6px'}}>

        <TextField
          label="Name"
          value={name}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          value={email}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone Number"
          value={phoneNumber}
          fullWidth
          disabled={!isEditingPhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ mb: 2 }}
        />

        {isEditingPhoneNumber ? (
          <>
            <Button
              variant="contained"
              onClick={savePhoneNumber}>
              Save Phone Number
            </Button>&nbsp;
            <Button variant="contained" color='error' onClick={handlePhoneNumberEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handlePhoneNumberEdit}>
            Edit Phone Number
          </Button>
        )}

        <TextField
          label="Address"
          value={address}
          fullWidth
          disabled={!isEditingAddress}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />

        {isEditingAddress ? (
          <>
            <Button
              variant="contained"
              onClick={saveAddress}>
              Save Address
            </Button>&nbsp;
            <Button variant="contained" color='error' onClick={handleAddressEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleAddressEdit}>
            Edit Address
          </Button>
        )}

        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Button type="button" variant="contained" color='error' onClick={handleCloseButtonClick}>
              Close
            </Button>

          </Grid>
        </Grid>
      </DialogContent>
    </>
  )
}


const EditUserMoDal = ({ isOpen, handleClose, initialData }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <EditUser handleClose={handleClose} dataid={initialData} />
    </Dialog>
  );
};

export default EditUserMoDal;