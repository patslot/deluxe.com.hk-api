var AdvertorialConnector = require("./advertorial");
var NewsArticleConnector = require("./news");
var BannerConnector = require("./banner");
var CampaignConnector = require("./campaign");
var CMSAPIConnector = require("./cmsapi");
var ContributorConnector = require("./contributor");
var EditorPickConnector = require("./editor-pick");
var EventConnector = require("./event");
var HomeConnector = require("./home");
var InstagramConnector = require("./instagram");
var GoogleSearchConnector = require("./googlesearch");
var MenuConnector = require("./menu");
var MPMConnector = require("./mpm");
var KeywordConnector = require("./keyword");

module.exports = function(options) {
    var ep = options.endpoints || {};
    var clients = options.fetchClients || {};

    return {
        advertorialConnector:
            AdvertorialConnector(
                ep.ADVERTORIAL_FASHION_ENDPOINT,
                ep.ADVERTORIAL_BEAUTY_ENDPOINT,
                ep.ADVERTORIAL_LUXE_ENDPOINT,
                ep.ADVERTORIAL_WEDDING_ENDPOINT,
                ep.ADVERTORIAL_CELEBRITY_ENDPOINT,
                ep.ADVERTORIAL_LIFESTYLE_ENDPOINT
            )(clients.api),
        bannerConnector:
            BannerConnector(
                ep.BANNER_ENDPOINT
            )(clients.api),
        campaignConnector:
            CampaignConnector(
                ep.CAMPAIGN_ENDPOINT
            )(clients.api),
        cmsAPIConnector:
            CMSAPIConnector(
                ep.CMS_FASHION_ENDPOINT,
                ep.CMS_BEAUTY_ENDPOINT,
                ep.CMS_LUXE_ENDPOINT,
                ep.CMS_WEDDING_ENDPOINT,
                ep.CMS_CELEBRITY_ENDPOINT,
                ep.CMS_LIFESTYLE_ENDPOINT,
                ep.CMS_ARTICLE_DETAIL_ENDPOINT
            )(clients.api),
        contributorConnector:
            ContributorConnector(
                ep.CONTRIBUTOR_ENDPOINT,
                ep.CONTRIBUTOR_ARTICLE_ENDPOINT
            )(clients.api),
        editorPickConnector:
            EditorPickConnector(
                ep.EDITOR_PICK_LIST_ENDPOINT
            )(clients.api),
        eventConnector:
            EventConnector(
                ep.UPCOMING_EVENT_ENDPOINT,
                ep.POST_EVENT_ENDPOINT
            )(clients.api),
        homeConnector:
            HomeConnector(
                ep.HOME_LATEST_ENDPOINT,
                ep.HOME_FASHION_ENDPOINT,
                ep.HOME_BEAUTY_ENDPOINT,
                ep.HOME_LUXE_ENDPOINT,
                ep.HOME_WEDDING_ENDPOINT,
                ep.HOME_CELEBRITY_ENDPOINT,
                ep.HOME_LIFESTYLE_ENDPOINT,
                ep.HOME_HIGHLIGHT_ENDPOINT,
                ep.HOME_EDITOR_PICK_ENDPOINT
            )(clients.api),
        instagramConnector:
            InstagramConnector(
                ep.INSTAGRAM_ENDPOINT
            )(clients.instagram),
        googleSearchConnector:
            GoogleSearchConnector(
                ep.GOOGLE_SEARCH_ENDPOINT
            )(clients.api),    
        menuConnector:
            MenuConnector(
                ep.MENU_ENDPOINT
            )(clients.api),
        mpmConnector:
            MPMConnector(
                ep.MPM_ENDPOINT,
                ep.MPM_FASHION_ENDPOINT,
                ep.MPM_BEAUTY_ENDPOINT,
                ep.MPM_LUXE_ENDPOINT,
                ep.MPM_LIFESTYLE_ENDPOINT,
                ep.MPM_CELEBRITY_ENDPOINT
            )(clients.api),
        newsArticleConnector:
            NewsArticleConnector(
                ep.NEWS_ARTICLE_ENDPOINT
            )(clients.api),
        keywordConnector:
            KeywordConnector(
                ep.CMS_KEYWORD_ENDPOINT
            )(clients.api),
    };
};
