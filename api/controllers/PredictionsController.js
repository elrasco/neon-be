/**
 * PredictionsController
 *
 * @description :: Server-side logic for managing predictions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  byVideoId: (req, res) => {
    const { video_id } = req.params;
    Predictions.findOne({ where: { video_id } }).then(prediction => {
      if (prediction) {
        res.send(prediction);
      } else {
        Lambda.invokeAnalyzer(video_id);
        res.send({ status: "SENT", video_id });
      }
    });
  }
};
