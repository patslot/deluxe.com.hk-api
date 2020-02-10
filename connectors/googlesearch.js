var Rx = require("@reactivex/rxjs");


module.exports = (GOOGLE_ENDPOINT) => (fetchJsonClient) => {
    if (!GOOGLE_ENDPOINT) {
        throw new Error("no IG_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no instagram client");
    }
    return {
        list: function(query, offset, excludeterms) {
            var url = `${GOOGLE_ENDPOINT}${encodeURIComponent(query)}&start=${encodeURIComponent(offset)}&excludeTerms=${encodeURIComponent(excludeterms)}`
            var orbs = Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    // console.log(json.items[0]);
                    if (json && json.items && json.items.length > 0) {
                        return Rx.Observable.from(json.items);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll()
                .filter(function (x){
                    return /\d{6}/.test(x.link) ;
                });
            var subs = orbs.subscribe(function (x){
                // console.log(x);
            });
            return orbs
        }
    };
};
