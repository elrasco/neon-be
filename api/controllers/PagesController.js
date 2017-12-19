/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addPage: (req, res) => {
    const url = req.body.pageUrl;
    const aliasOrId = url.split("/")[3];
    const splittedAlias = aliasOrId.split("-");
    const isId = splittedAlias.length > 0;
    let objectId = isId ? splittedAlias[splittedAlias.length - 1] : (objectId = aliasOrId);

    return Pages.create({ objectId }).then(res.ok);
  }
};
