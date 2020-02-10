var redis = require("redis");

exports.createRedistClient = function(port, host) {
    var redisClient = redis.createClient(port, host);
    redisClient.on("ready", function() {
        console.log("redis connected");
    });
    redisClient.on("reconnecting", function() {
        console.log("redis reconnecting");
    });
    redisClient.on("error", function(err) {
        console.error("redis error: " + err);
    });
    redisClient.on("end", function() {
        console.log("redis connection closed");
    });
    return redisClient;
}
