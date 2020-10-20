const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


const { Movies } = require('./models/Movies');
const { Category } = require('./models/Category');
const { response } = require('express');

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome To Our Application</h1><a href="/movies">Movies List</a> <a href="/categories">Category List</a><br><p>Now You can do any crud operations with this things');
});

//Movies CRUD

app.get('/movies', async (req, res) => {
    try{
        var movies = await Movies.findAll();
        res.send(movies);
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
});

app.get('/movie/:category_id', async (req, res) => {
    var category_id = req.params.category_id;
    try{
    var movies = await Movies.findAll({where: {
        category_id
    }});
    if(movies.length == 0) {
        res.send(false);
    }
    res.send(movies);
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
});

app.post('/movie', async(req, res) => {
    try{
        var result = new Movies(req.body);
        var movie = await result.save();
        res.send(movie);
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
});


app.delete('/movie/:id', async ( req, res) => {
    var id = req.params.id;
    try{
        var movie = await Movies.destroy({where: {id}});
        if(movie) {
            res.send(true);
        }
        res.send(false);
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
});

app.get('/movieByID/:id', async( req, res) => {
    var id = req.params.id;
    try{
        var  movie = await Movies.findByPk(id);
        if(movie !== null) {
            res.send(movie);
        }
        res.send({message: "May be you entered the wrong id"});
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
});

app.post('/movie/:id', async(req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, "url", "title", "description", "category_id");
    try{
        var movie = await Movies.findByPk(id);
        if(body.url !== null) {
            movie.url =  body.url;
        }

        if(body.title !== null) {
            movie.title = body.title;
        }

        if(body.description !== null) {
            movie.description = body.description;
        }
        if(body.category_id !== null) {
            movie.category_id = body.category_id;
        }
        var result = await movie.save();
        res.send(result);
    }catch(e) {
        res.status(400).send({error: "May be you have problem in connection"});
    }
    
});

//Category CRUD
app.get('/categories', async (req, res) => {
    try {
        var categories = await Category.findAll();
        res.send(categories);
    }catch(e) {
        res.send({error: "May be you have problem in connection"});
    }    
});

app.post('/category', async (req, res) => {
    try{
        var result = new Category(req.body);
        var category = await result.save();
        res.send(category);
    }catch(e) {
        res.status(400).send({error: 'May be you have problem in connection'});
    }
});

app.get('/category/:id', async( req, res) => {
    var id = req.params.id;
    try {
        var category = await Category.findByPk(id);
        if(category === null) {
            res.send({message: "Please enter the valid info"});
        }
        res.send(category);
    }catch(e) {
        res.status(400).send({error: 'May be you have problem in connection'});
    }
});

app.delete('/category/:id', async (req, res) => {
    var id = req.params.id;
    try{
        var category = await Category.destroy({where: {
            id
        }});
        if(category) {
            res.send(true);
        }
        res.send(false);
    }catch(e) {
        res.status(400).send({error: 'May be you have problem in connection'});
    }
});

app.post('/category/:id', async (req, res) => {
    var id = req.params.id;
    var category = await Category.findByPk(id);
    if(category == null) {
        res.send({message: "Please enter the valid id"});
    }
    if(req.body.name !== null) {
        category.name = req.body.name;        
    }

    if(req.body.short_description !== null) {
        category.short_description = req.body.short_description;
    }
    if(req.body.long_description !== null) {
        category.long_description = req.body.long_description;
    }

    category.save();
    res.send(category);
});


app.listen(port , () => {
    console.log(`Server is listening on port ${port}`)
});
