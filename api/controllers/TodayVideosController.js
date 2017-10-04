/**
 * TodayVideosController
 *
 * @description :: Server-side logic for managing todayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPage: (req, res) => {
    PostHelper.findPostByPage(req.params.page_id, { limit: req.query.limit }).then(response => {
      res.send(response);
    });
  }
};
