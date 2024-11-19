const { default: mongoose } = require("mongoose");
const Recipe = require("../models/recipeModel");
const multer = require('multer');
const path = require('path');

// Set the storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    
    if (extname && mimeType) {
        return cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only image files are allowed'), false);  // Reject the file
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }  // Limit file size to 5MB
});

exports.recipeCreate = async (req, res) => {
    try {
        // Use multer upload middleware before proceeding
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const { name, description, ingredients, instructions, tags, categories, cookingTime, servings, difficulty, rating, createdBy } = req.body;
            const imagePath = req.file ? req.file.path : '';  // Get the image path if the upload is successful

            const newRecipe = new Recipe({
                name,
                description,
                ingredients,
                instructions,
                tags,
                categories,
                cookingTime,
                servings,
                difficulty,
                rating,
                image: imagePath,  // Save the image path
                createdBy
            });

            await newRecipe.save();

            res.status(201).json({
                success: true,
                message: "Recipe created successfully",
                recipe: newRecipe
            });
        });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


exports.recipeUpdate = async (req, res) => {
    const { id } = req.params; // Get the recipe ID from the request parameters
    const updateData = req.body; // Get the data to update from the request body
 try{
    // Find the recipe by ID and update it
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true // Validate the update against the model schema
    });

    // Check if the recipe was found and updated
    if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    // Send the updated recipe as a response
    res.status(200).json(updatedRecipe);
}catch(error){
    res.status(500).json({message:"Server Error"})
}
};

// In your backend (recipe controller)
exports.recipeGet = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Recipe ID" });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the recipe', error: error.message });
    }
};


exports.recipeDelete = async (req, res) => {
    const { id } = req.params; // Get the recipe ID from the request parameters

    try {
        // Find the recipe by ID and remove it
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        // Check if the recipe was found and deleted
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Recipe deleted successfully', deletedRecipe });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the recipe', error: error.message });
    }
};

exports.recipeGetAll = async (req,res)=>{
    try{
        const recipe = await Recipe.find();
        res.status(200).json(recipe);
        }catch(error){
            res.status(500).json({message:"Server Error"})
        }
};