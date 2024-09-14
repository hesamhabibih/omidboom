const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    // Public routes
    app.get("/api/post/all", controller.getAllPosts);  // Retrieve all posts
    app.get("/api/post/:id", controller.getPostById); // Retrieve a single post by ID
  
    // Authentication and authorization required for the following routes
    // app.use(authJwt.verifyToken); // Apply authentication middleware
  
    app.post("/api/post", controller.createPost); // Create a new post
    app.put("/api/post/:id", controller.updatePostById); // Update a post by ID
    app.delete("/api/post/:id", controller.deletePostById); // Delete a post by ID

};
