/**
 * YesterdayVideosController
 *
 * @description :: Server-side logic for managing yesterdayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "yesterday", min_diff: 20 }).then(response => {
      res.send(response);
    }),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "yesterday", min_diff: 20 }).then(videos => res.send(videos))
};
