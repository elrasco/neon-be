/**
 * ThirtyDVideos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    video: {
      columnName: 'objectId',
      model: 'videos',
      onKey: 'objectId'
    },
    total_count: 'integer',
    diff: 'integer'
  },
  tableName: '30dVideos',
  autoUpdatedAt: false,
  autoCreateddAt: false
};