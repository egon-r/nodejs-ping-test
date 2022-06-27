var express = require("express")
var exec = require("child_process").exec;
var jade = require("jade")
var bodyParser = require("body-parser")
var app = express()

app.set("views", __dirname + "/views")
app.set("view engine", "jade")

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function(req, res){
    res.render("pingtest", {title: "Ping Test"}) 
})

app.post("/pingtest", function(req,res){
    exec("ping " + req.body.url + " -c 4 -i 1", function(err, stdout, stderr){
        if(stdout == ""){
            res.render("pingtest", {title: "Ping Test", result: "No response."}) 
        }else{
            res.render("pingtest", {title: "Ping Test", result: stdout}) 
        }
    })
})

app.listen(3000, function(){
    console.log("listening on port 3000!")
})