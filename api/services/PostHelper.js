module.exports = {
  findPostByPage: (page_id, { type = "video", when = "today", limit = -1 }) => {
    return new Promise((res, rej) => {
      let model = type === "post" ? Posts : Videos;
      console.log(model.tableName);
      let modelName = model.identity[0].toUpperCase() + model.identity.substring(1);
      model.native((err, collection) => {
        const $match = { page_id: { $in: page_id.split(",") } };
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
        let pipeline = [{ $match }, { $lookup }, { $project }, { $sort: { diff: -1 } }];

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
