const { Comment } = require('../models/index');

const commentdata = [
  {
    description: 'Class is fun.',
   
    blog_id: 1,
    user_id: 1,
    
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;