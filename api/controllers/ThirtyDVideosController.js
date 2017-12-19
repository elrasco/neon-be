/**
 * ThirtyDVideosController
 *
 * @description :: Server-side logic for managing thirtydvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id, when: "30d", min_diff: 200, sort: req.query.sort, w: req.query.w }).then(videos => res.send(videos)),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "30d", min_diff: 200, sort: req.query.sort, w: req.query.w }).then(videos => res.send(videos))
};
