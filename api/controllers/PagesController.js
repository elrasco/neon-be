/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addPage: (req, res) => {
    const url = req.body.pageUrl;
    const splittedUrl = url.split("/");
    if (url.startsWith("http") && splittedUrl.length >= 3) alias = splittedUrl[3];
    return Pages.create({ objectId: alias }).then(res.ok);
  }
};
