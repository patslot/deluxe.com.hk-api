var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");
var gse = require("graphql-server-express");
var graphqlHelper = require("./graphql-helpers");
var redisHelper = require("./redis-helpers");

module.exports = function(options) {
    var app = express();
    app.use(morgan("tiny"));

    var redisClient = null;
    if (options.redisHost) {
        redisClient = redisHelper.createRedistClient(+options.redisPort, options.redisHost);
    }

    if (options.corsOrigin) {
        app.use("/graphql", cors({
          origin: options.corsOrigin.split(",").map(function(d) { return d.trim(); }),
          credentials: true,
          optionsSuccessStatus: 200
        }));
    }

    app.use("/graphql", bodyParser.json(), gse.graphqlExpress({
        schema: graphqlHelper.createExecutableSchema({
            redisClient: redisClient,
            endpoints: options.endpoints,
            imgURLPrefix: options.imgURLPrefix
        }),
        formatError: function(err) { console.error(err); return err; }
    }));

    if (options.enableGraphiql) {
        app.use('/graphiql', gse.graphiqlExpress({
          endpointURL: '/graphql',
        }));
    }

    return app;
};
