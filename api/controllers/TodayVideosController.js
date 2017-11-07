/**
 * TodayVideosController
 *
 * @description :: Server-side logic for managing todayvideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByPages: (req, res) =>
    VideosHelper.find({ limit: req.query.limit, pages: req.params.page_id }).then(response => {
      res.send(response);
    }),
  find: (req, res) => VideosHelper.find({ limit: req.query.limit, when: "today" }).then(videos => res.send(videos))
};
