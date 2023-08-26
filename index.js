const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Define a route for handling file uploads
app.post('/upload', upload.array('files', 5), (req, res) => {
    // Handle file uploads here and send a response
    console.log(req.files);
    res.status(200).json({ message: 'Files uploaded successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
