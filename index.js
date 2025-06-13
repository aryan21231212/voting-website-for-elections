const express = require("express")
const path  = require("path")
const User = require("./models/user.js")
const Candidate = require("./models/Candidate.js")
const methodOverride = require("method-override")
const session = require("express-session");
const MongoStore = require('connect-mongo');

const app = express();



const store = MongoStore.create({
    mongoUrl:'mongodb+srv://aryannoob343443:tT5FW9v2jnNRHYVM@cluster2.4babrlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2',
    crypto:{
        secret:"supersecretkey",
    },
    touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})



app.use(session({
    secret: "kira", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


// voting process
app.get("/candidate/vote/:id",async (req,res)=>{
    let {id} = req.params;
    if (!req.session.userdata) {
        return res.send("Please log in to vote.");
    }

    // Check if the user has already voted
    if (req.session.userdata.voted === true) {
        return res.send("You have already voted.");
    }
    else{
        let data =  await Candidate.findById(id)
        let newVotecount = data.voteCount + 1;
        await Candidate.findByIdAndUpdate(id,{voteCount:newVotecount})
        res.send("Voted Successfully")
        let userid = req.session.userdata._id
        await User.findByIdAndUpdate(userid,{voted:true})
    }

})


// admin verification
app.get("/verify",(req,res)=>{
    res.render("adminpass.ejs")
})

app.post("/verify",(req,res)=>{
    let password = req.body.password;
    if(password === "kiranoob"){
        res.render("admin.ejs")
    }
    else{
        res.send("Access Denied!")
    }
})


// showing candidate to user
app.get("/candidate/vote",async (req,res)=>{
    let data = await Candidate.find();
    res.render("vote.ejs",{data})
})





// candidate delete
app.get("/candidate/delete/:id",async (req,res)=>{
    let {id}  = req.params;
    await Candidate.findByIdAndDelete(id);
    res.redirect("/candidate")
})

// candidate update
app.get("/candidate/update/:id",async (req,res)=>{
    let {id} = req.params;
    let data = await Candidate.findById(id)
    console.log(data)
    res.render("updateform.ejs",{data})
})

app.put("/candidate/:id",async (req,res)=>{
    let {id} = req.params
    await Candidate.findByIdAndUpdate(id,req.body)
    res.redirect("/candidate")

})

//user or admin
app.get("/",(req,res)=>{
    res.render("home.ejs")
})

// signin
app.get("/user/sign",(req,res)=>{
    res.render("signForm.ejs")
})
app.post("/user/sign",async (req,res)=>{
   await User.insertOne(req.body);    
   res.redirect("/user/login")                  
})

//login
app.get("/user/login",(req,res)=>{
    res.render("loginForm.ejs")
})

app.post("/user/login",async (req,res)=>{
    let adharNumber = await req.body.adharNumber;
    let userdata = await User.findOne({adharNumber:adharNumber})
    if(userdata){
        req.session.userdata = userdata;
        res.render("userprofile.ejs",{userdata})
        
    }
    else{
        res.send("user not found")
    }
})



app.get("/admin",(req,res)=>{
    res.render("admin.ejs")
})

app.post("/candidate",async (req,res)=>{
    console.log(req.body)
    await Candidate.insertOne(req.body)
    res.redirect('/admin')
    
})

app.get("/candidate",async (req,res)=>{
    let allcandidate = await Candidate.find();
    console.log(allcandidate)
    res.render("candidate.ejs",{allcandidate})
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})
