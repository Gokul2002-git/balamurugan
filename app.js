const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

 mongoose.connect("mongodb+srv://19csr044:Gokul2002@cluster0.dowfo.mongodb.net/Balamurugan-thirukovil");
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

    poojadetail.find({},function(err,founddetail)
    {
        //console.log(founddetail);
        res.render("poojadetail",{detail:founddetail});

    });
  

});
app.get("/bookdetail",function(req,res){
    res.render("booking",{});
    
  

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
app.get("/adminadd",function(req,res)
{
    res.render("adminadd",{});

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
app.listen(process.env.PORT || 3000,function()
{
    console.log("server started");
});


