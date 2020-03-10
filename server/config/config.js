module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "kanban_development",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "ognpguunhkspum",
    "password": "3f0578a7ffee9655563f4b19c9a8939012c6e09c374b4444f8414e47c29410df",
    "database": "d8tst3mmbr9dht",
    "host": "ec2-3-231-46-238.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
