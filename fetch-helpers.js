var fetch = require('node-fetch');

function getJsonCache(redisClient, key) {
    return new Promise(
        function(resolve, reject) {
            redisClient.get(key, function(err, reply) {
                if (err) {
                    return reject(err);
                }
                return resolve(reply ? JSON.parse(reply) : null);
            });
        }
    );
}

function writeJsonCache(redisClient, key, value, ttl) {
    return new Promise(function(resolve, reject) {
        redisClient.set(key, JSON.stringify(value), function(err) {
            if (err) {
                return reject(err);
            }
            redisClient.expire(key, ttl, function(err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

function defaultFetch(url, options) {
    var mergedOptions = Object.assign({}, options, {timeout: 5000});
    return fetch(url, mergedOptions)
        .then(function(res) {
            if (!res.ok) {
                throw new Error("" + res.status + " " + res.statusText);
            } else if (res.status === 204) {
                return null;
            }
            return res.json();
        });
}

module.exports = {
    fetchWithoutCache: () => defaultFetch,
    fetchWithRedisCache: (redisClient, ttl) => (url, options) => {
        if (!redisClient) {
            throw new Error("no redis client");
        }

        // console.log("url " + url);

        return getJsonCache(redisClient, url)
            .then(function(cache) {
                if (cache) {
                    return cache;
                }
                // cache and serve it
                return defaultFetch(url, options)
                    .then(function(json) {
                        if (json === null) { return null; }
                        return writeJsonCache(redisClient, url, json, ttl)
                            .then(function() {
                                console.log(`[Cache] url=${url} ttl=${ttl}`);
                                return json;
                            });
                    });
            })
            .catch(function(err) {
                console.error(
                    "redis error(continue to fetch API directly): " + err
                );
                return defaultFetch(url, options);
            });
    }
}
