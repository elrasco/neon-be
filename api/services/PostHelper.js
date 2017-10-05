const getModel = (when, type) => {
  let tableName = when + type[0].toUpperCase() + type.substring(1) + "s";

  let identity = Object.keys(sails.models).find(identity => sails.models[identity].tableName === tableName);
  return sails.models[identity];
};

module.exports = {
  findPostByPages2: (page_ids, { type = "video", when = "today", limit = 200 }) => {
    return new Promise((res, rej) => {
      getModel(when, type).native((err, collection) => {
        const $lookup = {
          from: type + "s",
          localField: "objectId",
          foreignField: "objectId",
          as: type
        };

        const $project = {
          _id: 0,
          diff: 1,
          total_count: 1,
          objectId: 1,
          video: { $arrayElemAt: ["$video", 0] },
          post: { $arrayElemAt: ["$post", 0] }
        };

        if (type === "post") {
          delete $project.video;
        } else {
          delete $project.post;
        }

        let pipeline = [{ $lookup }, { $project }];

        if (page_ids) {
          const $match = { "post.page_id": { $in: page_ids.split(",") } };
          pipeline.push({ $match });
        }

        if (limit > 0) {
          pipeline.push({ $limit: parseInt(limit) });
        }

        const before = new Date().getTime();

        collection.aggregate(pipeline, function(err, response) {
          if (err) {
            rej(err);
          } else {
            const after = new Date().getTime();
            console.log(after - before);
            res(response);
          }
        });
      });
    });
  },
  findPostByPages: (page_id, { type = "video", when = "today", limit = 200 }) => {
    return new Promise((res, rej) => {
      let model = type === "post" ? Posts : Videos;
      let modelName = model.identity[0].toUpperCase() + model.identity.substring(1);
      model.native((err, collection) => {
        const $lookup = {
          from: when + modelName,
          localField: "objectId",
          foreignField: "objectId",
          as: "stats"
        };

        const $project = {
          _id: 0,
          diff: { $arrayElemAt: ["$stats.diff", 0] },
          total_count: { $arrayElemAt: ["$stats.total_count", 0] },
          objectId: { $arrayElemAt: ["$stats.objectId", 0] },
          video: {
            source: "$source",
            description: "$description",
            title: "$title",
            picture: "$picture",
            length: "$length",
            created_time: "$created_time",
            content_category: "$content_category",
            objectId: "$objectId",
            page_id: "$page_id"
          },
          post: {
            description: "$description",
            title: "$title",
            picture: "$picture",
            type: "$type",
            created_time: "$created_time",
            objectId: "$objectId",
            page_id: "$page_id"
          }
        };

        if (type === "post") {
          delete $project.video;
        } else {
          delete $project.post;
        }

        let pipeline = [{ $lookup }, { $project }, { $sort: { diff: -1 } }];

        if (page_id) {
          const $match = { page_id: { $in: page_id.split(",") } };
          pipeline.unshift({ $match });
        }

        if (limit > 0) {
          pipeline.push({ $limit: parseInt(limit) });
        }

        collection.aggregate(pipeline, function(err, response) {
          if (err) {
            rej(err);
          } else {
            res(response);
          }
        });
      });
    });
  }
};
