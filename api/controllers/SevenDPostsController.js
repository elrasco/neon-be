/**
 * 7dPostsController
 *
 * @description :: Server-side logic for managing 7dposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => {
    PostHelper.findPostByPages(req.params.page_id, { when: "7d", type: "post", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
