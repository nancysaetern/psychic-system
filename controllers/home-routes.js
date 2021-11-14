const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [ Comment, User]
     /* include: [
        {
          model: Comment,
          attributes: ['description','comment_date','user_id'],
        },
      ],*/
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
  //  console.log(blogs);
    
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Add blog route
router.get('/blog/add', (req, res) => {
  //if (req.session.loggedIn) {
    // res.redirect('/');
   // return;
  //}
  res.render('blog',{loggedIn: req.session.loggedIn});
});
// GET one blog
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [ {model: Comment, include:[User]}, User]

    }
    );

    const blog = dbBlogData.get({ plain: true });
  //  console.log(blog);
  //  console.log(blog.comments[0].user)
    res.render('blog-comments', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new blog comment
router.post('/', async (req, res) => {
  try {
    const BlogCommentData = await Comment.create({
      blog_id: req.body.blog_id,
      description: req.body.description,
      user_id:req.session.userId,
      
    });
    
    res.status(200).json(BlogCommentData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async(req, res) => {
  // update a product by its `id` value
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;