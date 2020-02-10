var Article = require("./article");
var News = require("./news");
var Cms = require("./cms");
var Instagram = require("./instagram");
var GoogleSearch = require("./googlesearch");

var RootQuery = `
    type RootQuery {
        ping: String

        listHomeLatestArticle: [CmsComponeFeedItem]
        listHomeFashionArticle: [CmsComponeFeedItem]
        listHomeBeautyArticle: [CmsComponeFeedItem]
        listHomeLuxeArticle: [CmsComponeFeedItem]
        listHomeWeddingArticle: [CmsComponeFeedItem]
        listHomeCelebrityArticle: [CmsComponeFeedItem]
        listHomeLifeStyleArticle: [CmsComponeFeedItem]
        listHomeHighlight: [CmsComponeFeedItem]
        listHomeEditorPick: [CmsSpecialFeedItem]

        listFashionArticleByTag (tag: String, offset: Int, count: Int): [IArticle]
        listBeautyArticleByTag (tag: String, offset: Int, count: Int): [IArticle]
        listLuxeArticleByTag (tag: String, offset: Int, count: Int): [IArticle]
        listWeddingArticleByTag (tag: String, offset: Int, count: Int): [IArticle]
        listCelebrityArticleByTag (tag: String, offset: Int, count: Int): [IArticle]
        listLifeStyleArticleByTag (tag: String, offset: Int, count: Int): [IArticle]

        listFashionArticle(offset: Int, count: Int): [IArticle]
        listBeautyArticle(offset: Int, count: Int): [IArticle]
        listLuxeArticle(offset: Int, count: Int): [IArticle]
        listWeddingArticle(offset: Int, count: Int): [IArticle]
        listCelebrityArticle(offset: Int, count: Int): [IArticle]
        listLifeStyleArticle(offset: Int, count: Int): [IArticle]

        listBannerForContributor: [CmsComponeFeedItem]
        listBannerForEvent: [CmsComponeFeedItem]
        listCampaign: [CmsComponeFeedItem]
        listContributor: [CmsComponeFeedItem]
        listContributorArticle(name: String, offset: Int, count: Int): [ContributorArticle]
        listContributorArticleAll(offset: Int, count: Int): [ContributorArticle]
        listEditorPick(offset: Int, count: Int): [CmsArticle]
        listInstagram(limit: Int): [InstagramPost]
        listMenu: [CmsFeedItem]

        listMPM: [MPMCmsComponeFeedItem]
        listFashionMPM: [MPMCmsComponeFeedItem]
        listBeautyMPM: [MPMCmsComponeFeedItem]
        listLuxeMPM: [MPMCmsComponeFeedItem]
        listLifeStyleMPM: [MPMCmsComponeFeedItem]
        listCelebMPM: [MPMCmsComponeFeedItem]


        listPostEvent(pagesize: Int, page: Int, start: Int): [CmsArticle]
        listUpcomingEvent: [CmsComponeFeedItem]

        getNewsArticleDetail(articleID: String): NewsArticleDetail
        getCMSArticleDetail(articleID: String): ICmsArticleDetail
        getEditorPickArticleDetail(articleID: String): CmsArticleDetail
        getPostEventDetail(articleID: String): CmsArticleDetail
        
        getLatestArticle (offset: Int, count: Int): [IArticle]

        listByKeyword (keyword: String, offset: Int, count: Int): [IArticle]

        getGoogleSearchResult (query: String, offset: Int, excludeterms: String): [SearchResult]
        
        totalPostEvent: Int
    }
`;

var SchemaDefinition = `
    schema {
      query: RootQuery
    }
`;

module.exports = [
    SchemaDefinition,
    RootQuery,
    Article,
    Cms,
    News,
    Instagram,
    GoogleSearch
];
