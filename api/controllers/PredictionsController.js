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
  predictByVideoId: (req, res) => {
    const { video_id } = req.params;
    Predictions.findOne({ where: { video_id } }).then(prediction => {
      if (prediction) {
        res.send(prediction);
      } else {
        Lambda.invokeAnalyzer(video_id);
        setTimeout(() => {
          Predictions.findOne({ where: { video_id } }).then(p => {
            if (p) {
              res.send(p);
            } else {
              res.send({
                video_id,
                status: "UNKNOWN"
              });
            }
          });
        }, 1500);
      }
    });
  },
  getByVideoId: (req, res) => {
    Predictions.findOne({ where: { video_id } }).then(prediction => {
      res.send(prediction);
    });
  }
};
