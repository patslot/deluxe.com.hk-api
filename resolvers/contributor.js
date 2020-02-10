"use strict";
const Rx = require("@reactivex/rxjs");
const CmsHelper = require("../helpers/cms");

const PAGE_SIZE = 20;

module.exports = function(
    contributorConnector,
    bannerConnector,
    maxNumCatArticle
) {
    maxNumCatArticle = maxNumCatArticle || 200;

    return {
        listContributor: function(obj, args, context, info) {
            return contributorConnector.listContributor()
                .map(CmsHelper.CmsComponeFeedItemMapper)
                .toArray()
                .toPromise();
        },
        listContributorArticle: function(obj, args, context, info) {
            let name = args.name;
            let offset = args.offset || 0;
            let count = args.count || 20;
            let numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);

            return Rx.Observable.range(1, numOfPage)
                .mergeMap(i => contributorConnector.listContributorArticle(name, PAGE_SIZE, i))
                .map(CmsHelper.CmsArticleMapper)
                .map(art => Object.assign({}, art, {contributorName: args.name}))
                .skip(offset)
                .take(count)
                .toArray()
                .toPromise();
        },
        listContributorArticleAll: function(obj, args, context, info) {
            let offset = args.offset || 0;
            let count = args.count || 20;
            let numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);
          
            return Rx.Observable.range(1, numOfPage)
                .mergeMap(i => contributorConnector.listContributorArticleAll(PAGE_SIZE, i))
                .map(CmsHelper.CmsArticleMapper)
                .map(art => Object.assign({}, art, {contributorName: args.count}))
                .skip(offset)
                .take(count)
                .toArray()
                .toPromise();
        },
    };
};
