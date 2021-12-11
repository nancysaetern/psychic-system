const User = require('./user');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };