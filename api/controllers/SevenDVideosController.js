/**
 * SevenDVideosController
 *
 * @description :: Server-side logic for managing sevendvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "7d", min_diff: 30 }).then(response => {
      res.send(response);
    }),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "7d", min_diff: 30 }).then(videos => res.send(videos))
};
