const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));

const mysql = require('mysql');
const port = 3000;

var cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  
});


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'book_table'
});


connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

app.post('/books' , (req, res) => {
    let sql = 'INSERT INTO books SET ?'
    let post = {
        author: req.body.author,
        title : req.body.title,
        genre: req.body.genre,
        price: req.body.price
    }
    connection.query(sql, post, (err, res) => {
        if(err) throw err;
        console.log('Post Worked');
    });
    res.end();
});

app.get('/books/:book_name',(req,res)=>{
    const book_name = "%" + req.params.book_name + "%";
    let sql = 'SELECT * FROM books WHERE title LIKE ?';

    connection.query(sql, book_name, (err, result) => {
        if(err) throw err;
        console.log('Get worked');
        res.json(result);
    });


});
