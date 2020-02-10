var Rx = require("@reactivex/rxjs");

module.exports = (
    MPM_ENDPOINT,
    MPM_FASHION_ENDPOINT,
    MPM_BEAUTY_ENDPOINT,
    MPM_LUXE_ENDPOINT,
    MPM_LIFESTYLE_ENDPOINT,
    MPM_CELEBRITY_ENDPOINT
) => (fetchJsonClient) => {
    if (!MPM_ENDPOINT) {
        throw new Error("no MPM_ENDPOINT");
    }
    if (!MPM_FASHION_ENDPOINT) {
        throw new Error("no MPM_FASHION_ENDPOINT");
    }
    if (!MPM_BEAUTY_ENDPOINT) {
        throw new Error("no MPM_BEAUTY_ENDPOINT");
    }
    if (!MPM_LUXE_ENDPOINT) {
        throw new Error("no MPM_LUXE_ENDPOINT");
    }
    if (!MPM_LIFESTYLE_ENDPOINT) {
        throw new Error("no MPM_LIFESTYLE_ENDPOINT");
    }
    if (!MPM_CELEBRITY_ENDPOINT) {
        throw new Error("no MPM_CELEBRITY_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    
    var listMPM = (endpoint) => () =>{
        var obs = Rx.Observable.fromPromise(fetchJsonClient(endpoint))
                .map(function(json) {
                    if (json && json.length > 0) {
                        return Rx.Observable.from(json);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        var subs = obs.subscribe(function (x){
//            console.log(x);
        });
        return obs
    }
    return {
        list: listMPM(MPM_ENDPOINT),
        listFashionMPM: listMPM(MPM_FASHION_ENDPOINT),
        listBeautyMPM: listMPM(MPM_BEAUTY_ENDPOINT),
        listLuxeMPM: listMPM(MPM_LUXE_ENDPOINT),
        listLifeStyleMPM: listMPM(MPM_LIFESTYLE_ENDPOINT),
        listCelebMPM: listMPM(MPM_CELEBRITY_ENDPOINT),
    };
};
