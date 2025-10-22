/* 
Moises Cortes - moiseskhana@gmail.com - como25xv@ju.se

Target grade: 4

Project WebDev Fun 2025

Admin login: admin
Admin password: wdf#2025 ---> "$2b$12$IPFhrIOq9SqSR5tPX85IgeAJLfn0ITVQWtsf2XT1CtH8btUfEumuu"

Used ChatGPT for the CSS and correct a couple of routes
images used from:
- https://unsplash.com
- https://www.istockphoto.com
- brandslogos.com
- 

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
app.use(express.urlencoded({ extended: true }));
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
app.get('/list', function (req, res) {
  const pageSize = 3;
  let page = parseInt(req.query.page, 10);
  if (isNaN(page) || page < 1) page = 1;
  db.get('SELECT COUNT(*) AS count FROM recipes', (errCount, row) => {
    if (errCount) {
      console.error('Error counting recipes:', errCount.message);
      return res.send('Sorry, an error occurred :( ' + errCount.message);
    }
    const totalItems = row.count || 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (page > totalPages) page = totalPages;

    const offset = (page - 1) * pageSize;
    const sql = `
      SELECT 
        recipes.recipe_id,
        recipes.title,
        recipes.description,
        recipes.ingredients,
        recipes.instructions,
        recipes.credits,
        recipes.img_url,
        recipes.category_id,
        categories.category_name
      FROM recipes
      INNER JOIN categories 
        ON recipes.category_id = categories.category_id
      ORDER BY recipes.recipe_id ASC
      LIMIT ? OFFSET ?
    `;
    db.all(sql, [pageSize, offset], (error, recipesList) => {
      if (error) {
        console.error("Error fetching recipes:", error.message);
        return res.send('Sorry, an error occurred :( ' + error.message);
      }
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      const model = {
        recipes: recipesList,
        pagination: {
          currentPage: page,
          totalPages,
          hasPrev: page > 1,
          hasNext: page < totalPages,
          prevPage: Math.max(1, page - 1),
          nextPage: Math.min(totalPages, page + 1),
          totalItems,
          pageSize
        },
        pages
      };
      res.render('list.handlebars', model);
    });
  });
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
    const {title, desc, ingred, instruc, credits, img, categid} = req.body
    if (req.session.isAdmin) {
        db.run('INSERT INTO recipes (title, description, ingredients, instructions, credits, img_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, desc, ingred, instruc, credits, img, categid], (error) => {
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
        db.get('SELECT * FROM recipes WHERE recipe_id=?', [myRecipeId], (error, theRecipe) => {
        console.log(`-->Editing the recipe: ${JSON.stringify(theRecipe)}`)
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
app.post('/list/update/:recipe_id', (req, res) => {
    let myRecipeId = req.params.recipe_id
    const {title, desc, ingred, instruc, credits, img, categid} = req.body
    if(req.session.isAdmin) {
        db.run('UPDATE recipes SET title=?, description=?, ingredients=?, instructions=?, credits=?, img_url=?, category_id=? WHERE recipe_id=?', [title, desc, ingred, instruc, credits, img, categid, myRecipeId], (error) => {
            if (error) {
                console.error(error.message)
                const model = {error: "Error updating the Recipe :( "}
                res.render('list', model);
            } else {
                console.log('Recipe succesfully updated :) ')
                res.redirect('/list')
            }
        })
    } else {
        model = {error: "You need to be logged in to modify a Recipe"}
        res.render('list', model)
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
app.get('/recomendations', function (req, res) {
    db.all('SELECT * FROM coffeeshops', (error, coffeelist) => {
        if (error) {
            console.error("Error fetching recomendations:", error.message);
            return res.send('Sorry, an error occurred :( ' + error.message);
        } else{
            console.log(`-->Retrieving the cshops: ${JSON.stringify(coffeelist)}`)
            model = { cshop: coffeelist };
            res.render('recomendations', model)
        }
    })
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