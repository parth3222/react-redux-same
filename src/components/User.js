import { React, useState, useEffect } from 'react';
import sweetalert from "sweetalert";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AddUser, editUser, deleteUser } from '../services/Action/action';



function User() {

  const userData = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [hobbie, setHobbie] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let getSelectedUser = userData.userList.find(
      (user) => user.id === selectedUserId
    );
    if (getSelectedUser) {
      setId(getSelectedUser.id);
      setName(getSelectedUser.name);
      setBirth(getSelectedUser.dob);
      setHobbie(getSelectedUser.hobbies);
    }
  }, [selectedUserId,userData.userList]);

  const formHandler = (e) => {
    dispatch(
      AddUser({
        id,
        name,
        dob: birth,
        hobbies: hobbie,
      })
    );
    setOpen(false);
    e.preventDefault();
  };
  const deleteHandler = (e, itemid) => {
    setOpen(false);
    e.preventDefault();
    sweetalert({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,  
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            dispatch(deleteUser(itemid));
            sweetalert("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
            sweetalert("Your imaginary file is safe!");
        }
      });
  };

  const editHandler = (e) => {
    dispatch(
      editUser(
        {
          id,
          name,
          dob: birth,
          hobbies: hobbie,
        },
        selectedUserId
      )
    );

    setOpen(false);
    e.preventDefault();
  };

  const handleUpdateRecord = (item) => {
    setSelectedUserId(item.id);
    setName(item.name);
    setBirth(item.dob);
    setHobbie(item.hobbies);
    setOpen(true);
  };
  return (
    <>
      <h1>User List</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setId('');
          setName('');
          setBirth('');
          setHobbie('');
          setSelectedUserId(null);
          handleClickOpen();
        }}
      >
        Add A user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Become A member</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="text"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="DOB"
            type="text"
            fullWidth
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Hobbies"
            type="text"
            fullWidth
            value={hobbie}
            onChange={(e) => setHobbie(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          {selectedUserId ? (
            <Button onClick={editHandler} color="primary">
              Edit
            </Button>
          ) : (
            <Button onClick={formHandler} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table className= "tableMain" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Hobbies</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.userList.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dob}</TableCell>
                <TableCell>{item.hobbies}</TableCell>
                <TableCell>
                  <Button
                  className = "MuiButton-containedPrimary"
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateRecord(item)}
                  >
                    Edit
                  </Button>
                  <Button
                  className = "MuiButton-containedSecondary"
                    variant="contained"
                    onClick={(e) => deleteHandler(e, item.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default User;
