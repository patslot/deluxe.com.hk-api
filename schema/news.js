var Article = require("./article");

var NewsArticle = `
    type NewsArticle implements IArticle {
        id: String
        lastUpdate: String
        title: String

        order: Int
        highlight: Boolean
        brandId: String
        brandName: String
        brandArticleId: String
        brandCategoryId: String
        mlCategoryId: String
        mlArticleId: String
        issueId: String
        pubDate: String
        updateDate: String
        displayLayoutPreset: String
        displayTime: String
        forceToShowDate: Boolean
        label: String
        mediaGroup: [MediaItem]
        sharing: Sharing
        social: Social
        logging: Logging
        firstContentBlock: ContentBlock
        newsArticleDetail: NewsArticleDetail
    }
`;

var NewsArticleDetail = `
    type NewsArticleDetail {
        brandId: String
        brandArticleId: String
        brandCategoryId: String
        brandCategoryName: String
        brandName: String
        mlCategoryId: String
        mlArticleId: String
        issueId: String
        magIssueId: String
        pubDate: String
        lastUpdate: String
        displayTime: String
        forceToShowDate: Boolean
        categoryName: String
        title: String
        subTitle: String
        intro: String
        label: String
        social: Social
        logging: Logging
        pageName: String
        allowComment: Boolean
        pollingWidgetId: String
        tags: [String]
        newsTrack: [String]
        themeTags: [String]
        mediaGroup: [MediaItem]
        sharing: Sharing
        level3Category: [Int]
        level2Category: [Int]
        level1Category: [Int]
        level0Category: [Int]
        fbComments: [FBComment]
        contentBlocks: [ContentBlock]
        showRelatedArticleAtTop: Boolean
        introPhotos: [PhotoItem]
        relatedNews: [RelatedNews]
    }
`;

var MediaItem = `
    type MediaItem {
        type: String
        smallPath: String
        largePath: String
        width: Int
        height: Int
        source: String
        videoId: String
        url: String
        quality: String
    }
`;

var PhotoItem = `
    type PhotoItem {
        imageId: String
        imagePath: String
        imagePathZoom: String
        expireDate: String
        caption: String
        width: Int
        height: Int
        source: String
    }
`;

var Sharing = `
    type Sharing {
        image: String
        url: String
    }
`;

var Social = `
    type Social {
        likeCount: Int
        commentCount: Int
        viewCount: Int
        videoViewCount: Int
        facebookCommentId: String
    }
`;

var Logging = `
    type Logging {
        pixelCategory: String
        pixelNewsType: String
        pixelKeyword: String
        pixelSrc: String
        pixelAuthor: String
        krux_app_brand: String
        krux_app_subsection_suffix: String
        pixelCat: String
        pixelNews: String
    }
`;

var ContentBlock = `
    type ContentBlock {
        subHead: String
        content: String
        photos: [PhotoItem]
    }
`;

var FBComment = `
    type FBComment {
        createdAt: Int
        from: FBCommentUser
        message: String
    }

    type FBCommentUser {
        id: Int
        name: String
        avatarURL: String
    }
`;

var RelatedNews = `
    type RelatedNews {
        brandArticleId: String
        mlArticleId: String
        issueId: String
        displayTime: String
        label: String
        brandId: String
        brandCategoryId: String
        title: String
        mediaGroup: [MediaItem]
        adTags: [AdTag]
    }

    type AdTag {
        tag: String
        name: String
        remark: String
        size: String
    }
`;

module.exports = function() {
    return [
        Article,
        NewsArticle,
        NewsArticleDetail,
        MediaItem,
        PhotoItem,
        Sharing,
        Social,
        Logging,
        ContentBlock,
        FBComment,
        RelatedNews
    ];
};
