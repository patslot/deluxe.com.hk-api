var Rx = require("@reactivex/rxjs");

module.exports = (BANNER_ENDPOINT) => (fetchJsonClient) => {
    if (!BANNER_ENDPOINT) {
        throw new Error("no BANNER_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    return {
        list: function() {
            return Rx.Observable.fromPromise(fetchJsonClient(BANNER_ENDPOINT))
                .map(function(json) {
                    if (json && json.length > 0) {
                        return Rx.Observable.from(json);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        }
    };
};
