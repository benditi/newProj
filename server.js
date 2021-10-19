const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const commentService = require('./service/comment.service')
const app = express()
const http = require('http').createServer(app)
var gravatar = require('gravatar');
// Express App Config
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}



// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there


const port = process.env.PORT || 3030
http.listen(port, () => {
})

//List
app.get('/api/comment', (req, res) => {
    commentService.query()
        .then((comments) => {
            res.send(comments)
        })
})

//Create
app.post('/api/comment', (req, res) => {
    const comment = {
        email: req.body.email,
        imgUrl: req.body.imgUrl,
        txt: req.body.txt
    }
    console.log('req.body', req.body)
    commentService.add(comment)
        .then(savedComment => {
            res.send(savedComment)
        })
        .catch(err => console.log(err))
})


const email = ( "orisharon@shemail.com " ).trim().toLowerCase();
var url = gravatar.url(email);
console.log(url);


