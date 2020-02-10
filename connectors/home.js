var Rx = require("@reactivex/rxjs");

module.exports = (
    HOME_LATEST_ENDPOINT,
    HOME_FASHION_ENDPOINT,
    HOME_BEAUTY_ENDPOINT,
    HOME_LUXE_ENDPOINT,
    HOME_WEDDING_ENDPOINT,
    HOME_CELEBRITY_ENDPOINT,
    HOME_LIFESTYLE_ENDPOINT,
    HOME_HIGHLIGHT_ENDPOINT,
    HOME_EDITOR_PICK_ENDPOINT
) => (fetchJsonClient) => {
    if (!HOME_LATEST_ENDPOINT) {
        throw new Error("no HOME_LATEST_ENDPOINT");
    }
    if (!HOME_FASHION_ENDPOINT) {
        throw new Error("no HOME_FASHION_ENDPOINT");
    }
    if (!HOME_BEAUTY_ENDPOINT) {
        throw new Error("no HOME_BEAUTY_ENDPOINT");
    }
    if (!HOME_LUXE_ENDPOINT) {
        throw new Error("no HOME_LUXE_ENDPOINT");
    }
    if (!HOME_WEDDING_ENDPOINT) {
        throw new Error("no HOME_WEDDING_ENDPOINT");
    }
    if (!HOME_CELEBRITY_ENDPOINT) {
        throw new Error("no HOME_CELEBRITY_ENDPOINT");
    }
    if (!HOME_LIFESTYLE_ENDPOINT) {
        throw new Error("no HOME_LIFESTYLE_ENDPOINT");
    }
    if (!HOME_HIGHLIGHT_ENDPOINT) {
        throw new Error("no HOME_HIGHLIGHT_ENDPOINT");
    }
    if (!HOME_EDITOR_PICK_ENDPOINT) {
        throw new Error("no HOME_EDITOR_PICK_ENDPOINT");
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

    function editorPickList(url) {
        return Rx.Observable.fromPromise(fetchJsonClient(url))
            .map(function(json) {
                if (
                    json &&
                    json.ArticleList &&
                    json.ArticleList.length > 0 &&
                    json.Article
                ) {
                    return Rx.Observable.from(json.ArticleList)
                        .map(id =>
                            Object.assign({}, json.Article[id], {Id: id})
                        );
                } else {
                    return Rx.Observable.empty();
                }
            })
            .mergeAll();
    }

    return {
        listLatest: () => list(HOME_LATEST_ENDPOINT),
        listFashion: () => list(HOME_FASHION_ENDPOINT),
        listBeauty: () => list(HOME_BEAUTY_ENDPOINT),
        listLuxe: () => list(HOME_LUXE_ENDPOINT),
        listWedding: () => list(HOME_WEDDING_ENDPOINT),
        listCelebrity: () => list(HOME_CELEBRITY_ENDPOINT),
        listLifeStyle: () => list(HOME_LIFESTYLE_ENDPOINT),
        listHighlight: () => list(HOME_HIGHLIGHT_ENDPOINT),
        listEditorPick: () => editorPickList(HOME_EDITOR_PICK_ENDPOINT)
    };
};
