const { User } = require('../models/index');

const userdata = [
  {
    username: 'Jblack',
    email: 'joe@joe.com',
    password: 'joe123',
    
  },
  
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;