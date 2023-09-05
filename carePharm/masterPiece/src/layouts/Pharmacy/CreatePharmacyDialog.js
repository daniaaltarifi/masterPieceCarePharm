import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../Slices/usersApiSlice.js";
import { setCredentials } from "../../Slices/authSlice.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CreatePharmacyDialog({ open, setOpen, onSave }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [services, setServices] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/pharmacy/post", {
        name,
        address: {
          city,
          street,
          state,
          postal_code,
        },
        phone,
        email,
        website,
        hours_of_operation: {
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        },
        services,
      });
      console.log(response.data);
      // Call the onSave callback with the data
      onSave(response.data);

      handleClose();
      toast.success("Pharmacy Added Successfully");
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-apartment" fullWidth>
        <div className="btn_edit">
          <h1 id="edit-apartment" className="title_newTask">
            Post Pharmacy
          </h1>
       
        </div>
        <DialogContent>
          <DialogContentText>Name: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            type="text"
            name="title"
            fullWidth
            // value={title}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogContentText>City: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="description"
            // value={summary}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
          <DialogContentText>Street: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setStreet(e.target.value)}
            fullWidth
          />
          <DialogContentText>State: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setState(e.target.value)}
            fullWidth
          />
          <DialogContentText>Postal code: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setPostal_code(e.target.value)}
            fullWidth
          />
          <DialogContentText>Phone: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <DialogContentText>Email: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <DialogContentText>Website: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
          />
          <DialogContentText>Hours_of_operation:</DialogContentText>
          <TextField
            autoFocus
            placeholder="Monday"
            margin="dense"
            type="time"
            name="monday"
            onChange={(e) => setMonday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="Tuesday"
            margin="dense"
            type="time"
            name="tuesday"
            onChange={(e) => setTuesday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="wednesday"
            margin="dense"
            type="time"
            name="wednesday"
            onChange={(e) => setWednesday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="Thursday"
            margin="dense"
            type="time"
            name="wednesday"
            onChange={(e) => setThursday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="Thursday"
            margin="dense"
            type="time"
            name="wednesday"
            onChange={(e) => setFriday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="Friday"
            margin="dense"
            type="time"
            name="wednesday"
            onChange={(e) => setSaturday(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            placeholder="Sunday"
            margin="dense"
            type="time"
            name="wednesday"
            onChange={(e) => setSunday(e.target.value)}
            fullWidth
          />

          <DialogContentText>Services: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="descreption"
            name="subTasks"
            // value={descreption}
            onChange={(e) => setServices(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <Button variant="contained" type="submit" className="btn_create_task" onClick={handlePost}>
          Post Pharmacy
        </Button>
      </Dialog>
    </div>
  );
}
const SelectField = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: end;
`;
const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
CreatePharmacyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
export default CreatePharmacyDialog;
