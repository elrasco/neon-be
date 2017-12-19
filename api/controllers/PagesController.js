/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addPage: (req, res) => {
    console.log(req.body);
    const { objectId, fan_count, name } = req.body;
    return Pages.insert({ objectId, fan_count, name }).then(res.send);
  },
  all: (req, res) => {
    Pages.find().then(aaa => {
      return res.send({});
    });
  }
};
