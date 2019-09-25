export default {
  // Users
  insertUser: 'INSERT INTO users ( "email", "firstName", "lastName", "hashedPassword", "role") VALUES($1, $2, $3, $4, $5) RETURNING *;',
  getSingleUser: 'SELECT * FROM users WHERE email = $1;',

  // halls
};
