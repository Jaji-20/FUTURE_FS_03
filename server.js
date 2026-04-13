const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB CONNECT (FIXED)
mongoose.connect("mongodb://127.0.0.1:27017/salonDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// schema
const BookingSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    match: /^[0-9]{10}$/ // 10 digit validation
  },
  service: String,
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", BookingSchema);

// CREATE
app.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.send("Booking saved");
  } catch (err) {
    res.status(500).send("Error saving");
  }
});

// READ
app.get("/bookings", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

// DELETE (NO CONFIRM POPUP)
app.delete("/booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch {
    res.status(500).send("Delete error");
  }
});

// UPDATE
app.put("/booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
  } catch {
    res.status(500).send("Update error");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));