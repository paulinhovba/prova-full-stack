const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_title: {
        type: String, 
        required: true
    },
    todo_category: {
        type: String        
    },
    todo_description: {
        type: String        
    },    
    todo_date: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);