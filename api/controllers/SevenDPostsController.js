/**
 * 7dPostsController
 *
 * @description :: Server-side logic for managing 7dposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => PostsHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "7d", min_diff: 500 }).then(posts => res.send(posts)),
  find: (req, res) => PostsHelper.find({ limit: req.query.limit, when: "7d", min_diff: 500 }).then(posts => res.send(posts))
};
