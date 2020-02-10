var CmsHelper = require("../helpers/cms");

module.exports = function(eventConnector) {
    return {
        listUpcomingEvent: function(obj, args, context, info) {
            return eventConnector.listUpcomingEvent()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpiredNoStart(new Date()))
                .toArray()
                .map(arts => arts.sort((a, b) => {
                    if (a.endDateTime < b.endDateTime) {
                        return -1;
                    } else if (a.endDateTime > b.endDateTime) {
                        return 1;
                    }
                    return 0;
                }))
                .toPromise();
        },
        listPostEvent: function(obj, args, context, info) {
            return eventConnector.listPostEvent(args.pagesize, args.page, args.start)
                .map(CmsHelper.CmsArticleMapper)
                .toArray()
                .toPromise();
        },
        totalPostEvent: function(obj, args, context, info) {
            return eventConnector.totalPostEvent()
                .take(1)
                .toPromise();
        }
    };
};
