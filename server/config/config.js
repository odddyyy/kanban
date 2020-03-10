module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "kanban_development",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "nqqvdpnqvrgzvk",
    "password": "3751720a3edcf36729ae743ad6dd5be5f1cac452c728e9122bf3c341be79fd20",
    "database": "d3s05idhrkk8i6",
    "host": "ec2-184-72-236-3.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
