var Rx = require("@reactivex/rxjs");

module.exports = (
    CMS_KEYWORD_ENDPOINT
) => (fetchJsonClient) => {
    if (!CMS_KEYWORD_ENDPOINT) {
        throw new Error("no CMS_KEYWORD_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }

    var listByKeyword = (endpoint) => (keyword, offset, count) => {
        offset = offset || 0;
        count = count || 0;
            var url = `${endpoint}/${encodeURIComponent(keyword)}/${offset}/${count}`
            var keywordObs =  Rx.Observable.fromPromise(fetchJsonClient(url))
            .map(json =>
                json.length > 0 ?
                    Rx.Observable.from(json)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        
            // var subs = keywordObs.subscribe(function (x){
            //    console.log(x);
            // });    

        return keywordObs
    };
    
   
    return {
        listByKeyword: listByKeyword(CMS_KEYWORD_ENDPOINT),   
    };
};
