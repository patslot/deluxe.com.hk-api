var Rx = require("@reactivex/rxjs");


module.exports = (IG_ENDPOINT) => (fetchJsonClient) => {
    if (!IG_ENDPOINT) {
        throw new Error("no IG_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no instagram client");
    }
    return {
        list: function(limit) {
            return Rx.Observable.fromPromise(fetchJsonClient(IG_ENDPOINT))
                .map(function(json) {
                    //console.log(json.data[0].images.standard_resolution.url);
                    if (json && json.data && json.data.length > 0) {
                        if (limit > 0) {
                            return Rx.Observable.from(json.data).take(limit);
                        }
                        return Rx.Observable.from(json.data);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        }
    };
};
