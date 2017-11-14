const getModel = (when, type) => {
  let tableName = when + type[0].toUpperCase() + type.substring(1) + "s";

  let identity = Object.keys(sails.models).find(identity => sails.models[identity].tableName === tableName);
  return sails.models[identity];
};

const $match_gt = ($gt, sort) => {
  let jsonData = {};
  if (sort.endsWith("_normalized")) jsonData[sort.replace("_normalized", "")] = { $gt };
  else jsonData[sort] = { $gt };

  return jsonData;
};
const $lookup = ({ from, localField = "objectId", foreignField = "objectId", as }) => {
  return {
    from,
    localField,
    foreignField,
    as: as || from.slice(0, -1)
  };
};

const normalize = (reaction_type, metric, weight = 1.5) => {
  return {
    $let: {
      vars: {
        pow: { $pow: ["$page_fan_count", parseFloat(weight)] }
      },
      in: { $multiply: [{ $divide: [`$${reaction_type}s_${metric}`, "$$pow"] }, 10000] }
    }
  };
};

const $project = weight => {
  return {
    _id: 0,
    objectId: 1,
    video: { $arrayElemAt: ["$video", 0] },
    reactions_total_count: 1,
    reactions_total_count_normalized: normalize("reaction", "total_count", weight),
    reactions_diff: 1,
    reactions_diff_normalized: normalize("reaction", "diff", weight),
    comments_total_count: 1,
    comments_total_count_normalized: normalize("comment", "total_count", weight),
    comments_diff: 1,
    comments_diff_normalized: normalize("comment", "diff", weight),
    likes_total_count: 1,
    likes_total_count_normalized: normalize("like", "total_count", weight),
    likes_diff: 1,
    likes_diff_normalized: normalize("like", "diff", weight),
    shares_total_count: 1,
    shares_total_count_normalized: normalize("share", "total_count", weight),
    shares_diff: 1,
    shares_diff_normalized: normalize("share", "diff", weight),
    page_fan: "$page_fan_count",
    page_fan_count: 1,
    page_id: 1,
    analysys: { $arrayElemAt: ["$prediction.status", 0] }
  };
};

const $sort = field => {
  let jsonData = {};
  jsonData[field] = -1;
  return jsonData;
};

module.exports = {
  find: ({ limit = 200, when = "today", pages = false, min_diff = 0, sort = "shares_diff_normalized", w = 1.5 }) => {
    return new Promise((res, rej) => {
      getModel(when, "video").native((err, collection) => {
        let pipeline = [
          { $match: $match_gt(min_diff, sort) },
          { $lookup: $lookup({ from: "videos" }) },
          { $lookup: $lookup({ from: "predictions", foreignField: "video_id" }) },
          { $project: $project(w) },
          { $sort: $sort(sort) }
        ];
        if (limit > 0) {
          pipeline.push({ $limit: parseInt(limit) });
        }
        if (pages) {
          const $match = { page_id: { $in: pages.split(",") } };
          pipeline.unshift({ $match });
        }
        collection.aggregate(pipeline, function(err, response) {
          if (err) {
            console.log(err);
            rej(err);
          } else {
            res(response);
          }
        });
      });
    });
  }
};
