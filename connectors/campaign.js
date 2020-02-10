var Rx = require("@reactivex/rxjs");

module.exports = (CAMPAIGN_ENDPOINT) => (fetchJsonClient) => {    
    if (!CAMPAIGN_ENDPOINT) {
        throw new Error("no CAMPAIGN_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    return {
        list: function() {
            return Rx.Observable.fromPromise(fetchJsonClient(CAMPAIGN_ENDPOINT))
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
