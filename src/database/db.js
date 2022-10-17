//set up connection to mysql
//using mysql2 due to err code: 'ER_NOT_SUPPORTED_AUTH_MODE'
const mysql = require('mysql2/promise') ;

class Database
{
  
  constructor() 
  {
    //connect to db
    async function connectDB()
    {
      // return await mysql.createConnection({
      //   host: 'localhost',
      //   user: 'root',
      //   password: '679604',
      //   database: 'all_curls'
      // });
      return await mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'ba3dbaf5fc8000',
        password: '684d4ae0',
        database: 'heroku_91b963a85e71ca7'
      });
    }

    this.createConnection = connectDB();
  }

  //connect function : test connect to db
  connect=async()=>
  {
    try {
      (await this.createConnection).connect()
      console.log("Successfully connected to database!")
    } catch (error) {
      console.log(error)
    }
  }

  //insert user into table
  insertUser=async(id, email, password, token)=>
  {
    try {

      return (await this.createConnection).execute('INSERT INTO user_credentials VALUES (?, ?, ?, ?);', [id, email, password, token]);
  
    } catch (error) {
      console.log("insertUser -- error: "+error)
    }
  } 

  //find user by username, retrieve hashed pass
  getUser = async(email) =>
  {
    console.log("getUser -- db")

    try {

     return (await this.createConnection).execute('SELECT id, email, passwords, token FROM user_credentials where email=?;', [email])
     
    } catch (error) {
      console.log(error)
    }
  }
}

const db = new Database();
db.connect()

module.exports = Database
