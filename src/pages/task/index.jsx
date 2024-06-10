import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Card as MuiCard,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Card = ({ title, cards, setCards }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      status: selectedStatus,
    };
    setCards([...cards, newCard]);
    setOpenModal(false);
    setNewCardTitle("");
    setSelectedStatus("");
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cards
          .filter((card) => card.status === title.toLowerCase())
          .map((card, index) => (
            <MuiCard
              key={card.id}
              variant="outlined"
              style={{ marginBottom: "10px" }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {card.title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Status: {card.status}
                  </Typography>
                  <IconButton onClick={() => handleDeleteCard(card.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </MuiCard>
          ))}
      </div>
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Card
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            minWidth: "300px",
          }}
        >
          <h2>Add New Card</h2>
          <TextField
            label="Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            select
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {["Open", "Pending", "In Progress", "Complete"].map((option) => (
              <MenuItem key={option} value={option.toLowerCase()}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={handleAddCard}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Board</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {["Open", "Pending", "In Progress", "Complete"].map((title, index) => (
          <Card key={index} title={title} cards={cards} setCards={setCards} />
        ))}
      </div>
    </div>
  );
};

export default App;
