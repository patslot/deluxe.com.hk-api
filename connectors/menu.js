var Rx = require("@reactivex/rxjs");

module.exports = (MENU_ENDPOINT) => (fetchJsonClient) => {
    if (!MENU_ENDPOINT) {
        throw new Error("no MENU_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    
    return {
        list: function() {
            return Rx.Observable.fromPromise(fetchJsonClient(MENU_ENDPOINT))
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
