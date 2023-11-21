const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
       id: uuidv4(),
        username: "apnacollege",
        content: "i love coding",
    },
    {
        id: uuidv4(),
        username: "shivansh nigam",
        content:"hard work",
    },
    {
        id: uuidv4(),
        username : "swatinigam",
        content: "i got selected",
    },
    {
        id: uuidv4(),
        username : "Emma Watson",
        content: "Emma Charlotte Duerre Watson (born 15 April 1990) is an English actress. Known for her roles in both blockbusters and independent films, she has received a selection of accolades, including a Young Artist Award and three MTV Movie Awards. Watson has been ranked among the world's highest-paid actresses by Forbes and Vanity Fair, and was named one of the 100 most influential people in the world by Time magazine in 2015.[1][2][3]",
    },    
];



app.get("/posts",(req,res) => {
    res.render("index.ejs" , {posts});
});


app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
})

app.post("/posts",(req,res) => {
    // console.log(req.body);
    let{username,content} = req.body; //destructuring in this line
    let id = uuidv4()
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) => {
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
   res.render("show.ejs" , {post});
});

app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content= newcontent;
    console.log(id);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
})

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
     posts = posts.filter((p) => id === p.id);
    res.redirect("/posts");
})

app.listen(port,() => {
    console.log("listening to post  : 3000");
});