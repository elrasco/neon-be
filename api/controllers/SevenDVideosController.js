/**
 * SevenDVideosController
 *
 * @description :: Server-side logic for managing sevendvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPage: (req, res) => {
    PostHelper.findPostByPage(req.params.page_id, { when: "7d", limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
