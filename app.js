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
 const karthigaidetailschema={
    date:String,
    detail:String,
    status:String,
    tamilmonth:String
};
 const karthigaipoojadetail=mongoose.model("karthigaipoojadetail",karthigaidetailschema);
 const karthigaipoojadetail1=new karthigaipoojadetail({
     date:"03-06-2022",
     detail:"gokul and gokul mobiles",
     status:"booked",
     tamilmonth:"sdnasj"
 });
 const karthigaipoojadetail2=new karthigaipoojadetail({
    date:"03-06-2022",
    detail:"gokul and gokul mobiles",
    status:"booked",
    tamilmonth:"sdnasj"
});
const karthigaipoojadetail3=new karthigaipoojadetail({
    date:"03-06-2022",
    detail:"gokul and gokul mobiles",
    status:"booked",
    tamilmonth:"sdnasj"
});
const defaultarray=[karthigaipoojadetail1,karthigaipoojadetail2,karthigaipoojadetail3];
//karthigaipoojadetail.insertMany(defaultarray);

const sastidetailschema={
    date:String,
    detail:String,
    status:String,
    tamilmonth:String
};
 const sastipoojadetail=mongoose.model("sastipoojadetail",sastidetailschema);
 const sastipoojadetail1=new sastipoojadetail({
     date:"03-06-2022",
     detail:"gokul and gokul mobiles",
     status:"booked",
     tamilmonth:"sdnasj"
 });
 const sastipoojadetail2=new sastipoojadetail({
    date:2,
    detail:"praveen",
    status:"booked",
    tamilmonth:"sdnasj"
});
const sastipoojadetail3=new sastipoojadetail({
    date:3,
    detail:"Available",
    status:"Available",
    tamilmonth:"sdnasj"
});
const sastidefaultarray=[sastipoojadetail1,sastipoojadetail2,sastipoojadetail3];
//sastipoojadetail.insertMany(sastidefaultarray);
const bookingschema={
    date:String,
    detail:String,
    phoneNumber:Number
};
const booking=mongoose.model("booking",bookingschema);

const sastibookingschema={
    date:String,
    detail:String,
    phoneNumber:Number
};
const sastibooking=mongoose.model("sastibooking",sastibookingschema);

const karthigaibookingschema={
    date:String,
    detail:String,
    phoneNumber:Number
};
const karthigaibooking=mongoose.model("karthigaibooking",karthigaibookingschema);

app.get("/",function(req,res){
    var fullday=currentdate.getDate();
    console.log(fullday);
    var day=currentdate.getDay();
    console.log(day);
    
    poojadetail.find({},function(err,founddetail)
    {
        poojadetail.find({date:day},function(err,details)
        {
            karthigaipoojadetail.find({},function(err,karthigai)
            {
                sastipoojadetail.find({},function(err,sasti)
                {
                    var name=details[0].detail;
                    res.render("poojadetail",{detail:founddetail,todaydetail:name,todaydate:fullday,karthigai:karthigai,sasti:sasti});
                });
               
            });
            
        });
        //console.log(founddetail);
       
        


    });
  

});
app.post("/dailybookdetail",function(req,res){
    const date=req.body.book;
    console.log(date);
    res.render("booking",{bookdate:date});
    
});
app.post("/bookdetail",function(req,res){
    const date=req.body.book;
    console.log(date);
   
    res.render("sastibooking",{bookdate:date});
    
  

});
app.post("/karthigaidetail",function(req,res){
    const date=req.body.book;
    console.log(date);
   
    res.render("karthigaibooking",{bookdate:date});
    
  

});


app.post("/karthigaibooking",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const phone=req.body.phone;
    const book=new karthigaibooking({
        date:date,
        detail:detail,
        phoneNumber:phone
    });
    book.save();

res.redirect("/");


});
app.post("/sastibooking",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const phone=req.body.phone;
    const book=new sastibooking({
        date:date,
        detail:detail,
        phoneNumber:phone
    });
    book.save();

res.redirect("/");


});

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

res.redirect("/");


});



app.get("/adminlist",function(req,res)
{
    poojadetail.find({},function(err,founddetail)
    {
      //  console.log(founddetail);
        booking.find({},function(err,bookingdetail)
        {
            sastipoojadetail.find({},function(err,sasti)
            {
                sastibooking.find({},function(err,sastibook)
                {
                    karthigaipoojadetail.find({},function(err,karthigai)
                    {
                        karthigaibooking.find({},function(err,karthigaibook)
                        {
res.render("adminlist",{booking:bookingdetail,detail:founddetail,sasti:sasti,karthigai:karthigai,sastibook:sastibook,karthigaibook:karthigaibook});
                    //console.log(founddetail);
                        });

                    });
                
                });

            });
       
        });
    

    });
  

});
app.post("/adminupdate",function(req,res)
{
    const updatedate=req.body.updatedate;
    res.render("adminadd",{date:updatedate});

});
app.post("/sastiupdate",function(req,res)
{
    const updatedate=req.body.updatedate;
    res.render("sastiadd",{date:updatedate});

});
app.post("/karthigaiupdate",function(req,res)
{
    const updatedate=req.body.updatedate;
    res.render("karthigaiadd",{date:updatedate});

});
app.post("/adminadd",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const status=req.body.status;
    console.log("date"+date+"detail"+detail+"status"+status);
    
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
app.post("/sastiadd",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const status=req.body.status;
    console.log("date"+date+"detail"+detail+"status"+status);
  
    sastipoojadetail.updateOne({tamilmonth:date},{detail:detail,status:status},function(err)
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
app.post("/karthigaiadd",function(req,res)
{
    const date=req.body.date;
    const detail=req.body.detail;
    const status=req.body.status;
    console.log("date"+date+"detail"+detail+"status"+status);
  
    karthigaipoojadetail.updateOne({tamilmonth:date},{detail:detail,status:status},function(err)
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
app.post("/bookingdelete",function(req,res)
{
    const id=req.body.deleteid;
    console.log(id);
    booking.deleteOne({_id:id},function(err,res)
    {
        if(!err)
        {
            console.log("deleted");
        }

    });
    res.redirect("/adminlist");

});
app.post("/sastibookdelete",function(req,res)
{
    const id=req.body.deleteid;
    console.log(id);
    sastibooking.deleteOne({_id:id},function(err,res)
    {
        if(!err)
        {
            console.log("deleted");
        }

    });
    res.redirect("/adminlist");

});
app.post("/karthigaidelete",function(req,res)
{
    const id=req.body.deleteid;
    console.log(id);
  karthigaibooking.deleteOne({_id:id},function(err,res)
    {
        if(!err)
        {
            console.log("deleted");
        }

    });
    res.redirect("/adminlist");

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


