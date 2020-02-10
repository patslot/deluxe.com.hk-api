var CmsHelper = require("../helpers/cms");

module.exports = function(mpmConnector) {
    return {
        list: function(obj, args, context, info) {
            return mpmConnector.list()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
        listFashionMPM: function(obj, args, context, info) {
            return mpmConnector.listFashionMPM()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
        listBeautyMPM: function(obj, args, context, info) {
            return mpmConnector.listBeautyMPM()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
         listLuxeMPM: function(obj, args, context, info) {
            return mpmConnector.listLuxeMPM()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
        listLifeStyleMPM: function(obj, args, context, info) {
            return mpmConnector.listLifeStyleMPM()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
        listCelebMPM: function(obj, args, context, info) {
            return mpmConnector.listCelebMPM()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()))
                .map(d =>
                    Object.assign({}, d, {title: d.content, label: d.catName})
                )
                .toArray()
                .map(d => d.sort(function(a, b) {
                    if (a.sort > b.sort) { return -1; }
                    else if (a.sort < b.sort) { return 1; }
                    else {
                        if (a.startDateTime > b.startDateTime) { return -1; }
                        else if (a.startDateTime < b.startDateTime) { return 1; }
                        else { return 0; }
                    }
                }))
                .toPromise();
        },
        
    };
};
