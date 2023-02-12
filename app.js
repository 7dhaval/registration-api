const express = require("express");
const async = require("hbs/lib/async");
const app = express();
const port = process.env.PORT || 3000;
require("./src/db/connection");
const path = require("path");
const register = require("./src/models/register"); 

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

//requiring html content from public folder
app.get('/', async (req, res) => {
    res.send("Hello From Website");
  });

app.post('/register', async(req, res) => {
    try{
        // const passsword =  req.body.passsword;
        // const cpasssword =  req.body.confirmpassword;
      
        // if(passsword === cpasssword){
            const registerEmployess = new register({
                firstname: req.body.firstname,
                email: req.body.email,
                // passsword: req.body.passsword,
                // confirmpassword: req.body.confirmpassword,
                phone: req.body.phone,
                gender: req.body.gender
            })
          const registered = await registerEmployess.save();
          res.status(201).send(registered); 
          console.log(registered);
        // }else{
            // res.send("passwords are not matching");
        // }

    }catch(err){
        res.status(400).send(err);
    }
  });
  
app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });


app.listen(port, () =>{
    console.log(`Server is Running on ${port}`);
})
