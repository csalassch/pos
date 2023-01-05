const express=require('express');
const app=express();

const mongoose=require('mongoose');

//Connection
const db1=mongoose.createConnection("mongodb+srv://Mags:Northern1234.@cluster0.xigpypt.mongodb.net/Tienda1?retryWrites=true&w=majority");
const db2=mongoose.createConnection("mongodb+srv://Mags:Northern1234.@cluster0.xigpypt.mongodb.net/Tienda2?retryWrites=true&w=majority");

//Creating schemas and models
const Tienda1=db1.model("usuarios",mongoose.Schema({usuarios:String}));
const Tienda2=db2.model("usuarios",mongoose.Schema({usuarios:String}));

app.get("/",async(req,res)=>{
    const tienda1=await Tienda1.create({usuarios:'Test'});
    const tienda2=await Tienda2.create({usuarios:'Test2'});
    if(tienda1 && tienda2){
        //Succesful
        res.send('success');

    }else{
        res.send('fail');
    }

}).listen('5000',()=>{
    console.log('Server started');
});
