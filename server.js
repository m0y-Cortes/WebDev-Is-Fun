/* Moises Cortes - moiseskhana€gmail.com

Portfolio JL -2025
*/
const cookieParser = require('cookie-parser') // reads a cookie

/* const lastVisit = parseInt(request.cookies.lastVisit)
 let firstName = request.cookie.firstName */
const express = require('express');
const session = require('express-session')
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

app.use(cookieParser())
/* ------------ Handlebars config ------------- */
app.engine('handlebars', engine({ defaultLayout: 'main', extname: '.handlebars' }));
app.use(express.static('public'))
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));
/* ------------------------------------- */

/* ------------ DB conection ------------ */
const sqlite3 = require('sqlite3') //loads the sqlite packae
const db = new sqlite3.Database('orangeKaffeDB.sqlite') //loads the database and puts its content in the "db" variable
/* ------------------------------------- */

/* ------------ ROUTES ------------ */
app.get('/users', function (req, res) { //ruta de prueba para corroborar coneccion a la db
    db.all('SELECT * FROM users', (error, usersList) => {
        if (error) {
            res.send('Sorry an error ocurred :(' + error.message)
        } else {
            model= {users: usersList}
            res.render('users.handlebars', model)
        }
    })
});


app.get('/', (req,res) => {
    res.render('login');
});
app.post('/login', (req, res) => {  
    const {username, password} = req.body;
    
    if (!username || !password) { 
    return res.render('login', { error: 'Por favor completa ambos campos.', title: 'Login' });
  }
  return res.redirect(`/home`);
});

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/list', function(req, res) {
    db.all('SELECT * FROM recipes', (error, recipesList) => {
        if (error) {
            res.send('Sorry an error ocurred :(' + error.message)
        } else {
            model= {recipes: recipesList}
            res.render('list.handlebars', model)
        }
    })
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

/* ------------------------ */
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});