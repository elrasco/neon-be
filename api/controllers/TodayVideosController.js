/**
 * TodayVideosController
 *
 * @description :: Server-side logic for managing todayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "today", sort: req.query.sort, w: req.query.w, min_diff: 50 }).then(response =>
      res.send(response)
    ),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "today", sort: req.query.sort, w: req.query.w, min_diff: 50 }).then(videos => res.send(videos))
};
