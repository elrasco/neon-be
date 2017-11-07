/**
 * TodayPostsController
 *
 * @description :: Server-side logic for managing todayposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    PostsHelper.find({ limit: req.query.limit, pages: req.params.page_id }).then(response => {
      res.send(response);
    }),
  find: (req, res) => PostsHelper.find({ limit: req.query.limit, when: "today" }).then(posts => res.send(posts))
};
