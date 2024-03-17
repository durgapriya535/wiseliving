import express from 'express';
import bodyParser from 'body-parser';

import _ from 'lodash';

const app = express();
const port = 3000;

app.use('/public', express.static('public', { 'extensions': ['css'] }));

app.use(bodyParser.urlencoded({ extended: true }));

var posts =[];


app.get('/', (req, res) => {
    res.render("index.ejs", { 
    posts: posts
    });
}); 

app.get('/about', (req, res) =>{
    res.render("about.ejs");
});

app.get('/create', (req, res) =>{
    res.render("create.ejs");
});
app.post('/create', (req, res) =>{
    const post = {
        title: req.body.title, 
        content: req.body.textarea
    };
    posts.push(post);
    res.redirect('/');
});

app.get("/posts/:postName", function(req, res){
    posts.forEach(function(post){
       if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
        res.render("post.ejs",{
            title: post.title,
            content: post.content
        });

        }   
    });
});


app.listen(port,()=> {
    console.log(`Listening on port ${port}`);
});

