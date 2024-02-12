import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../axiosinterceptor"
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Box, Grid } from '@mui/material';
import OrderDetail from './OrderDetail';

const UserAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userid, setUserId] = useState('');

  const [isEditingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setEditingAddress] = useState(false);

  const [errordata, setError] = useState();
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh

  const [orderlist, setOrderLists] = useState([]);

  const token = sessionStorage.getItem("userToken");

  useEffect(() => {
    if (token) {
      var decodeToken = jwtDecode(token);
      //console.log("decode",decodeToken)
      setUserId(decodeToken.userid);
      setName(decodeToken.name);

      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('login/' + decodeToken.userid);
          //console.log("user data is", response.data);
          setEmail(response.data.username);
          setPhoneNumber(response.data.phone);
          setAddress(response.data.address);
          if (response.data._id) {
            console.log("userid",response.data._id)
            axiosInstance.get(`login/userOrders/${response.data._id}`)
              .then((orders) => {
                // Handle the similar books data
                console.log('Orders list:', orders.data);
                setOrderLists(orders.data)
              })
              .catch((error) => {
                console.error('Error fetching similar books:', error);
              });
          }
        } catch (error) {
          console.error("Error fetching book data:", error);
        }
      };

      fetchData();
    }
  }, [token]); // Dependency on token ensures it runs only when token changes

  const handlePhoneNumberEdit = () => {
    setEditingPhoneNumber(!isEditingPhoneNumber);
  };

  const handleAddressEdit = () => {
    setEditingAddress(!isEditingAddress);
  };

  const savePhoneNumber = () => {
    // API request to save the changed phone number
    //console.log('Saving phone number:', phoneNumber);
    const formData = {
      userid: userid,
      phone: phoneNumber,
    }
    axiosInstance.post('login/savephone', formData).then((res) => {
      if (res.data.message) {
        console.log("success", res.data.message)
        toast.success(res.data.message, {
          // Set to 15sec
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setRefresh(!refresh);
          },

        });

      }
      else {
        console.error("Error:", res.data.error);
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setRefresh(!refresh);
          },
        });
      }
    }).catch((error) => {
      

      console.log("error data", error.response.data.error)
     
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setRefresh(!refresh);
          },
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
    axiosInstance.post('login/saveaddress', formData).then((res) => {
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
    <div>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
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

      {orderlist && (
        <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
          <OrderDetail order={orderlist} />
        </Grid>
      )}


    </div>
  )
}

export default UserAccount