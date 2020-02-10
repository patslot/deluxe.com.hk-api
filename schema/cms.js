var Article = require("./article");

var CmsSpecialFeedItem = `
    type CmsSpecialFeedItem {
        id: String
        publish: String
        expire: String
        lastUpdate: String
        title: String
        videoFile: String
        videoThumbnail: String
        youtube: String
        imgFile: String
        oldCatName: String
        oldSecName: String
        intro: String
    }
`;

var CmsFeedItem = `
    type CmsFeedItem {
        categoryID: String
        campaignID: String
        name: String
        eName: String
        showNew: Boolean
        genCatJSON: Boolean
        subCategory: String
        display: Boolean
        sort: Int
        memo: String
        img: String
    }
`;

var CmsArticle = `
    type CmsArticle implements IArticle {
        id: String
        lastUpdate: String
        title: String
        tag: String

        categoryID: String
        publish: String
        articleThumbnail: String
        videoThumbnail: String
        videoFile: String
        anvato: String
        youtube: String
        intro: String
        Keyword: String

        cmsArticleDetail: CmsArticleDetail
    }

    type ContributorArticle implements IArticle {
        id: String
        lastUpdate: String
        title: String
        tag: String
        
        categoryID: String
        publish: String
        articleThumbnail: String
        videoThumbnail: String
        videoFile: String
        anvato: String
        youtube: String
        intro: String
        Keyword: String

        contributorName: String
        contributorArticleDetail: CmsArticleDetail
    }

    type KeywordArticles implements IArticle{
        id: String
        lastUpdate: String
        tag: String

        campaignid: String
        categoryID: String
        categoryName: String
        articleid: String
        title: String
        publish: String
        articleThumbnail: String
        videoThumbnail: String
        videoFile: String
        youtube: String
        intro: String        
        keywords: String
        keywordArticleDetail: CmsArticleDetail
    }
`;

var CmsArticleDetail = `
    interface ICmsArticleDetail {
        categoryID: String
        categoryName: String
        publish: String
        expire: String
        lastUpdate: String
        title: String
        subTitle: String
        videoFile: String
        videoThumbnail: String
        anvato: String
        youtube: String
        artBlock: [ArtBlock]
        imgBlock: [ImgBlock]
        oldCatName: String
        oldSecName: String
        tag: String
        restricted: Boolean
        subCategory: String
        masterTag: String
        keyword: String
    }

    type CmsArticleDetail implements ICmsArticleDetail {
        categoryID: String
        categoryName: String
        publish: String
        expire: String
        lastUpdate: String
        title: String
        subTitle: String
        videoFile: String
        videoThumbnail: String
        anvato: String
        youtube: String
        artBlock: [ArtBlock]
        imgBlock: [ImgBlock]
        oldCatName: String
        oldSecName: String
        tag: String
        restricted: Boolean
        subCategory: String
        masterTag: String
        keyword: String
    }

    type ContributorArticleDetail implements ICmsArticleDetail {
        categoryID: String
        categoryName: String
        publish: String
        expire: String
        lastUpdate: String
        title: String
        subTitle: String
        videoFile: String
        videoThumbnail: String
        anvato: String
        youtube: String
        artBlock: [ArtBlock]
        imgBlock: [ImgBlock]
        oldCatName: String
        oldSecName: String
        tag: String
        restricted: Boolean
        subCategory: String
        masterTag: String
        keyword: String

        contributorName: String
    }
`;

var ArtBlock = `
    type ArtBlock {
        blockID: String
        articleID: String
        subTitle: String
        content: String
        imgFile: String
        caption: String
        sort: Int
        imgWidth: Int
        imgHeight: Int
    }
`;

var ImgBlock = `
    type ImgBlock {
        imgFile: String
        caption: String
        imgWidth: Int
        imgHeight: Int
    }
`;

var CmsComponeFeedItem = `
    interface ICmsComponeFeedItem {
        homeGalleryID: String
        apID: String
        catName: String
        imgName: String
        caption: String
        content: String
        linkURL: String
        linkType: String
        sort: Int
        startDateTime: String
        endDateTime: String
        confirm: Boolean
        hasVideo: Boolean
        adCode: String
        apCatID: String
    }

    type CmsComponeFeedItem implements ICmsComponeFeedItem {
        homeGalleryID: String
        apID: String
        catName: String
        imgName: String
        caption: String
        content: String
        linkURL: String
        linkType: String
        sort: Int
        startDateTime: String
        endDateTime: String
        confirm: Boolean
        hasVideo: Boolean
        adCode: String
        apCatID: String
    }

    type MPMCmsComponeFeedItem implements ICmsComponeFeedItem {
        homeGalleryID: String
        apID: String
        catName: String
        imgName: String
        caption: String
        content: String
        linkURL: String
        linkType: String
        sort: Int
        startDateTime: String
        endDateTime: String
        confirm: Boolean
        hasVideo: Boolean
        adCode: String
        apCatID: String

        title: String
        label: String
    }
`;



module.exports = function() {
    return [
        Article,
        CmsSpecialFeedItem,
        CmsFeedItem,
        CmsArticle,
        CmsArticleDetail,
        ArtBlock,
        ImgBlock,
        CmsComponeFeedItem
    ];
};
