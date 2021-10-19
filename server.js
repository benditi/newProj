const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const commentService = require('./service/comment.service')
const app = express()
const http = require('http').createServer(app)
// var gravatar = require('gravatar');
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

const port = process.env.PORT || 3030
http.listen(port, () => {
})

//List
app.get('/api/comment', (req, res) => {
    console.log('here');
    console.log('params', req.query.filterBy);
    commentService.query(req.query.filterBy)
        .then((comments) => {
            console.log('comments are', comments);
            res.send(comments)
        })
})

//Create
app.post('/api/comment', async (req, res) => {
    const comment = req.body.comment
    // console.log('comment is', comment);
    try {
        const saved = await commentService.add(comment);
        res.send(saved)
    }
    catch (e) { console.log('e') }
})


// const email = ("orisharon@shemail.com ").trim().toLowerCase();
// var url = gravatar.url(email);
// console.log(url);


