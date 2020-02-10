var server = require("graphql-server-lambda");
var graphqlHelper = require("./graphql-helpers");
var redisHelper = require("./redis-helpers");
var envSetting  = require("./env");
var env = envSetting.dev; 
// var env = envSetting.production; 
console.log("add-content-graphql service start");

var corsOrigin = process.env.CORS_ORIGIN || "";
var redisHost = process.env.APICACHE_REDIS_HOST;
var redisPort = +(process.env.APICACHE_REDIS_PORT || "6379");

var redisClient = null;
if (redisHost) {
    console.log("creating redis connection");
    redisClient = redisHelper.createRedistClient(redisPort, redisHost);
}

exports.handle = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("request: " + JSON.stringify(event));
    server.graphqlLambda({
        schema: graphqlHelper.createExecutableSchema({
            redisClient: redisClient,
            imgURLPrefix: process.env.IMG_URL_PREFIX || env.IMG_URL_PREFIX,
            maxNumCatArticle: env.MAX_NUM_CATEGORY_ARTICLE || "200",
            endpoints: {
                NEWS_ARTICLE_ENDPOINT: process.env.NEWS_ARTICLE_ENDPOINT || env.NEWS_ARTICLE_ENDPOINT,
                MENU_ENDPOINT: process.env.MENU_ENDPOINT || env.MENU_ENDPOINT,
                MPM_ENDPOINT: process.env.MPM_ENDPOINT || env.MPM_ENDPOINT,
                MPM_FASHION_ENDPOINT: process.env.MPM_FASHION_ENDPOINT || env.MPM_FASHION_ENDPOINT,
                MPM_BEAUTY_ENDPOINT: process.env.MPM_BEAUTY_ENDPOINT || env.MPM_BEAUTY_ENDPOINT,
                MPM_LUXE_ENDPOINT: process.env.MPM_LUXE_ENDPOINT || env.MPM_LUXE_ENDPOINT,
                MPM_LIFESTYLE_ENDPOINT: process.env.MPM_LIFESTYLE_ENDPOINT || env.MPM_LIFESTYLE_ENDPOINT,
                MPM_CELEBRITY_ENDPOINT: process.env.MPM_CELEBRITY_ENDPOINT || env.MPM_CELEBRITY_ENDPOINT,
                HOME_LATEST_ENDPOINT: process.env.HOME_LATEST_ENDPOINT || env.HOME_LATEST_ENDPOINT,
                HOME_FASHION_ENDPOINT: process.env.HOME_FASHION_ENDPOINT || env.HOME_FASHION_ENDPOINT,
                HOME_BEAUTY_ENDPOINT: process.env.HOME_BEAUTY_ENDPOINT || env.HOME_BEAUTY_ENDPOINT,
                HOME_LUXE_ENDPOINT: process.env.HOME_LUXE_ENDPOINT || env.HOME_LUXE_ENDPOINT,
                HOME_WEDDING_ENDPOINT: process.env.HOME_WEDDING_ENDPOINT || env.HOME_WEDDING_ENDPOINT,
                HOME_CELEBRITY_ENDPOINT: process.env.HOME_CELEBRITY_ENDPOINT || env.HOME_CELEBRITY_ENDPOINT,
                HOME_LIFESTYLE_ENDPOINT: process.env.HOME_LIFESTYLE_ENDPOINT || env.HOME_LIFESTYLE_ENDPOINT,
                HOME_HIGHLIGHT_ENDPOINT: process.env.HOME_HIGHLIGHT_ENDPOINT || env.HOME_HIGHLIGHT_ENDPOINT,
                HOME_EDITOR_PICK_ENDPOINT: process.env.HOME_EDITOR_PICK_ENDPOINT || env.HOME_EDITOR_PICK_ENDPOINT,
                EDITOR_PICK_LIST_ENDPOINT: process.env.EDITOR_PICK_LIST_ENDPOINT || env.EDITOR_PICK_LIST_ENDPOINT,
                BANNER_ENDPOINT: process.env.BANNER_ENDPOINT || env.BANNER_ENDPOINT,
                UPCOMING_EVENT_ENDPOINT: process.env.UPCOMING_EVENT_ENDPOINT || env.UPCOMING_EVENT_ENDPOINT,
                POST_EVENT_ENDPOINT: process.env.POST_EVENT_ENDPOINT || env.POST_EVENT_ENDPOINT,
                CONTRIBUTOR_ENDPOINT: process.env.CONTRIBUTOR_ENDPOINT || env.CONTRIBUTOR_ENDPOINT,
                CONTRIBUTOR_ARTICLE_ENDPOINT: process.env.CONTRIBUTOR_ARTICLE_ENDPOINT || env.CONTRIBUTOR_ARTICLE_ENDPOINT,
                ADVERTORIAL_FASHION_ENDPOINT: process.env.ADVERTORIAL_FASHION_ENDPOINT || env.ADVERTORIAL_FASHION_ENDPOINT,
                ADVERTORIAL_BEAUTY_ENDPOINT: process.env.ADVERTORIAL_BEAUTY_ENDPOINT || env.ADVERTORIAL_BEAUTY_ENDPOINT,
                ADVERTORIAL_LUXE_ENDPOINT: process.env.ADVERTORIAL_LUXE_ENDPOINT || env.ADVERTORIAL_LUXE_ENDPOINT,
                ADVERTORIAL_WEDDING_ENDPOINT: process.env.ADVERTORIAL_WEDDING_ENDPOINT || env.ADVERTORIAL_WEDDING_ENDPOINT,
                ADVERTORIAL_CELEBRITY_ENDPOINT: process.env.ADVERTORIAL_CELEBRITY_ENDPOINT || env.ADVERTORIAL_CELEBRITY_ENDPOINT,
                ADVERTORIAL_LIFESTYLE_ENDPOINT: process.env.ADVERTORIAL_LIFESTYLE_ENDPOINT || env.ADVERTORIAL_LIFESTYLE_ENDPOINT,
                CAMPAIGN_ENDPOINT: process.env.CAMPAIGN_ENDPOINT || env.CAMPAIGN_ENDPOINT,
                CMS_FASHION_ENDPOINT: process.env.CMS_FASHION_ENDPOINT || env.CMS_FASHION_ENDPOINT,
                CMS_BEAUTY_ENDPOINT: process.env.CMS_BEAUTY_ENDPOINT || env.CMS_BEAUTY_ENDPOINT,
                CMS_LUXE_ENDPOINT: process.env.CMS_LUXE_ENDPOINT || env.CMS_LUXE_ENDPOINT,
                CMS_WEDDING_ENDPOINT: process.env.CMS_WEDDING_ENDPOINT || env.CMS_WEDDING_ENDPOINT,
                CMS_CELEBRITY_ENDPOINT: process.env.CMS_CELEBRITY_ENDPOINT || env.CMS_CELEBRITY_ENDPOINT,
                CMS_LIFESTYLE_ENDPOINT: process.env.CMS_LIFESTYLE_ENDPOINT || env.CMS_LIFESTYLE_ENDPOINT,
                CMS_ARTICLE_DETAIL_ENDPOINT: process.env.CMS_ARTICLE_DETAIL_ENDPOINT || env.CMS_ARTICLE_DETAIL_ENDPOINT,
                INSTAGRAM_ENDPOINT: process.env.INSTAGRAM_ENDPOINT || env.INSTAGRAM_ENDPOINT,
                CMS_KEYWORD_ENDPOINT: process.env.CMS_KEYWORD_ENDPOINT || env.CMS_KEYWORD_ENDPOINT,
                GOOGLE_SEARCH_ENDPOINT: process.env.GOOGLE_SEARCH_ENDPOINT || env.GOOGLE_SEARCH_ENDPOINT
            }
        }),
        formatError: function(err) { console.error(err); return err; }
    })(event, context, function(err, output) {
        var matchedCORS = corsOrigin
            .split(",")
            .map(function(o) { return o.trim(); })
            .filter(function(o) { return o === event.headers.origin; });
        if (matchedCORS.length > 0) {
            output.headers = output.headers || {};
            output.headers['Access-Control-Allow-Credentials'] = 'true';
            output.headers['Access-Control-Allow-Origin'] = event.headers.origin;
        }
        console.log("response: " + JSON.stringify(output));
        callback(err, output);
    });
}
