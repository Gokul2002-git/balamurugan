const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const currentdate=require(__dirname+"/date.js");
const mongoose=require("mongoose");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

 mongoose.connect("mongodb://19csr044:Gokul2002@cluster0-shard-00-00.dowfo.mongodb.net:27017,cluster0-shard-00-01.dowfo.mongodb.net:27017,cluster0-shard-00-02.dowfo.mongodb.net:27017/Balamurugan-thirukovil?ssl=true&replicaSet=atlas-108jkb-shard-0&authSource=admin&retryWrites=true&w=majority");
 const detailschema={
     date:Number,
     detail:String,
     status:String
 };
 const poojadetail=mongoose.model("poojadetail",detailschema);
 const poojadetail1=new poojadetail({
     date:1,
     detail:"gokul and gokul mobiles",
     status:"booked"
 });
 const poojadetail2=new poojadetail({
    date:2,
    detail:"praveen",
    status:"booked"
});
const poojadetail3=new poojadetail({
    date:3,
    detail:"Available",
    status:"Available"
});
const defaultarray=[poojadetail1,poojadetail2,poojadetail3];
app.get("/",function(req,res){
    var fullday=currentdate.getDate();
    console.log(fullday);
    var day=currentdate.getDay();
    console.log(day);
    
    poojadetail.find({},function(err,founddetail)
    {
        poojadetail.find({date:day},function(err,details)
        {
            var name=details[0].detail;
            res.render("poojadetail",{detail:founddetail,todaydetail:name,todaydate:fullday});
        });
        //console.log(founddetail);
       
        


    });
  

});
app.post("/bookdetail",function(req,res){
    const date=req.body.book;
    console.log(date);
   
    res.render("booking",{bookdate:date});
    
  

});
const bookingschema={
    date:Number,
    detail:String,
    phoneNumber:Number
};
const booking=mongoose.model("booking",bookingschema);


app.post("/booking",function(req,res)
{
    
    
    const date=req.body.date;
    const detail=req.body.detail;
    const phone=req.body.phone;
    const book=new booking({
        date:date,
        detail:detail,
        phoneNumber:phone
    });
    book.save();

res.redirect("/")


});

app.get("/adminlist",function(req,res)
{
    poojadetail.find({},function(err,founddetail)
    {
      //  console.log(founddetail);
        booking.find({},function(err,bookingdetail)
        {
            //console.log(founddetail);
            res.render("adminlist",{booking:bookingdetail,detail:founddetail});
       
        });
    

    });
  

});
app.post("/adminupdate",function(req,res)
{
    const updatedate=req.body.updatedate;
    res.render("adminadd",{date:updatedate});

});
app.post("/adminadd",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const status=req.body.status;
    console.log("date"+date+"detail"+detail+"status"+status);
    const adminpoojadetail=new poojadetail({
        date:date,
        detail:detail,
        status:status
    });
    poojadetail.updateOne({date:date},{detail:detail,status:status},function(err)
    {
        if(err)
        {
            console.log(err);
        }else{
            console.log("updated");
        }

    });
    res.redirect("/adminlist");

});
const adminschema={
    username:String,
    password:String
};
const admindetail=mongoose.model("adminlogin",adminschema);
const admin=new admindetail({
    username:"gokul",
    password:"gokul2002"
});
// admin.save();
app.get("/login",function(req,res)
{
    
res.render("login",{});

});

app.post("/login",function(req,res)
{
    const uname=req.body.username;
     var password=req.body.password;
    console.log(uname);
    console.log(password);
    admindetail.find({username:uname},function(err,found)
    {
       console.log(err);
      if(found.length===0)
      {
          res.redirect("/login");
      }
      else{
          var orgpassword=found[0].password;
        if(orgpassword===password)
        {
            res.redirect("/adminlist");
        }
        else{
            res.redirect("/login");
        }
      }
      

    });
  

});
app.get("/userlogin",function(req,res)
{

res.render("userlogin",{});


});
app.get("/adminlogin",function(req,res)
{

res.render("adminlogin",{});

});
app.listen(process.env.PORT || 5000,function()
{
    console.log("server started");
});


