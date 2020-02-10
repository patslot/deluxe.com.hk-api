"use strict";

const Rx = require("@reactivex/rxjs");

module.exports = (
    ADVERTORIAL_FASHION_ENDPOINT,
    ADVERTORIAL_BEAUTY_ENDPOINT,
    ADVERTORIAL_LUXE_ENDPOINT,
    ADVERTORIAL_WEDDING_ENDPOINT,
    ADVERTORIAL_CELEBRITY_ENDPOINT,
    ADVERTORIAL_LIFESTYLE_ENDPOINT
) => (fetchJsonClient) => {
    if (!ADVERTORIAL_FASHION_ENDPOINT) {
        throw new Error("no ADVERTORIAL_FASHION_ENDPOINT");
    }
    if (!ADVERTORIAL_BEAUTY_ENDPOINT) {
        throw new Error("no ADVERTORIAL_BEAUTY_ENDPOINT");
    }
    if (!ADVERTORIAL_LUXE_ENDPOINT) {
        throw new Error("no ADVERTORIAL_LUXE_ENDPOINT");
    }
    if (!ADVERTORIAL_WEDDING_ENDPOINT) {
        throw new Error("no ADVERTORIAL_WEDDING_ENDPOINT");
    }
    if (!ADVERTORIAL_CELEBRITY_ENDPOINT) {
        throw new Error("no ADVERTORIAL_CELEBRITY_ENDPOINT");
    }
    if (!ADVERTORIAL_LIFESTYLE_ENDPOINT) {
        throw new Error("no ADVERTORIAL_LIFESTYLE_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }

    function list(url) {
        return Rx.Observable.fromPromise(fetchJsonClient(url))
            .map(function(json) {
                return json && json.length > 0 ?
                    Rx.Observable.from(json) : Rx.Observable.empty();
            })
            .mergeAll();
    }

    return {
        listFashion:() => list(ADVERTORIAL_FASHION_ENDPOINT),
        listBeauty:() => list(ADVERTORIAL_BEAUTY_ENDPOINT),
        listLuxe:() => list(ADVERTORIAL_LUXE_ENDPOINT),
        listWedding:() => list(ADVERTORIAL_WEDDING_ENDPOINT),
        listCelebrity:() => list(ADVERTORIAL_CELEBRITY_ENDPOINT),
        listLifeStyle:() => list(ADVERTORIAL_LIFESTYLE_ENDPOINT)
    };
};
