/**
 * ThirtyDVideosController
 *
 * @description :: Server-side logic for managing thirtydvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) => {
    PostHelper.findPostByPages(req.params.page_id, { when: "30d", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
