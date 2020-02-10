var CmsHelper = require("../helpers/cms");

function homeArticleSorter(a, b) {
    if (a.sort === b.sort) {
        if (a.startDateTime > b.startDateTime) {
            return 1;
        } else if (a.startDateTime < b.startDateTime) {
            return -1;
        }
        return 0;
    }
    return a.sort - b.sort;
}

function listItemPostProcess(itemObservable) {
    return itemObservable
        .map(CmsHelper.CmsComponeFeedItemMapper)
        .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
        .toArray()
        .map(arts => arts.sort(homeArticleSorter));
}

module.exports = function(homeConnector) {
    return {
        listLatest: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listLatest())
                .toPromise();
        },
        listFashion: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listFashion())
                .toPromise();
        },
        listBeauty: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listBeauty())
                .toPromise();
        },
        listLuxe: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listLuxe())
                .toPromise();
        },
        listWedding: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listWedding())
                .toPromise();
        },
        listCelebrity: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listCelebrity())
                .toPromise();
        },
        listLifeStyle: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listLifeStyle())
                .toPromise();
        },
        listHighlight: function(obj, args, context, info) {
            return listItemPostProcess(homeConnector.listHighlight())
                .toPromise();
        },
        listEditorPick: function(obj, args, context, info) {
            return homeConnector.listEditorPick()
                .map(CmsHelper.CmsSpecialFeedItemMapper)
                .toArray()
                .toPromise();
        }
    };
};
