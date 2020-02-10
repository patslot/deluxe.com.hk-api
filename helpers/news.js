var moment = require("moment");

const toISO8601 = (tsStr) => moment(tsStr, "X").toISOString();

module.exports = {
    NewsArticleMapper: function(d) {
        return Object.assign({}, d, {
            id: d.mlArticleId,
            lastUpdate: toISO8601(d.updateDate),
            pubDate: toISO8601(d.pubDate),
            updateDate: toISO8601(d.updateDate),
            displayTime: toISO8601(d.displayTime)
        });
    },
    NewsArticleDetailMapper: function(d) {
        return Object.assign({}, d, {
            pubDate: toISO8601(d.pubDate),
            lastUpdate: toISO8601(d.lastUpdate),
            displayTime: toISO8601(d.displayTime)
        });
    }
};
