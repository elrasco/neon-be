/**
 * YesterdayVideosController
 *
 * @description :: Server-side logic for managing yesterdayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "yesterday", min_diff: 50, sort: req.query.sort, w: req.query.w }).then(response =>
      res.send(response)
    ),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "yesterday", min_diff: 50, sort: req.query.sort, w: req.query.w }).then(videos => res.send(videos))
};
