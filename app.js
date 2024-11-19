const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const multer = require('multer');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:4200',  // Allow only the Angular frontend to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific HTTP methods, including OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    credentials: true // Enable cookies and credentials if needed
}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Recipe",({
})).then(()=>{
    console.log("mongodb connected");
}).catch((e)=>{
    console.log("not connected",e);
});


const UserRoutes = require("./routes/userRoutes");
const RecipeRoutes = require("./routes/recipeRoutes");
app.use("/api/", RecipeRoutes);
app.use("/api/", UserRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});