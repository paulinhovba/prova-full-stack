const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://prmpoker:stuunga1980@cluster0-ztonw.mongodb.net/todo?retryWrites=true&w=majority', { 
  useNewUrlParser: true, 
  debug: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB: Database conectada com sucesso!");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("Dados não encontrados!");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_category = req.body.todo_category;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Tarefa atualizada!');
            })
            .catch(err => {
                res.status(400).send("Atualização não efetuada!");
            });
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'tarefa': 'tarefa adicionada com sucesso!'});
        })
        .catch(err => {
            res.status(400).send('não foi possível adicionar tarefa!');
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Servidor rodando na porta: " + PORT);
});