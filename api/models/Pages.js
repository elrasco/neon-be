/**
 * Pages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    objectId: {
      type: "string",
      primaryKey: true
    },
    fan_count: "integer",
    name: "string"
  }
};
