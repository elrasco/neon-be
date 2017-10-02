/**
 * DetailController
 *
 * @description :: Server-side logic for managing details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require("moment");

module.exports = {
  get: (req, res) => {
    const { type, objectId, metric = "reactions" } = req.params;

    let model = type === "video" ? Vstatistics : type === "post" ? Pstatistics : "";
    let query = {
      reactions: { "reactions.objectId": objectId },
      likes: { "likes.objectId": objectId },
      comments: { "comments.objectId": objectId },
      shares: { "shares.objectId": objectId }
    };
    let projection = {
      reactions: { _id: 0, reactions: 1, created_at: 1, reactions: { $elemMatch: { objectId } } },
      likes: { _id: 0, likes: 1, created_at: 1, likes: { $elemMatch: { objectId } } },
      comments: { _id: 0, comments: 1, created_at: 1, comments: { $elemMatch: { objectId } } },
      shares: { _id: 0, shares: 1, created_at: 1, shares: { $elemMatch: { objectId } } }
    };

    new Promise((res, rej) => {
      model.native((err, collection) => {
        collection.find(query[metric], projection[metric]).toArray((err, result) => {
          if (err) rej(err);
          res(result);
        });
      });
    })
      .then(collection => {
        return {
          objectId: collection[0][metric][0].objectId,
          data: collection.map(el => {
            const { total_count } = el[metric][0];
            let newel = Object.assign(el, { total_count });
            delete newel[metric];
            newel.created_at = moment(el.created_at).format("YYYY.MM.DD_HHmm");
            return newel;
          })
        };
      })
      .then(result => {
        const model = type === "video" ? Videos : type === "post" ? Posts : "";
        return model
          .findOne({ objectId: result.objectId })
          .populate("page")
          .then(post => {
            result.post = post;
            return result;
          });
      })
      .then(result => {
        res.send(result);
      })
      .catch(error => res.serverError({ error }));
  }
};
