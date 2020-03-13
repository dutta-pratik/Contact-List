const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./model/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));

//custom middleware1
// app.use(function(req, res, next){
//     console.log("middleware 1");
//     next();
// });
//custom middleware2
// app.use(function(req, res, next){
//     console.log("middleware 2");
//     next();
// });

app.use(express.static("assets"));

// var contact_list = [
//     {
//         name : "Pratik",
//         phone : "12323"
//     },
//     {
//         name : "asdsa",
//         phone : "3421"
//     }
// ]

app.get("/", function(req, res){

    Contact.find({}, function(err, contactsl){
        if(err){
            console.log("Error in fetching contacts from DB");
            return;
        }
        return res.render("home", {
            title: "Contact List",
            contacts: contactsl
        });
    });

    // return res.render("home", {
    //     title: "Contact List",
    //     contacts: contact_list
    // });
});

app.get("/practice", function(req, res){
    return res.render("practice", {
        title: "Ejs"
    });
});

app.post("/create-contact", function(req, res){   
    // console.log(req.body);
    // contact_list.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //or we can use it like
    // contact_list.push(
    //    req.body
    // );

    //adding database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
        //or
        // req.body
    }, function(err, newContact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("********", newContact);
        return res.redirect("back");
    });

    // return res.redirect("/");

    //return res.redirect("back");
});

// app.get("/profile", function(req, res){
//     res.send("<h1>Hi !<h1>");
// });

app.get("/delete-contact/:id", function(req, res){
    //geting id
    let id = req.params.id;
    //if we are using query params
    //let id = req.query.id


    //find contact int db using ID
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting an Object from DB");
            return;
        }
        
        return res.redirect("back");
    });

    // console.log(req.params.phone);
    // let phone = req.params.phone;
    // let contactIndex = contact_list.findIndex(contact => contact.phone == phone);
    // console.log(contactIndex);
    
    // if(contactIndex != -1){
    //     contact_list.splice(contactIndex, 1);
    // }

    // return res.redirect("back");
});

app.listen(port, function(err){
    if(err){
        console.log("Server is Not Running", err);
    }
    console.log("Server is running successfully at port", port);
});

