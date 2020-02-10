var moment = require("moment-timezone");

const toISO8601_Hour = (str) =>
    moment.tz(str, "YYYY-MM-DD HH", "Asia/Hong_Kong").toISOString()

const toISO8601_Short = (str) =>
    moment.tz(str, "YYYYMMDD", "Asia/Hong_Kong").toISOString();

const toISO8601_Long = (str) =>
    moment.tz(str, "YYYYMMDD HH:mm", "Asia/Hong_Kong").toISOString();

module.exports = {
    CmsSpecialFeedItemMapper: function(d) {
        return {
            id: d.Id,
            publish: toISO8601_Long(d.Publish),
            expire: toISO8601_Short(d.Expire),
            lastUpdate: toISO8601_Long(d.LastUpdate),
            title: d.Title,
            videoFile: d.VideoFile,
            videoThumbnail: d.VideoThumbnail,
            youtube: d.Youtube,
            imgFile: d.ImgFile,
            oldCatName: d.OldCatName,
            oldSecName: d.OldSecName,
            intro: d.Intro
        };
    },
    CmsFeedItemMapper: function(d) {
        return {
            categoryID: d.CategoryID,
            campaignID: d.CampaignID,
            name: d.Name,
            eName: d.EName,
            showNew: d.ShowNew === "Y",
            genCatJSON: d.GenCatJson === "Y",
            subCategory: d.SubCategory,
            display: d.Display === "Y",
            sort: d.Sort,
            memo: d.Memo,
            img: d.Img
        };
    },
    CmsArticleMapper: function(d) {
        return {
            id: d._id,
            categoryID: d.CategoryID,
            publish: toISO8601_Long(d.Publish),
            lastUpdate: toISO8601_Long(d.LastUpdate),
            title: d.Title,
            articleThumbnail: d.ArticleThumbnail,
            videoThumbnail: d.VideoThumbnail,
            videoFile: d.VideoFile,
            anvato: d.Anvato,
            youtube: d.Youtube,
            intro: d.Intro,
            tag: d.Tag
        };
    },
    KeywordArticleMapper: function(d) {
        return {
            campaignid: d._source.campaignid,
            id: d._id,
            type: "keyword",
            publish: toISO8601_Long(d.publish),
            title: d._source.title,
            articleThumbnail: d._source.articlethumbnail,
            videoThumbnail: d._source.videothumbnail,
            videoFile: d._source.videofile,
            youtube: d._source.youtube,
            intro: d._source.intro,
            categoryID: d._source.categoryid,
            categoryName: d._source.categoryname,
            keywords: d._source.keywords
        };
    },
    CmsArticleDetailMapper: function(d) {
        var artBlock = d.ArtBlock || [];
        var imgBlock = d.ImgBlock || [];
        if(d.MasterTag){
            var masterTag = d.MasterTag;
        }else{
            var masterTag = "";
        }    
        masterTag = masterTag.replace(/,/g,'|');
        var regex1 = RegExp('^_mt_');
        if(d.Keyword){
            var pkeyword = d.Keyword.map(x => {
                var temp = x.trim() ;
                if(regex1.test(temp)){

                    // var tempRegExp = RegExp(temp.substring(4));
                    // if(!tempRegExp.test(masterTag)){
                    var tempRegExp = RegExp(temp);
                    if(!tempRegExp.test(masterTag)){
                        masterTag = masterTag + "|" + temp.substring(4); 
                    }

                    return temp;
                }
                else{
                    return temp;
                }
            });
        }else{
            var pkeyword = "";
        }
        return {
            categoryID: d.CategoryID,
            categoryName: d.CategoryName,
            publish: toISO8601_Long(d.Publish),
            expire: toISO8601_Short(d.Expire),
            lastUpdate: toISO8601_Long(d.LastUpdate),
            title: d.Title,
            subTitle: d.SubTitle,
            videoFile: d.VideoFile,
            videoThumbnail: d.VideoThumbnail,
            anvato: d.Anvato,
            youtube: d.Youtube,
            artBlock: artBlock.map(function(ab) {
                return {
                    blockID: ab.BlockID,
                    articleID: ab.ArticleID,
                    subTitle: ab.SubTitle,
                    content: ab.Content,
                    imgFile: ab.ImgFile,
                    caption: ab.Caption,
                    sort: ab.Sort,
                    imgWidth: ab.ImgW,
                    imgHeight: ab.ImgH
                };
            }),
            imgBlock: imgBlock.map(function(ib) {
                return {
                    imgFile: ib.ImgFile,
                    caption: ib.Caption,
                    imgWidth: ib.ImgW,
                    imgHeight: ib.ImgH
                };
            }),
            oldCatName: d.OldCatName,
            oldSecName: d.OldSecName,
            tag: d.Tag,
            restricted: d.Restricted === "Y",
            subCategory: d.SubCategory,
            masterTag: masterTag,
            keyword: pkeyword
        };
    },
    CmsComponeFeedItemMapper: function(d) {
        var linkType = "link";
        var linkURL = (d.LinkURL || "").trim();
        if (/^[\d]+$/.test(linkURL)) { // test if cms id
            linkType = "cms";
        } else if (/^[\d]_[\d]+$/.test(linkURL)) { // test if news id
            linkType = "news";
        } else if (/^$/.test(linkURL)) { // test if empty
            linkType = "empty"
        }
        return {
            homeGalleryID: d.HomeGalleryID,
            apID: d.APID,
            catName: d.CatName,
            imgName: d.ImgName,
            caption: d.Caption,
            content: d.Content,
            linkURL: linkURL,
            linkType: linkType,
            sort: d.Sort,
            startDateTime: toISO8601_Hour(d.SDateTime),
            endDateTime: toISO8601_Hour(d.EDateTime),
            confirm: d.Confirm === "Y",
            hasVideo: d.HasVideo === "Y",
            adCode: d.AdCode,
            apCatID: d.APCatID
        };
    },
    CmsComponeFeedItemFilterExpired: (targetDate) => (d) =>
        moment(targetDate).isBetween(d.startDateTime, d.endDateTime),
    CmsComponeFeedItemFilterExpiredNoStart: (targetDate) => (d) =>
        moment(targetDate).isBefore(d.endDateTime)
};
