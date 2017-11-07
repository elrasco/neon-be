/**
 * YesterdayPostsController
 *
 * @description :: Server-side logic for managing yesterdayposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => PostsHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "yesterday", min_diff: 50 }).then(posts => res.send(posts)),
  find: (req, res) => PostsHelper.find({ limit: req.query.limit, when: "yesterday", min_diff: 50 }).then(posts => res.send(posts))
};
