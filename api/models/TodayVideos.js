/**
 * TodayVideos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    video: {
      columnName: "objectId",
      model: "videos"
    },
    total_count: "integer",
    diff: "integer",
    page: {
      columnName: "page_id",
      model: "pages"
    }
  },
  tableName: "todayVideos",
  autoUpdatedAt: false,
  autoCreateddAt: false
};
