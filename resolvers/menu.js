var CmsHelper = require("../helpers/cms");

module.exports = function(menuConnector) {
    return {
        list: function(obj, args, context, info) {
            return menuConnector
                .list()
                .map(CmsHelper.CmsFeedItemMapper)
                .toArray()
                .map(items => items.sort((a, b) => a.sort - b.sort))
                .toPromise();
        },
        findArticleCategory: function(obj, args, context, info) {
            var rawThemeTags = (obj.rawThemeTags || [])
                .map(t => t.replace("_add", ""))
                .filter(t => t.trim() !== "");
            return menuConnector
                .list()
                .map(CmsHelper.CmsFeedItemMapper)
                .filter(m => rawThemeTags.indexOf(m.eName) >= 0)
                .take(1)
                .map(m => m.name)
                .toPromise();
        }
    };
};
