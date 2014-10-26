var dao = require('../../db/principle_feed');
dao.getNewFeed(function(feed) {
    console.log(feed == null ? '' : feed.url);
});
