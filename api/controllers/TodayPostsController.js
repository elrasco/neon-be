/**
 * TodayPostsController
 *
 * @description :: Server-side logic for managing todayposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => PostsHelper.find({ limit: req.query.limit, pages: req.params.page_id, sort: req.query.sort, w: req.query.w }).then(response => res.send(response)),
  find: (req, res) => PostsHelper.find({ limit: req.query.limit, when: "today", sort: req.query.sort, w: req.query.w }).then(posts => res.send(posts))
};
