const express= require('express');
const router= express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const bookData= require('../Models/BookData');
const jwt = require('jsonwebtoken');
const BookData = require('../Models/BookData');
function verifytoken(req,res,next){
    try {
        const token = req.headers.token;
       // console.log("token :"+token)
        if(!token) throw 'Unauthorized';
        let payload=jwt.verify(token,'bookstorekey');
        if(!payload) throw 'Unauthorized';
        //res.status(200).send(payload);
        next();
    } catch (error) {
        res.status(401).send('Error')
    }
}

router.get('/bookDetail/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const data = await BookData.findById(id);
        console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

// router.get('/get/:id',async(req,res)=>{
//     try {
//         const id=req.params.id;
//         const data = await BookData.findById(id);
//        // console.log("data is "+data)
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

router.get('/getbooklist',verifytoken,async(req,res)=>{
    try {
       
        const data = await BookData.find().sort({_id:-1});
       // console.log("description :"+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/getfeatured',async(req,res)=>{
    try {
       
        const data = await BookData.find().sort({_id:-1}).limit(20);
       // console.log("description :"+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/add',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        const Data = new BookData(item);
        const saveData= await Data.save();
        //console.log("saveed : "+saveData);
        const insertedId = saveData._id;
       // console.log("insertedid : "+insertedId);
        // res.status(200).send({message:'success',id:insertedId});
        res.status(200).send({message:'saved',id:insertedId});
    } catch (error) {
        console.log("error")
        res.status(400).send({massage:'error'})
    }
})

router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        //console.log("item for update"+item);
       const data= await BookData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send({message:'Updated successfully'});
    } catch (error) {
        res.status(404).send({message:'Update not working'});
    }
})

router.delete('/remove/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        console.log("inside remove");
        const savedata= await BookData.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        console.log("error is :"+error)
        res.status(404).send('Error!!');
    }
})

module.exports=router;