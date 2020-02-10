var Rx = require("@reactivex/rxjs");

module.exports = (EDITOR_PICK_LIST_ENDPOINT) => (fetchJsonClient) => {
    if (!EDITOR_PICK_LIST_ENDPOINT) {
        throw new Error("no EDITOR_PICK_LIST_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }

    return {
        list: function(pagesize, page, start) {
            pagesize = pagesize || 20;
            page = page || 1;
            start = start || 0;
            var url = `${EDITOR_PICK_LIST_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.Article && json.Article.length > 0) {
                        return Rx.Observable.from(json.Article);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        }
    };
};
