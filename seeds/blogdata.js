const { Blog } = require('../models/index');

const blogdata = [
  {
    title: 'Why MVC is so important',
    content : 'MVC allows developers to maintain a true separation of concerns, devising hier code between the Modal layer for data, the View layer for design, and the Controller layer for application logic.',
  //  blog_date: 'November 14, 2021 01:00:00',
    user_id: '1',
  },
  {
    title: 'Authentication vs Authorization',
    content : 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
  //  blog_date: 'November 14, 2021 01:00:00',
    user_id: '1',
  },
  {
    title : 'Object-Relational Mapping',
    content : 'I have really loved learning about ORMs. It\'s really simplified the way, I create the queries in MySQL.',
    user_id: '1',
  }
  
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;