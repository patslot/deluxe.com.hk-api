var Rx = require("@reactivex/rxjs");

module.exports = (
    CMS_FASHION_ENDPOINT,
    CMS_BEAUTY_ENDPOINT,
    CMS_LUXE_ENDPOINT,
    CMS_WEDDING_ENDPOINT,
    CMS_CELEBRITY_ENDPOINT,
    CMS_LIFESTYLE_ENDPOINT,
    CMS_ARTICLE_DETAIL_ENDPOINT
) => (fetchJsonClient) => {
    if (!CMS_FASHION_ENDPOINT) {
        throw new Error("no CMS_FASHION_ENDPOINT");
    }
    if (!CMS_BEAUTY_ENDPOINT) {
        throw new Error("no CMS_BEAUTY_ENDPOINT");
    }
    if (!CMS_LUXE_ENDPOINT) {
        throw new Error("no CMS_LUXE_ENDPOINT");
    }
    if (!CMS_WEDDING_ENDPOINT) {
        throw new Error("no CMS_WEDDING_ENDPOINT");
    }
    if (!CMS_CELEBRITY_ENDPOINT) {
        throw new Error("no CMS_CELEBRITY_ENDPOINT")
    }
    if (!CMS_LIFESTYLE_ENDPOINT) {
        throw new Error("no CMS_LIFESTYLE_ENDPOINT");
    }
    if (!CMS_ARTICLE_DETAIL_ENDPOINT) {
        throw new Error("no CMS_ARTICLE_DETAIL_ENDPOINT");
    }
    if (!fetchJsonClient) {
        throw new Error("no API client");
    }

    var list = (endpoint) => (pagesize, page, start) => {
        pagesize = pagesize || 20;
        page = page || 1;
        start = start || 0;
            var url = `${endpoint}/0/${pagesize}/${page}/${start}/publish`
        
        return Rx.Observable.fromPromise(fetchJsonClient(url))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        //  console.log(url);
    };
    
    var listByTag = (endpoint) => (tag, pagesize, page, start) => {
        pagesize = pagesize || 20;
        page = page || 1;
        start = start || 0;
        tag = tag || 'fashion'; 
        var url = `${endpoint}/${tag}/${pagesize}/${page}/${start}/publish`
        // console.log(url);
        var obs = Rx.Observable.fromPromise(fetchJsonClient(url))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll()
            .filter(function (x){
                    var flag =false;
                    return x.Tag.indexOf(tag) > -1 ;
            });
        var subs = obs.subscribe(function (x){
            // console.log(x);
        });
        return obs
    };
    
    var listAll = () => (pagesize, page, start) => {
        pagesize = pagesize || 20;
        page = page || 1;
        start = start || 0;
        var fashionurl = `${CMS_FASHION_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        var beautyurl = `${CMS_BEAUTY_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        var luxeurl = `${CMS_LUXE_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        var lifestyleurl = `${CMS_LIFESTYLE_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        var weddingurl = `${CMS_WEDDING_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        var celebrityurl = `${CMS_CELEBRITY_ENDPOINT}/0/${pagesize}/${page}/${start}/publish`
        
        var fashionobs = Rx.Observable.fromPromise(fetchJsonClient(fashionurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        
        var beautyobs = Rx.Observable.fromPromise(fetchJsonClient(beautyurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        
        var luxeobs = Rx.Observable.fromPromise(fetchJsonClient(luxeurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        
        var lifestyleobs = Rx.Observable.fromPromise(fetchJsonClient(lifestyleurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
        
        var weddingobs = Rx.Observable.fromPromise(fetchJsonClient(weddingurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();

        var celebrityobs = Rx.Observable.fromPromise(fetchJsonClient(celebrityurl))
            .map(json =>
                json && json.Article && json.Article.length > 0 ?
                    Rx.Observable.from(json.Article)
                    : Rx.Observable.empty()
            )
            .mergeAll();
            
        var allobs = Rx.Observable.merge(beautyobs, luxeobs, lifestyleobs, fashionobs,weddingobs, celebrityobs);
            
        return allobs
    };
    
    return {
        listFashionByTag: listByTag(CMS_FASHION_ENDPOINT),   
        listBeautyByTag: listByTag(CMS_BEAUTY_ENDPOINT),
        listLuxeByTag: listByTag(CMS_LUXE_ENDPOINT),
        listWeddingByTag: listByTag(CMS_WEDDING_ENDPOINT),
        listCelebrityByTag: listByTag(CMS_CELEBRITY_ENDPOINT),
        listLifeStyleByTag: listByTag(CMS_LIFESTYLE_ENDPOINT),
        listFashion: list(CMS_FASHION_ENDPOINT),
        listBeauty: list(CMS_BEAUTY_ENDPOINT),
        listLuxe: list(CMS_LUXE_ENDPOINT),
        listWedding: list(CMS_WEDDING_ENDPOINT),
        listCelebrity: list(CMS_CELEBRITY_ENDPOINT),
        listLifeStyle: list(CMS_LIFESTYLE_ENDPOINT),
        listAllArticles: listAll(),
        getDetail: function(articleID) {
            var url = CMS_ARTICLE_DETAIL_ENDPOINT + "/" + articleID;
            return Rx.Observable.fromPromise(fetchJsonClient(url))
                .map(json => json ? json : null)
                .filter(content => !!content);
        }
    };
};
