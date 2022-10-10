const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')

const apiRoutes = require('./public/routers/app.routers')




const PORT = process.env.PORT || 8080 
const app = express();

//HBS

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', './views');
app.set('view engine', 'hbs');

//middlewares

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))

//Routes

app.use('/api', apiRoutes)
app.get('/', (req, res)=>{
    res.render('main')
})

app.get('*', (req, res) => {
    res.status(404).send('<h1> Page does not exist</h1>')
})

const connectedServer = app.listen(PORT, () => {
    console.log(`server is up an running on port ${PORT}`)
})

connectedServer.on('error', (error) =>{
    console.log(error.message)
})