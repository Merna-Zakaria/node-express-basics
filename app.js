//EXPRESS
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { users } = require('./utils/data')
const logger = require('./utils/middleware/logger')
const auth = require('./utils/middleware/auth')

const app = express()

// app.use(express.static('./public'))
// app.use([logger, auth])
app.use(morgan('tiny'))


// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './view/navbar/index.html'))
// })

// app.all("*", (req, res) => {
//     res.status(404).send('opss..., page not found')
// })

// app.get('/', [logger, auth], (req, res) => {
//     res.send('<h1>home page</h1><a href="/api/users">users</a>')
// })

app.get('/', (req, res) => {
    res.send('<h1>home page</h1><a href="/api/users">users</a>')
})

app.get('/api/users', (req, res) => {
    const newUser = users.map(user => {
        const { id, title, body } = user
        return { id, title, body }
    })
    res.json(newUser)
})

app.get('/api/users/:userID', (req, res) => {
    const userID = req.params.userID
    const singleUser = users.find(user => user.id == userID)
    if (!singleUser) {
        res.status(404).send('product does not exist')
    }
    res.json(singleUser)
})

app.get('/api/users/:userID/reviews/:reviewID', (req, res) => {
    console.log('req.params', req.params)
    res.send('hello from reviews')
})

app.get('/api/v1/query', (req, res) => {
    console.log('req.query', req.query)
    const { search, limit } = req.query
    let sortedUsers = [...users]
    if (search) {
        sortedUsers = sortedUsers.filter(user => user.title.startsWith(search))
    }
    if (limit) {
        sortedUsers = sortedUsers.slice(0, Number(limit))
    }
    if (sortedUsers.length < 1) {
        //return res.status(200).send('no user matched your search')
        return res.status(200).json({ success: true, data: [], message: 'no user matched your search' })
    }

    res.status(200).json(sortedUsers)
})

app.listen(5000, () => {
    console.log('hi from express server')
})



//NODE JS/////////////////////////////////////////////////////////////
// const http = require('http')
// const {readFileSync} = require('fs')

// const navbar = readFileSync('./view/navbar/index.html')
// const navbarStyle = readFileSync('./view/navbar/style.css')
// const navbarLogo = readFileSync('./view/navbar/logo.png')

// const server = http.createServer((req, res) => {
// // console.log('rquest--1', req, 'response--1', res)

// const url = req.url
// console.log('url', url)
// if(url === '/'){
//     res.writeHead(200, {'content-type': 'text/html'})
//     res.write(navbar)
//     res.end()
// }else if(url === '/logo.png'){
//     res.writeHead(200, {'content-type': 'image/png'})
//     res.write(navbarLogo)
//     res.end()
// }else if(url === '/style.css'){
//     res.writeHead(200, {'content-type': 'text/css'})
//     res.write(navbarStyle)
//     res.end()
// }else if(url === '/about'){
//     res.writeHead(200, {'content-type': 'text/html'})
//     res.write('<h1>Hi from about page</h1')
//     res.end()
// }else{
//     res.writeHead(404, {'content-type': 'text/html'})
//     res.write('<h1>page not found</h1')
//     res.end()
// }
// })

// server.listen(5000, () => console.log('hi from server'))