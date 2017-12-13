var express     = require("express");
var bodyParser  = require("body-parser");
var favicon     = require("serve-favicon");
var mongoose    = require("mongoose");

var user = require("./models/user.js");
var poll = require("./models/poll.js");

var app = express();

var username;
var password;
var auth = false;
var note = "Creat your voting poll FREE";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lastest", {
    useMongoClient: true
});

app.set("views","./views");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(favicon("./public/lib/favicon.ico"));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));


// Index Page
app.get("/index",function(req,res){
    if (auth) return res.redirect("/user/" + username);
    res.render("index",{note: note});
    note = "Creat your voting poll FREE";
})
app.get("/",function(req,res){
    if (auth) return res.redirect("/user/" + username);
    res.render("index",{note: note});
    note = "Creat your voting poll FREE";
})

// Login Page
app.post("/login",function(req,res,next){
    console.log("login working");  
    username = req.body.username;
    password = req.body.password; 
    user.findOne({username: username, password: password},function(err,data){
        if(err) throw err;
        if(data) {
            auth = true;
            res.redirect('/user/' + username);
        } else {
            res.redirect("index");
            auth = false;
        }
    })
})

// Signup Page
app.post("/signup",function(req,res){
    username = req.body.username;
    password = req.body.password;    
    if (req.body.username.length === 0 || req.body.password.length === 0 ) {
        note = "Invalid username or password";
        console.log("invalid input");
        res.redirect("index");
        return;
    }
    console.log("Signup");
    var register = new user ({
        username: username,
        password: password
    });
    console.log(register);
    user.findOne({username: username},function(err,data){
        if(err) throw err;
        if(data) {
            note = "Username already used";
            console.log("invalid username");
            res.redirect("/index");            
        } else {
            note = "Creat your voting poll FREE";
            register.save(function(err){
                if(err) throw err;
                console.log("data save");
                res.redirect("user/"  + username);
                
            })
        }
    })    
})

// User Page
app.get("/user/:username",function(req,res){
    var username = req.params.username;
    if(auth) res.render("user", {username: username});  
    else res.redirect("/index");  
})
   

// Creat Polls
app.post("/create",function(req,res){
    var data ={};
    data.username = req.body.username;
    data.vote = req.body.vote;
    for (var i = 1; i < Object.keys(req.body).length -1; i++) {
        var key = "option" + i;
        data[key] = {option: req.body[key], value: 0};
    }
    poll.findOne({username: data.username, vote: data.vote},function(err,result){
        if(err) throw err;
        if(result) {
            res.redirect("/user/" + data.username + "/" + data.vote + "/update");
        } else {
            var newPoll = new poll (data);
            newPoll.save(function(err){
                if(err) throw err;
                console.log("New poll saved");
            })
            res.redirect("/user/" + data.username + "/" + data.vote);
        }
    })
})

// Poll page
app.get("/user/:username/:poll",function(req,res){    
    poll.findOne({username: req.params.username, vote: req.params.poll},function(err,data){
        if(err) throw err;
        res.render("poll",{data: data, auth: auth});
    })
    
})

// Poll Result
app.post("/vote",function(req,res){
    var username = req.body.username;
    var vote = req.body.vote;
    var optionsRadios = req.body.optionsRadios;
    var data = {};
    // because use Schema-less so db.find() return data of which properties can not be accessed
    // lean() prevent MongoDB do that   
    // and a plain javascript object will be returned
    poll.findOne({username: username, vote: vote}).lean().exec(function(err,data){
        if(err) throw err;
        for(var i = 1; i < Object.keys(data).length - 3; i++) {
            var key = "option" + i;
            if (data[key].option == optionsRadios) {
                data[key].value += 1;
    //update database by ID
                poll.findByIdAndUpdate(data._id,data,function(err){
                    if (err) throw err;
                    console.log("Updated");
                })
            }
        }
        res.redirect("/user/" + data.username +"/" + data.vote + "/result");
    })
       
})


// Result Page
app.get("/user/:username/:poll/result",function(req,res){
    var username = req.params.username;
    var vote = req.params.poll;
    poll.findOne({username: username, vote: vote},function(err,data){
        if(err) throw err;
        res.render("result", {data: data, auth: auth});
    })
})

// Manager Page
app.get("/user/:username/poll/manage", function(req,res){
    if (!auth) return res.redirect("/index");
    else {
        var username = req.params.username;
        poll.find({username: username},function(err,data){
            if (err) throw err;
            res.render("manage", {data: data, username: username });
        })
    }
})

// Update or Delete Polls
app.post("/user/:username/:poll/manage",function(req,res){
    console.log("change");
    if(!auth) return res.redirect("/index"); 
    var username = req.params.username;
    var vote = req.params.poll;
    if (req.body.hasOwnProperty("delete")) {
        poll.findOne({username: username, vote: vote}, function(err,data){
            if(err) throw err;
            var id = data._id;
            poll.remove({_id: id}, function(err){
                if(err) throw err;
                res.redirect("/user/" + username + "/poll/manage");
            })
        })
    } else {
        res.redirect("/user/" + username +"/" + vote + "/update");
    }
})

// Update Page
app.get("/user/:username/:poll/update", function(req,res){
    if (!auth) return res.redirect("/index");
    var username = req.params.username;
    var vote = req.params.poll;
    poll.findOne({username: username, vote: vote}, function(err,data){
        if(err) throw err;
        res.render("update", {data: data});
    })
})
// Update and Change Poll Content
app.post("/user/:username/:poll/update",function(req,res){
    if(!auth) return res.redirect("/index"); 
    var update = {};
    update.username = req.body.username;
    update.vote = req.params.poll;
    console.log(req.body);
    for(var i = 1;  i < Object.keys(req.body).length; i++){
        var key = "option" + i;
        update[key] = {option: req.body[key], value: 0}; 
    }
    
    
    poll.findOne({username: update.username, vote: update.vote},function(err,data){
        if (err) throw err;
        if (data) {
            var id = data._id;
            poll.remove({_id:id}, function(err){
                if(err) throw err;
            })
            var newPoll = new poll (update);
            newPoll.save(function (err) {
                if(err) throw err;
                res.redirect("/user/" + update.username + "/" + update.vote);
            })
        }
    })
})






app.listen(process.env.PORT || 3000, function(err){
    if(err) throw err;
    console.log("Listening");
})