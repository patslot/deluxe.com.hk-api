var Rx = require("@reactivex/rxjs");

module.exports = (
    UPCOMING_EVENT_ENDPOINT,
    POST_EVENT_ENDPOINT
) => (fetchJsonClient) => {
    if (!UPCOMING_EVENT_ENDPOINT) {
        throw new Error("no UPCOMING_EVENT_ENDPOINT");
    }
    if (!POST_EVENT_ENDPOINT) {
        throw new Error("no POST_EVENT_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }

    return {
        listUpcomingEvent: function() {
            var url = UPCOMING_EVENT_ENDPOINT;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    return json && json.length > 0 ?
                        Rx.Observable.from(json) : Rx.Observable.empty();
                })
                .mergeAll();
        },
        listPostEvent: function(pagesize, page, start) {
            page = page || 1;
            pagesize = pagesize || 20;
            start = start || 0;
            var url = POST_EVENT_ENDPOINT + `/0/${pagesize}/${page}/${start}/publish`;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.Article && json.Article.length > 0) {
                        return Rx.Observable.from(json.Article);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        },
        totalPostEvent: function() {
            var url = POST_EVENT_ENDPOINT + `/0/1/1`;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.TotalRec) {
                        return Rx.Observable.of(+json.TotalRec);
                    } else {
                        return Rx.Observable.of(0);
                    }
                })
                .mergeAll();
        },
    };
};
