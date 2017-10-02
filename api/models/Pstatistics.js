/**
 * Pstatistics.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    created_at: "datetime",
    y: "integer",
    m: "integer",
    d: "integer",
    h: "integer",
    comments: "array",
    likes: "array",
    reactions: "array",
    shares: "array"
  }
};
