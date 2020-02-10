var CmsHelper = require("../helpers/cms");

module.exports = function(bannerConnector) {
    return {
        listContributor: function(obj, args, context, info) {
            return bannerConnector.list()
                .filter(function(d) { return d.CatName === "CONT_BANNER"; })
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .toArray()
                .toPromise();
        },
        listEvent: function(obj, args, context, info) {
            return bannerConnector.list()
                .filter(function(d) { return d.CatName === "EVENT_BANNER"; })
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .toArray()
                .toPromise();
        },
    };
};
