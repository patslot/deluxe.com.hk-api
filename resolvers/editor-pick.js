"use strict";

const Rx = require("@reactivex/rxjs");
const ErrorHelper = require("../helpers/error");
const CmsHelper = require("../helpers/cms");

const PAGE_SIZE = 20;

module.exports = function(editorPickConnector, maxNumCatArticle) {
    maxNumCatArticle = maxNumCatArticle || 200;

    return {
        list: function(obj, args, context, info) {
            let offset = args.offset || 0;
            let count = args.count || 20;
            let numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);

            return Rx.Observable.range(1, numOfPage)
                .mergeMap(i => editorPickConnector.list(PAGE_SIZE, i))
                .catch(ErrorHelper.ErrorRecoveryHelper)
                .map(CmsHelper.CmsArticleMapper)
                .skip(offset)
                .take(count)
                .toArray()
                .toPromise();
        }
    };
};
