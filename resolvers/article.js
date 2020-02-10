var Rx = require("@reactivex/rxjs");

var NewsHelper = require("../helpers/news");
var CmsHelper = require("../helpers/cms");
var ErrorHelper = require("../helpers/error");

var PAGE_SIZE = 20;

function ArticleSorter(a, b) {
    var _aSortBy = a.publish || a.lastUpdate;
    var _bSortBy = b.publish || b.lastUpdate;
    if (_aSortBy < _bSortBy) {
        return 1;
    } else if (_aSortBy > _bSortBy) {
        return -1;
    }
    return 0;
}

function ArticleListAdvReducer(artList, adv) {
    var advPosition = +adv.sort - 1;
    var advArticleIdx = artList.findIndex(art => art.id === adv.linkURL);

    if (advArticleIdx < 0) { return artList; }

    var advArticle = artList[advArticleIdx];

    var noAdvArtList = artList.filter((d, i) => i !== advArticleIdx);

    return noAdvArtList
        // cut the article list from the beginning to
        // the advertorial inject position
        .slice(0, advPosition)
        // concat with the advertorial article
        .concat([advArticle])
        // concat with the remaining article list
        .concat(noAdvArtList.slice(advPosition));
}

module.exports = function(
    newsArticleConnector,
    cmsAPIConnector,
    advertorialConnector,
    menuConnector,
    keywordConnector,
    maxNumCatArticle
) {
    maxNumCatArticle = maxNumCatArticle || 200;

    function advertorialObs(tag) {
        switch(tag) {
            case "add_fash": return advertorialConnector.listFashion();
            case "add_beau": return advertorialConnector.listBeauty();
            case "add_luxe": return advertorialConnector.listLuxe();
            case "add_wedd": return advertorialConnector.listWedding();
            case "add_cele": return advertorialConnector.listCelebrity();
            case "add_life": return advertorialConnector.listLifeStyle();
            default: return Rx.Observable.empty();
        }
    }

    /**
     * @param page page of the record, started at 1, 20 items per page
     */
    function cmsArtObs(tag, page) {
        switch(tag) {
            case "add_fash": return cmsAPIConnector.listFashion(PAGE_SIZE, page);
            case "add_beau": return cmsAPIConnector.listBeauty(PAGE_SIZE, page);
            case "add_luxe": return cmsAPIConnector.listLuxe(PAGE_SIZE, page);
            case "add_wedd": return cmsAPIConnector.listWedding(PAGE_SIZE, page);
            case "add_cele": return cmsAPIConnector.listCelebrity(PAGE_SIZE, page);
            case "add_life": return cmsAPIConnector.listLifeStyle(PAGE_SIZE, page);
            default: return Rx.Observable.empty();
        }
    };
    
    function cmsByTagArtObs(tag, articleTag, page) {
        switch(tag) {
            case "add_fash": return cmsAPIConnector.listFashionByTag(articleTag, PAGE_SIZE, page);
            case "add_beau": return cmsAPIConnector.listBeautyByTag(articleTag, PAGE_SIZE, page);
            case "add_luxe": return cmsAPIConnector.listLuxeByTag(articleTag, PAGE_SIZE, page);
            case "add_wedd": return cmsAPIConnector.listWeddingByTag(articleTag, PAGE_SIZE, page);
            case "add_cele": return cmsAPIConnector.listCelebrityByTag(articleTag, PAGE_SIZE, page);
            case "add_life": return cmsAPIConnector.listLifeStyleByTag(articleTag, PAGE_SIZE, page);
            default: return Rx.Observable.empty();
        }
    };
    
    function cmsAllArtObs(offset, count){
        var tag ='';
        var numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);
        var allArtobs = cmsAPIConnector.listAllArticles(PAGE_SIZE, 1);
        
        var AllArt$ = Rx.Observable.from(allArtobs)
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsArticleMapper);
        
        var advertorial$ = advertorialObs(tag)
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsComponeFeedItemMapper)
            .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()));

        return takeNewsObs(tag)
            .mergeMap(take => take ? AllArt$.merge(newsArt$) : AllArt$)
            .toArray()
            .map(arts => arts.sort(ArticleSorter))
            .mergeMap(arts => advertorial$.reduce(ArticleListAdvReducer, arts))
            .mergeMap(arts => Rx.Observable.from(arts))
            .skip(offset)
            .take(count)
            .toArray();
        
//        var fashionArtobs = cmsAPIConnector.listFashion(1, 1).map(CmsHelper.CmsArticleMapper);
//        var BeautyArtobs = cmsAPIConnector.listBeauty(1, 1).map(CmsHelper.CmsArticleMapper) ;
//        var luxeArtobs = cmsAPIConnector.listLuxe(1, 1).map(CmsHelper.CmsArticleMapper) ;
//        var lifestyleArtobs = cmsAPIConnector.listLifeStyle(1, 1).map(CmsHelper.CmsArticleMapper) ;
//        var allArtobs = Rx.Observable.merge(fashionArtobs, BeautyArtobs,luxeArtobs, lifestyleArtobs)
//            .toArray()
//            .map(arts => arts.sort(ArticleSorter))
//            .mergeMap(arts => Rx.Observable.from(arts))
//            .skip(0)
//            .take(4);
//           
//        var subs = allArtobs.subscribe(function(x){
//            console.log('subs');
//            console.log(x.publish);   
//        });
        
      
    }
    /**
     * Check the menu API, if the EName === "",
     * that category should not merge with News API.
     * This function return a single item boolean about this merge.
     *
     * Assume the EName format conforms `"add_" + EName === tag`
     *
     * @param tag the tag of News API, e.g. add_fash, add_beau...
     */
    function takeNewsObs(tag) {
        return menuConnector.list()
            .filter(d => ("add" + d.EName) === tag)
            .count()
            .map(cnt => cnt > 0)
            .take(1);
    }

    /**
     * @param page page of the record, started at 1, 20 items per page
     */
    function newsArtObs(tag, page) {
        return newsArticleConnector
            .listByTagName(tag, (page - 1) * PAGE_SIZE, PAGE_SIZE)
    }

    function mergeArticleObs(tag, offset, count) {
        var numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);

        var cmsArt$ = Rx.Observable.range(1, numOfPage)
            .mergeMap(i => cmsArtObs(tag, i))
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsArticleMapper);

        var newsArt$ = Rx.Observable.range(1, numOfPage)
            .mergeMap(i => newsArtObs(tag, i))
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(NewsHelper.NewsArticleMapper);

        var advertorial$ = advertorialObs(tag)
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsComponeFeedItemMapper)
            .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()));

        return takeNewsObs(tag)
            .mergeMap(take => take ? cmsArt$.merge(newsArt$) : cmsArt$)
            .toArray()
            .map(arts => arts.sort(ArticleSorter))
            .mergeMap(arts => advertorial$.reduce(ArticleListAdvReducer, arts))
            .mergeMap(arts => Rx.Observable.from(arts))
            .skip(offset)
            .take(count)
            .toArray();
    }
    
    //get CMS article with filter tag 
    function mergeCMSArticleObs(tag, articleTag, offset, count) {
        var numOfPage = Math.ceil(+maxNumCatArticle / PAGE_SIZE);

        var cmsArt$ = Rx.Observable.range(1, numOfPage)
            .mergeMap(i => cmsByTagArtObs(tag,articleTag, i))
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsArticleMapper);
        
        var newsArt$ = Rx.Observable.range(1, numOfPage)
            .mergeMap(i => newsArtObs(tag, i))
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(NewsHelper.NewsArticleMapper);

        var advertorial$ = advertorialObs(tag)
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(CmsHelper.CmsComponeFeedItemMapper)
            .filter(CmsHelper.CmsComponeFeedItemFilterExpired(new Date()));
        
        return takeNewsObs(tag)
            .mergeMap(take => take ? cmsArt$.merge(newsArt$) : cmsArt$)
            .toArray()
            .map(arts => arts.sort(ArticleSorter))
            .mergeMap(arts => advertorial$.reduce(ArticleListAdvReducer, arts))
            .mergeMap(arts => Rx.Observable.from(arts))
            .skip(offset)
            .take(count)
            .toArray();
    }
    return {
        listFashionByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'Fashion News' ;
            return mergeCMSArticleObs("add_fash", tag, offset, count).toPromise();
        },
        listBeautyByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'Beauty News' ;
            return mergeCMSArticleObs("add_beau",tag, offset, count).toPromise();
        },
        listLuxeByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'News' ;
            return mergeCMSArticleObs("add_luxe",tag, offset, count).toPromise();
        },
        listWeddingByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'News' ;
            return mergeCMSArticleObs("add_wedd", tag, offset, count).toPromise();
        },
        listCelebrityByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'News' ;
            return mergeCMSArticleObs("add_cele",tag, offset, count).toPromise();
        },
        listLifeStyleByTag: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            var tag = args.tag || 'Travel' ;
            return mergeCMSArticleObs("add_life",tag, offset, count).toPromise();
        },
        listFashion: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_fash", offset, count).toPromise();
        },
        listBeauty: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_beau", offset, count).toPromise();
        },
        listLuxe: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_luxe", offset, count).toPromise();
        },
        listWedding: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_wedd", offset, count).toPromise();
        },
        listCelebrity: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_cele", offset, count).toPromise();
        },
        listLifeStyle: function(obj, args, context, info) {
            var offset = args.offset || 0;
            var count = args.count || 20;
            return mergeArticleObs("add_life", offset, count).toPromise();
        },
        getNewsArticleDetail: function(obj, args, context, info) {
            var articleID = (obj || {}).mlArticleId || args.articleID;
            return newsArticleConnector
                .getArticleDetail(articleID)
                .map(NewsHelper.NewsArticleDetailMapper)
                .toPromise();
        },
        getCMSArticleDetail: function(obj, args, context, info) {
            var articleID = (obj || {}).id || args.articleID;
            return cmsAPIConnector.getDetail(articleID)
                .map(CmsHelper.CmsArticleDetailMapper)
                .map(art => {
                    if (art.categoryName === "Contributor") {
                        return  Object.assign({}, art, {contributorName: art.subCategory});
                    }
                    return art;
                })
                .toPromise();
        },
        getLatestArticle: function(obj, args, context, info){
            var offset = args.offset || 0;
            var count = args.count || 20;
            
            return cmsAllArtObs(offset, count).toPromise()
        },
        listByKeyword: function(obj, args, context, info){
            var keyword = args.keyword;
            var offset = args.offset || 0;
            var count = args.count || 20;
              
            return keywordConnector.listByKeyword(keyword, offset, count)
                    .map(CmsHelper.KeywordArticleMapper)
                    .toArray()
                    .toPromise();
        }
    };
};
