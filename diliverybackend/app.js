const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/DeliveryRoutes");


const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use("/deliverys",router);


mongoose.connect("mongodb+srv://lifefashion:lifefashion123@cluster0.lf7gm.mongodb.net")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err)=> console.log((err)));