var PingResolvers = require("./ping");
var HomeResolvers = require("./home");
var ArticleResolvers = require("./article");
var MenuResolvers = require("./menu");
var MPMResolvers = require("./mpm");
var EditorPickResolvers = require("./editor-pick");
var BannerResolvers = require("./banner");
var EventResolvers = require("./event");
var ContributorResolvers = require("./contributor");
var CampaignResolvers = require("./campaign");
var InstagramResolvers = require("./instagram");
var GoogleSearchResolvers = require("./googlesearch");
var OtherHelper = require("../helpers/other");

function URLPrefixProxy(prefix) {
    var fix = OtherHelper.ImgPathPrefixMapper(prefix);
    return (resolver) => (obj, args, context, info) =>
        resolver(obj, args, context, info)
            .then(res => res.length >= 0 ? res.map(d => fix(d)) : fix(res));
}

var NoOpProxy = () => resolver => resolver;

module.exports = function(connectors, prefix, maxNumCatArticle) {
    var pingResolvers = PingResolvers();
    var homeResolvers = HomeResolvers(connectors.homeConnector);
    var articleResolvers = ArticleResolvers(
        connectors.newsArticleConnector,
        connectors.cmsAPIConnector,
        connectors.advertorialConnector,
        connectors.menuConnector,
        connectors.keywordConnector,
        maxNumCatArticle
    );
    var menuResolvers = MenuResolvers(connectors.menuConnector);
    var mpmResolvers = MPMResolvers(connectors.mpmConnector);
    var editorPickResolvers = EditorPickResolvers(connectors.editorPickConnector, maxNumCatArticle);
    var bannerResolvers = BannerResolvers(connectors.bannerConnector);
    var eventResolvers = EventResolvers(connectors.eventConnector);
    var contributorResolvers = ContributorResolvers(
        connectors.contributorConnector,
        connectors.bannerConnector,
        maxNumCatArticle
    );
    var campaignResolvers = CampaignResolvers(connectors.campaignConnector);
    var instagramResolvers = InstagramResolvers(connectors.instagramConnector);

    var googleSearchResolvers = GoogleSearchResolvers(connectors.googleSearchConnector);

    var proxy = !!prefix ? URLPrefixProxy(prefix) : NoOpProxy();

    return {
        RootQuery: {
            ping: pingResolvers.ping,

            // Home Article API
            listHomeLatestArticle: proxy(homeResolvers.listLatest),
            listHomeFashionArticle: proxy(homeResolvers.listFashion),
            listHomeBeautyArticle: proxy(homeResolvers.listBeauty),
            listHomeLuxeArticle: proxy(homeResolvers.listLuxe),
            listHomeWeddingArticle: proxy(homeResolvers.listWedding),
            listHomeCelebrityArticle: proxy(homeResolvers.listCelebrity),
            listHomeLifeStyleArticle: proxy(homeResolvers.listLifeStyle),
            listHomeHighlight: proxy(homeResolvers.listHighlight),
            listHomeEditorPick: proxy(homeResolvers.listEditorPick),

            // Article API
            listFashionArticle: proxy(articleResolvers.listFashion),
            listBeautyArticle: proxy(articleResolvers.listBeauty),
            listLuxeArticle: proxy(articleResolvers.listLuxe),
            listWeddingArticle: proxy(articleResolvers.listWedding),
            listCelebrityArticle: proxy(articleResolvers.listCelebrity),
            listLifeStyleArticle: proxy(articleResolvers.listLifeStyle),
            getNewsArticleDetail: articleResolvers.getNewsArticleDetail,
            getCMSArticleDetail: proxy(articleResolvers.getCMSArticleDetail),

            getLatestArticle: proxy(articleResolvers.getLatestArticle),
            
            //Article API by Tag
            listFashionArticleByTag: proxy(articleResolvers.listFashionByTag),
            listBeautyArticleByTag: proxy(articleResolvers.listBeautyByTag),
            listLuxeArticleByTag: proxy(articleResolvers.listLuxeByTag),
            listWeddingArticleByTag: proxy(articleResolvers.listWeddingByTag),
            listCelebrityArticleByTag: proxy(articleResolvers.listCelebrityByTag),
            listLifeStyleArticleByTag: proxy(articleResolvers.listLifeStyleByTag),
            
            listByKeyword: proxy(articleResolvers.listByKeyword),
            
            // Menu API
            listMenu: proxy(menuResolvers.list),

            // MPM API
            listMPM: proxy(mpmResolvers.list),
            listFashionMPM: proxy(mpmResolvers.listFashionMPM),
            listBeautyMPM: proxy(mpmResolvers.listBeautyMPM),
            listLuxeMPM: proxy(mpmResolvers.listLuxeMPM),
            listLifeStyleMPM: proxy(mpmResolvers.listLifeStyleMPM),
            listCelebMPM: proxy(mpmResolvers.listCelebMPM),

            // Editor Pick API
            listEditorPick: proxy(editorPickResolvers.list),
            getEditorPickArticleDetail: proxy(articleResolvers.getCMSArticleDetail),

            // Banner API
            listBannerForContributor: proxy(bannerResolvers.listContributor),
            listBannerForEvent: proxy(bannerResolvers.listEvent),

            // Event API
            listUpcomingEvent: proxy(eventResolvers.listUpcomingEvent),
            listPostEvent: proxy(eventResolvers.listPostEvent),
            getPostEventDetail: proxy(articleResolvers.getCMSArticleDetail),
            totalPostEvent: eventResolvers.totalPostEvent,

            // Contributor API
            listContributor: proxy(contributorResolvers.listContributor),
            listContributorArticle: proxy(contributorResolvers.listContributorArticle),
            listContributorArticleAll: proxy(contributorResolvers.listContributorArticleAll),
            
            // Campaign API
            listCampaign: proxy(campaignResolvers.list),

            // Instagram API
            listInstagram: instagramResolvers.list,

            getGoogleSearchResult: googleSearchResolvers.list
        },
        IArticle: {
            __resolveType: function(obj, context, info) {
                if (obj.mlArticleId) {
                    return "NewsArticle";
                } else if (obj.contributorArticleDetail) {
                    return "ContributorArticle";
                }else if (obj.type == "keyword") {
                    return "KeywordArticles";
                }
                return "CmsArticle";
            }
        },
        NewsArticle: {
            newsArticleDetail: articleResolvers.getNewsArticleDetail
        },
        NewsArticleDetail: {
            categoryName: menuResolvers.findArticleCategory
        },
        ContributorArticle: {
            contributorArticleDetail: proxy(articleResolvers.getCMSArticleDetail)
        },
        CmsArticle: {
            cmsArticleDetail: proxy(articleResolvers.getCMSArticleDetail)
        },
        ICmsArticleDetail: {
            __resolveType: function(obj, context, info) {
                if (obj.contributorName) {
                    return "ContributorArticleDetail";
                } else if (obj.type == "keyword") {
                    return "KeywordArticleDetail";
                }
                return "CmsArticleDetail";
            }
        },
        ICmsComponeFeedItem: {
            __resolveType: function(obj, context, info) {
                if (obj.title) {
                    return "MPMCmsComponeFeedItem";
                }
                return "CmsComponeFeedItem";
            }
        },
        SearchResult: {
            __resolveType: function(obj, context, info) {
                return "SearchResult";
            }
        }
    };
};
