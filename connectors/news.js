var qs = require('querystring');
var Rx = require("@reactivex/rxjs");

module.exports = (NEWS_ARTICLE_ENDPOINT) => (fetchJsonClient) => {
    if (!NEWS_ARTICLE_ENDPOINT) {
        throw new Error("no NEWS_ARTICLE_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }
    return {
        listByTagName: function(tagName, offset, count) {
            var param = {
                "Type": "Tag",
                "TagName": tagName || "add",
                "Platform": "WEB"
            };
            if (offset !== null) {
                param["Start"] = offset;
            }
            if (count !== null) {
                param["Offset"] = count;
            }

            var url = NEWS_ARTICLE_ENDPOINT + "/ArticleList?" + qs.stringify(param);
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    if (json && json.content && json.content.length > 0) {
                        return Rx.Observable.from(json.content);
                    } else {
                        return Rx.Observable.empty();
                    }
                })
                .mergeAll();
        },
        getArticleDetail: function(mlArticleId) {
            var url = NEWS_ARTICLE_ENDPOINT +
                "/ArticleDetail?mlArticleId=" + mlArticleId;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(function(json) {
                    return json && json.content ? json.content : null;
                })
                .filter(function(content) {
                    return !!content;
                });
        }
    };
};
