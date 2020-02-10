var Rx = require("@reactivex/rxjs");

module.exports = (
    CONTRIBUTOR_ENDPOINT,
    CONTRIBUTOR_ARTICLE_ENDPOINT
) => (fetchJsonClient) => {
    if (!CONTRIBUTOR_ENDPOINT) {
        throw new Error("no CONTRIBUTOR_ENDPOINT");
    }
    if (!CONTRIBUTOR_ARTICLE_ENDPOINT) {
        throw new Error("no CONTRIBUTOR_ARTICLE_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    return {
        listContributor: function() {
            return Rx.Observable.fromPromise(fetchJsonClient(CONTRIBUTOR_ENDPOINT))
                .map(function(json) {
                    if (json && json.length > 0) {
                        return Rx.Observable.from(json);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll()
                .filter(d =>
                    d.CatName !== "EVENT_BANNER"
                    && d.CatName !== "CONT_BANNER"
                );
        },
        listContributorArticle: function(name, pagesize, page, start) {
            pagesize = pagesize || 20;
            page = page || 1;
            start = start || 0;
            var url = `${CONTRIBUTOR_ARTICLE_ENDPOINT}/${encodeURIComponent(name)}/${pagesize}/${page}/${start}/publish`;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.Article && json.Article.length > 0) {
                        return Rx.Observable.from(json.Article);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        },
        listContributorArticleAll: function(pagesize, page, start) {
            pagesize = pagesize || 20;
            page = page || 1;
            start = start || 0;
            var url = `${CONTRIBUTOR_ARTICLE_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`;
           
            
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.Article && json.Article.length > 0) {
                        return Rx.Observable.from(json.Article);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        },
    };
};
