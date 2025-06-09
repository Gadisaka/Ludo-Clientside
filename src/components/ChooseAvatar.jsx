import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import useUserStore from "../store/zutstand";
import avt1 from "../assets/avators/avt1.jpg";
import avt2 from "../assets/avators/avt2.jpg";
import avt3 from "../assets/avators/avt3.jpg";
import avt4 from "../assets/avators/avt4.jpg";

const avatarImages = [avt1, avt2, avt3, avt4];

const ChooseAvatar = ({ open, onClose }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  const setAvatar = useUserStore((state) => state.setAvatar);
  const setUsernameStore = useUserStore((state) => state.setUsername);
  const setAgeStore = useUserStore((state) => state.setAge);

  const handleSubmit = () => {
    if (selectedAvatar !== null && username && age) {
      setAvatar(avatarImages[selectedAvatar]);
      setUsernameStore(username);
      setAgeStore(age);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ background: "#05051f", color: "#f59e0b", textAlign: "center" }}
      >
        Choose Your Avatar
      </DialogTitle>
      <DialogContent sx={{ background: "#05051f" }}>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          {avatarImages.map((img, idx) => (
            <Grid item key={img}>
              <Avatar
                src={img}
                alt={`Avatar ${idx + 1}`}
                sx={{
                  width: 64,
                  height: 64,
                  border:
                    selectedAvatar === idx
                      ? "5px solid #f59e0b"
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "border 0.2s",
                }}
                onClick={() => handleAvatarClick(idx)}
              />
            </Grid>
          ))}
        </Grid>
        <div className="flex flex-col justify-center items-center">
          <TextField
            label="Username"
            margin="dense"
            value={username}
            variant="outlined"
            sx={{
              input: { color: "#f59e0b" },
              label: { color: "#f59e0b" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#f59e0b" },
                "&:hover fieldset": { borderColor: "#f59e0b" },
                "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
              },
              mb: 2,
            }}
            InputLabelProps={{ style: { color: "#f59e0b" } }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            margin="dense"
            value={age}
            variant="outlined"
            sx={{
              input: { color: "#f59e0b" },
              label: { color: "#f59e0b" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#f59e0b" },
                "&:hover fieldset": { borderColor: "#f59e0b" },
                "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
              },
            }}
            InputLabelProps={{ style: { color: "#f59e0b" } }}
            onChange={(e) => setAge(e.target.value)}
            error={!!age && Number(age) <= 17}
            helperText={
              !!age && Number(age) <= 17 ? "Age must be greater than 18" : ""
            }
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ background: "#05051f", color: "#fff" }}>
        <Button onClick={onClose} sx={{ color: "#fff" }}>
          continue as guest
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            selectedAvatar === null || !username || !age || Number(age) <= 17
          }
          sx={{
            backgroundColor: "#f59e0b",
            "&:hover": { backgroundColor: "#f59e0b" },
            color: "#fff",
            "&.Mui-disabled": {
              border: "1px solid #f59e0b",
              color: "#fff",
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseAvatar;
