const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

/*

Esse modelo define um esquema de usuário com os campos name, email e password, onde o email deve ser único. O modelo é exportado e 
pode ser usado na classe de Login.

*/
