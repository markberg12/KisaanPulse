const express = require('express');
const cors = require('cors');
const path = require('path') 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb)  {

      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix )
    }
  })
  
const upload = multer({ storage: storage })
const bodyParser = require('body-parser')

const app = express();
app.use('/uploads',express.static(path.join(__dirname,'uploads') ));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const port = 4000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/')


// Define User model
const User = mongoose.model('User', { username: String, password: String });
const Products = mongoose.model('Product', { pname: String, pdesc: String,prize: String,category: String, location: String, mobile:String ,image: String, });

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Worlds!')
});

app.post('/add-product',upload.single('image'),(req,res) =>{
    console.log(req.body);
    console.log(req.file.path);
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const prize = req.body.prize;
    const category = req.body.category;
    const location = req.body.location;
    const mobile = req.body.mobile;
    const image = req.file.path;



    const product = new Products({ pname, pdesc ,prize ,category,location,mobile,image});
    product.save()
    .then(() => {
        res.send({ message: "User saved successfully." })
    })
    .catch((error) => {
        res.send({ message: "Server error" })
    })



})
 
app.get('/get-products',(req,res) => {

    Products.find()
    .then((result)=> {
        console.log(result,"user data")
        res.send({ message : 'success', products : result})

    })
    .catch((err) =>{
        res.send({message: 'server err'})

    })

})


// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save()
    .then(() => {
        res.send({ message: "User saved successfully." });
    })
    .catch((error) => {
        console.error('Error saving user:', error);
        res.status(500).send({ message: "Server error" });
    })
})

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
    .then((result) => {
        if (!result) {
            res.send({ message: 'User not found' });
        } else if (result.password !== password) {
            res.send({ message: 'Password is incorrect' });
        } else {
            const token = jwt.sign({ data: result }, 'MYKEY', { expiresIn: '1h' });
            res.send({ message: 'Login successful', token });
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Server error' });
    });
});

// Start server
app.listen(port, () => {
    console.log('App listening on port ${port}');
});