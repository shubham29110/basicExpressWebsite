const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', { title: "This is a Practice Project" });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/contact', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "shubham.tiwari2911@gmail.com",
            pass: "********"
        }
    })
    
    let mailOptions = {
        from: "Shubham Tiwari <shubham.tiwari2911@gmail.com>",
        to: "shubham.tiwari2911@gmail.com",
        subject: "message Submission Confirmation",
        text: "mr." + req.body.name + "who's Email id is " + req.body.email + "submited" + req.body.message,
        html: "<ul><li>" + req.body.name + "</li><li>" + req.body.email + "</li><li>" + req.body.message + "</li></ul>"
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
            res.redirect("/")
        } else {
            console.log(info.message)
            res.redirect("/")
        }
    })
})

    app.get('/profile', (req, res) => {
        res.render('profile', { title: "welcome" });
    })

    app.listen(3000, () => {
        console.log('server is running at 3000')
    })