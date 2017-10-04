/**
 * ThirtyDPostsController
 *
 * @description :: Server-side logic for managing thirtydposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPage: (req, res) => {
    PostHelper.findPostByPage(req.params.page_id, { when: "30d", type: "post", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
