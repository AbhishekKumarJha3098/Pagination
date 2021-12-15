const express = require("express");

// const transporter = require("../configs/mail")

const Product = require("../modles/product.modles");

const sendMail = require("../utils/send-mail");

const router = express.Router();

router.post("/", async (req,res) => {
    try{
      
        const product = await Product.create(req.body);

         sendMail("a@a.com","b@b.com",`create a new product with name ${req.body.name}`,"created new product","<h1>created a new product</h1>")

        // const message = {
        //     from: "a@a.com",
        //     to: "b@b.com",
        //     subject: `Created a product with name ${req.body.name}`,
        //     text: "some description about the product",
        //     html: "<h1>some description about the product</h1>"
        //   };

        //   transporter.sendMail(message);

        return res.status(201).json({product});

    } catch(e){
        return res.status(500).json({ status: "failed", message: e.message});

    }
});



router.get("/", async (req,res) => {
    try{

        const page = +req.query.page || 1;
        const size = +req.query.size || 2;

const skip = (page-1)*size;

        
        const products = await Product.find().skip(skip).limit(size).lean().exec();

         const totalpages =Math.ceil(await Product.find().countDocuments() / size);
              
        return res.json({products,totalpages});

    } catch(e){
        return res.status(500).json({ status: "failed", message: e.message});

    }
});

module.exports = router;