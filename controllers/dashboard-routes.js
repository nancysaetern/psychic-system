const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  if (req.session.loggedIn !==true) {
     res.redirect('/login');
    return;
  }
  try {
    const dbBlogData = await Blog.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [ Comment, User]
      /*include: [
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
    
    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Add product route
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
      include: [ Comment, User]
      /*include: [
        {
          model: Comment,
          attributes: [
            'description',
            'comment_date',
            'user_id',
          ],
          
        },
      ],*/
    });

    const blog = dbBlogData.get({ plain: true });
 //   console.log(blog);
    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new blog 
router.post('/', async (req, res) => {
  try {
    const BlogData = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id:req.session.userId,
      
    });
    
    res.status(200).json(BlogData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update Blog
router.put('/:id', async(req, res) => {
  // update a blog by its `id` value
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

module.exports = router;