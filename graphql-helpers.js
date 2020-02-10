var graphqlTools = require("graphql-tools");
var schema = require("./schema");
var Resolvers = require("./resolvers");
var Connectors = require("./connectors");
var fetchHelpers = require("./fetch-helpers");

function createConnectors(options) {
    var fetchAPIClient = null;
    var fetchIGClient = null;
    if (options.redisClient) {
        fetchAPIClient = fetchHelpers.fetchWithRedisCache(options.redisClient, 300);
        fetchIGClient = fetchHelpers.fetchWithRedisCache(options.redisClient, 3600);
    } else {
        fetchAPIClient = fetchHelpers.fetchWithoutCache();
        fetchIGClient = fetchHelpers.fetchWithoutCache();
    }

    return Connectors({
        endpoints: options.endpoints,
        fetchClients: {
            api: fetchAPIClient,
            instagram: fetchIGClient
        }
    });
}

exports.createExecutableSchema = function(options) {
    return graphqlTools.makeExecutableSchema({
        typeDefs: schema,
        resolvers: Resolvers(
            createConnectors(options),
            options.imgURLPrefix,
            +(options.maxNumCatArticle || 200)
        )
    });
}
