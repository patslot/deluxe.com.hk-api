var expect = require("chai").expect;
var graphql = require("graphql").graphql;
var graphqlTools = require("graphql-tools");
var schema = require("./");
var resolvers = require("../resolvers");

describe("schema#index", function() {
    describe("schema syntax", function() {
        it("should be able to compile and query", function(done) {
            var schemaExe = graphqlTools.makeExecutableSchema({
                typeDefs: schema,
                resolvers: resolvers({})
            });
            graphql(schemaExe, "{ping}")
                .then(function(result) {
                    expect(result.data.ping).to.equal("pong");
                    done();
                })
        });
    });
});
