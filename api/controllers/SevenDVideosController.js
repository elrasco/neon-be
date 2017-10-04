/**
 * SevenDVideosController
 *
 * @description :: Server-side logic for managing sevendvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => {
    PostHelper.findPostByPages(req.params.page_id, { when: "7d", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  },
  find: (req, res) => {
    PostHelper.findPostByPages(null, { when: "7d", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
