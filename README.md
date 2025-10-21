# INSTRUCTIONS FOR DOWNLOADING AND RUNNING
**Requirements:** 
- Node.js recomended v18+
- npm 

## 1- Clone Github repository
git clone https://github.com/m0y-Cortes/WebDev-Is-Fun.git
cd tu-repositorio

## 2- Install dependencies
npm install

## 3- Execute the app
node server.js
Open in your browser: http://localhost:3000

# EXAMPLE
![example in terminal](/public/images/image.png)
Wednesday, 22 October 2025 BEFORE 12:00
• Submit only one zip (compressed) file of your project
directory (without the ”node_modules” directory, of
course)

# TIPS AND EXTRA INFO
- *You need to be logged in for some buttons to be visible. For example: Add Recipe*
- *If for some reason the database doesn't work or is empty there is a .sql file with the necesary tables schemas and data to populate it in the DB-schema-data directory*

----------------- 3 PUNTOS -----------------

- The code works without error, there are sufficient comments in the code,
- The code uses Node.js, Express, Handlebars and SQLite3,
- The final website is a one-page dynamic application, the menu MUST 
contain at least: Home, List (can be renamed depending on your project choice), About, Contact,
- The Database has at least two tables (at least 5 records) that are displayed on the pages, the tables have at least 3 fields,
- The menu “List” must link to a page displaying the list of elements
(except the user table used for grade 5) from one of your tables, a
detailed view of one element is given when you click on it,
- Basic security (no SQL injection) and login/encrypted password checked to modify the data, there is a message to know if the user is connected or not,
- The login and password for the user are respectively “admin” and
“wdf#2025”,
- Usage of SELECT/INSERT/UPDATE/DELETE (CRUD) operations to
display/modify one table,
- Acceptable UI/UX using basic CSS.

----------------- 4 PUNTOS -----------------

### -Requirements for grade 3 above PLUS:
- Database with three or more tables (at least 5 records in each table), two of them being linked (SQL INNER JOIN) in at least one query (that is used in the pages),
- There is a list with a dynamic pagination system (at least 3 pages with 3 elements per page) for one table (so, at least 9 records in this table),
- Moderate UI/UX with Flexbox or Grid CSS.