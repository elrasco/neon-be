/**
 * Videos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    objectId: {
      primaryKey: true,
      type: "string"
    },
    created_time: "datetime",
    source: "string",
    description: "string",
    title: "string",
    picture: "string",
    content_category: "string",
    length: "double",
    page: {
      columnName: "page_id",
      model: "pages"
    }
  }
};
