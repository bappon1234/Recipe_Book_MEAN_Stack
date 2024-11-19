const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients: {
        type:[String],
        required: true
    },
    instructions:{
        type:[String],
        required: true
    },
    tags:{
        type:[String],
        default:[]
    },
    categories:{
        type:[String],
        default:[]
    },
    cookingTime: {
        type:Number,
        required:true
    },
    servings:{
        type: Number,
        required:true
    },
    difficulty:{
        type: String,
        required:true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    rating:{
        type:Number,
        default: 0,
        min : 0,
        max : 5
    },
    image:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);