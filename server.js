/* Moises Cortes - moiseskhana€gmail.com    Portfolio JL -2025*/

//const adminPassword = 'wdf#2025'
/* 
const cookieParser = require('cookie-parser') // reads a cookie
const lastVisit = parseInt(request.cookies.lastVisit)
let firstName = request.cookie.firstName 
app.use(cookieParser())
*/
const express = require('express');
const { engine } = require('express-handlebars');
const bcrypt = require('bcrypt')
const session = require('express-session')
const sqlite3 = require('sqlite3') //loads the sqlite packae
const connectSqlite3 = require('connect-sqlite3') //store the sessions in a SQLite3 DB file 

const PORT = 3000;
const app = express();

const adminPassword = "$2b$12$IPFhrIOq9SqSR5tPX85IgeAJLfn0ITVQWtsf2XT1CtH8btUfEumuu"
app.use(express.static('public'))
/* ------------ Handlebars config ------------- */
app.engine('handlebars', 
    engine({
        helpers: {
            eq (a,b) { return a==b; }
        }
    })
) // initialize the engine to be handlebars
app.set('view engine', 'handlebars') // set handlebars as the view engine
app.set('views', './views') // define the views directory to be ./views
app.use(express.urlencoded({ extended: false }));
/* -------------------------------------------- */
/* ------------ DB conection ------------ */
db = new sqlite3.Database('orangeKaffeDB.sqlite') //loads the database and puts its content in the "db" variable
const SQLiteStore = connectSqlite3(session) //stores session in db
/* -------------------------------------- */
/* ------------ Sessions Middleware ------------- */
app.use(session({
    store:  new SQLiteStore({db: "session-db.db"}),
    "saveUninitialized": false,
    "resave": false,
    "secret": "This123IsASecret678Sentence"
}))
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
}) //Makes the session available in all the handlebarsfiles 
/* ---------------------------------------------- */
/* ------------ ROUTES ------------ */
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req,res) => {
    res.render('login');
});
app.post('/login', (req, res) => {  
    console.log(`New log in data: ${req.body.username}, ${req.body.password}`);
    if (req.body.username==="admin") {
        bcrypt.compare(req.body.password, adminPassword, (error, result) =>{
            if (error) {
                console.log('Error in password comparison')
                model = {error: "Error in password comparison"}
                res.render('login', model)
            }
            if (result) {
                req.session.isLoggedIn = true
                req.session.username = req.body.username
                req.session.isAdmin = true
                console.log('Session Info: ', JSON.stringify(req.session))
                res.render('home') //en el lab es loggedin
            } else {
                console.log('Wrong password')
                model = {error: "Wrong password! Try again."}
                res.render('login', model)
            }
        })
    } else {
        console.log('Wrong Username')
        model = {error: "Wrong username! Try again"}
        res.render('login', model)
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy( (error) => {
        if (error) {
            console.log('Error destroying the session :( ', error)
            res.redirect('/')
        } else {
            console.log('Logged out ')
            res.redirect('/')
        }
    })
});

//-------------- LISTING VIEW
app.get('/list', function(req, res) {
    db.all('SELECT * FROM recipes ', (error, recipesList) => {
        if (error) {
            res.send('Sorry an error ocurred :(' + error.message)
        } else {
            model= {recipes: recipesList}
            res.render('list.handlebars', model)
        }
    })
});
//-------------- CREATE
app.get('/list/new', (req, res) => {
    if (req.session.isAdmin) {
        res.render('form-recipe')
    } else {
        model = {error: "You need to be logged in to create a new Recipe"}
        res.render('list', model)
    }
});
app.post('/list/new', (req, res) => {
    console.log(`Here comes the data received from the form on the client: ${JSON.stringify(req.body)} `)
    const {title, desc, ingred, instruc, credits, categid} = req.body
    if (req.session.isAdmin) {
        db.run('INSERT INTO recipes (title, description, ingredients, instructions, credits, category_id) VALUES (?, ?, ?, ?, ?, ?)', [title, desc, ingred, instruc, credits, categid], (error) => {
            if (error) {
                console.error(error.message);
                const model = {error: "Error inserting the new recipe into de DB :( "}
                res.render('list', model);
            } else {
                console.log('New Recipe created :) ')
                res.redirect('/list')
            }
        })
    } else {
        model = {error: "You need to be logged in to create a new Recipe "}
        res.render('login', model)
    }
});

//-------------- READ SINGLE
app.get('/list/:recipe_id', function(req, res) {
    let myRecipeId=req.params.recipe_id
    db.get('SELECT * FROM recipes WHERE recipe_id=?', [myRecipeId], (error, theRecipe) => {  //use db.get when there is a condition for the request
        if (error) {
            console.error(error.message);
            const model = { error: 'An error ocurred while retiving the recipe :( ' }
            res.render('one-Recipe', model);
        } else {
            console.log(`---> Retrived Recipes from DB`);
            console.log(`---> Recipe: ${JSON.stringify(theRecipe)}`);
            const model = {recipe: theRecipe}
            res.render('one-recipe', model);
        }
    })
});
//-------------- UPDATE
app.get('/list/update/:recipe_id', (req, res) => {
    let myRecipeId= req.params.recipe_id
    if (req.session.isAdmin) {
        db.get('SELECT * FROM recipes WHERE recipe_id?', [myRecipeId], (error, theRecipe) => {
            if (error) {
                console.error(error.message);
                const model = {error: "Error geting the recipe from DB"}
                res.render('home', model);
            } else {
                const model = {recipe: theRecipe};
                res.render('form-recipe', model);
            }
        })
    } else {
        model = {error: "You need to be logged in to do this :( "}
        res.render('login', model);
    }
});
//-------------- DELETE
app.post('/list/delete/:recipe_id', (req, res) => {
    let myRecipeId=req.params.recipe_id
    if (req.session.isAdmin) {
        db.run('DELETE FROM recipes WHERE recipe_id=?', [myRecipeId], (error) => {
            if (error) {
                console.error(error.message)
                console.log("Error deleting the RECIPE from the DB")
                res.redirect('/list');
            } else {
                console.log("The RECIPE has been DELETED >:) ")
                res.redirect('/list')
            }
        })
    } else {
        model = {error: "You need to be loged in as an ADMIN to delete a post"}
        res.render('login', model)
    }
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

/* ------------------------ */
function hashPassword(pw, saltRounds) {
    bcrypt.hash(pw, saltRounds, function(error, hash) {
        if (error) {
            console.log('Error hashing password :( ', error);
        } else {
            console.log(`--> HASED PASSWORD: ${hash}` );
        }
    });
}

app.listen(PORT, () => {
    //hashPassword('wdf#2025', 12); 
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});