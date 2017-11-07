const getModel = (when, type) => {
  let tableName = when + type[0].toUpperCase() + type.substring(1) + "s";

  let identity = Object.keys(sails.models).find(identity => sails.models[identity].tableName === tableName);
  return sails.models[identity];
};
const $pages$lookup = {
  from: "pages",
  localField: "page_id",
  foreignField: "objectId",
  as: "page"
};
const $match_gt = $gt => {
  return { diff: { $gt } };
};
const $posts$lookup = {
  from: "posts",
  localField: "objectId",
  foreignField: "objectId",
  as: "post"
};
const $findProject = {
  _id: 0,
  objectId: 1,
  post: { $arrayElemAt: ["$post", 0] },
  diff_normalized: {
    $let: {
      vars: {
        pow: { $pow: [{ $arrayElemAt: ["$page.fan_count", 0] }, 1.5] }
      },
      in: { $multiply: [{ $divide: ["$diff", "$$pow"] }, 10000] }
    }
  },
  total_count_normalized: {
    $let: {
      vars: {
        pow: { $pow: [{ $arrayElemAt: ["$page.fan_count", 0] }, 1.5] }
      },
      in: { $multiply: [{ $divide: ["$total_count", "$$pow"] }, 10000] }
    }
  },
  total_count: 1,
  diff: 1,
  page_fan: { $arrayElemAt: ["$page.fan_count", 0] },
  page_id: 1
};
const $sort = {
  diff_normalized: -1
};

module.exports = {
  find: ({ limit = 200, when = "today", pages = false, min_diff = 10 }) => {
    return new Promise((res, rej) => {
      getModel(when, "post").native((err, collection) => {
        let pipeline = [{ $match: $match_gt(min_diff) }, { $lookup: $pages$lookup }, { $lookup: $posts$lookup }, { $project: $findProject }, { $sort }];
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
