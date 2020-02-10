var CmsHelper = require("../helpers/cms");

module.exports = function(campaignConnector) {
    return {
        list: function(obj, args, context, info) {
            return campaignConnector.list()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .toArray()
                .toPromise();
        }
    };
};
