var expect = require("chai").expect;
var Resolvers = require("./");

describe("resolvers#ping", function() {
    describe("query#ping", function() {
        it("should return pong string", function() {
            expect(Resolvers({}).RootQuery.ping()).to.equal("pong");
        });
    });
});
