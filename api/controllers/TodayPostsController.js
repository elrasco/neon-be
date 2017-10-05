/**
 * TodayPostsController
 *
 * @description :: Server-side logic for managing todayposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => {
    PostHelper.findPostByPages(req.params.page_id, { type: "post", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
