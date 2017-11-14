/**
 * ThirtyDPostsController
 *
 * @description :: Server-side logic for managing thirtydposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    PostsHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "30d", min_diff: 50, sort: req.query.sort, w: req.query.w }).then(posts => res.send(posts)),
  find: (req, res) => PostsHelper.find({ limit: req.query.limit, when: "30d", min_diff: 50, sort: req.query.sort, w: req.query.w }).then(posts => res.send(posts))
};
