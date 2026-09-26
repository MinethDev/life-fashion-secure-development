const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/DeliveryRoutes");


const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use("/deliverys",router);


mongoose.connect("mongodb+srv://ishenevindu:200400400450@cluster0.d0r7a.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err)=> console.log((err)));