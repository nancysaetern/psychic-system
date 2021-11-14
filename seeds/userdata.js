const { User } = require('../models/index');

const userdata = [
  {
    username: 'Quinn',
    email: 'quinn@quinn.com',
    password: 'quinn123',
    
  },
  
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;