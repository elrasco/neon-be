/**
 * YesterdayVideosController
 *
 * @description :: Server-side logic for managing yesterdayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => {
    PostHelper.findPostByPages(req.params.page_id, { when: "yesterday", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  },
  find: (req, res) => {
    PostHelper.findPostByPages(null, { when: "yesterday", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
