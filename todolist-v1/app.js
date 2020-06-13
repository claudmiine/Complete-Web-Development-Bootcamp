//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items =[];
const workItems = [];
// use EJS as a view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


 


app.get("/", (req, res) => {
  
const day = date.getDate();

// uses the view engine we set up to render a particular page
   res.render("list", {
       ListTitle: day,
       newListItems: items
   });
});


app.post("/", (req, res) =>{
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work')
    } else {
        items.push(item);
        res.redirect('/')
    }

});


app.get("/work", (req, res) => {
res.render("list", {
    ListTitle: "Work List",
newListItems: workItems});
})

app.post("/work", (req, res)=> {
    let item =req.body.newItem;
    workItems.push.newItem;
    res.render("worklist");
})


app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})  