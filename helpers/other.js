"use strict";

const url = require("url");

function addPrefix(prefix, imageURLString) {
    if ((imageURLString || "").trim() === "") {
        return "";
    }
    let imageURL = url.parse(imageURLString);
    if (imageURL.host) { // FIXME hardcode image URL fix for temporary use
        if (imageURL.host === "img.appledaily.com.tw") {
            return prefix + imageURL.path;
        }
        return imageURLString;
    }
    return (prefix || "") + imageURLString;
}

module.exports = {
    /**
     * This mapper helps to unify the image file URL. It adds the prifix to
     * the image file attribute if the content of the attribute is just a
     * path without hostname.
     */
    ImgPathPrefixMapper: (prefix) => (original) => {
        let item = original;
        if (item) {
            if (item.imgName) { // CmsComponeFeedItem
                item = Object.assign({}, item, {
                    imgName: addPrefix(prefix, item.imgName)
                });
            }
            if (item.img) { // CmsFeedItem
                item = Object.assign({}, item, {
                    img: addPrefix(prefix, item.img)
                });
            }
            if (item.imgFile) { // CmsSpecialFeedItem
                item = Object.assign({}, item, {
                    imgFile: addPrefix(prefix, item.imgFile)
                });
            }
            if (item.videoThumbnail) {
                item = Object.assign({}, item, {
                    videoThumbnail: addPrefix(prefix, item.videoThumbnail)
                });
            }
            if (item.articleThumbnail) {
                item = Object.assign({}, item, {
                    articleThumbnail: addPrefix(prefix, item.articleThumbnail)
                });
            }
            if (item.artBlock) { // CmsArticleDetail
                let artBlock = item.artBlock || [];
                item = Object.assign({}, item, {
                    artBlock: artBlock.map(block =>
                        Object.assign(
                            {},
                            block,
                            { imgFile: addPrefix(prefix, block.imgFile) }
                        )
                    )
                });
            }
            if (item.imgBlock) { // CmsArticleDetail
                let imgBlock = item.imgBlock || [];
                item = Object.assign({}, item, {
                    imgBlock: imgBlock.map(block =>
                        Object.assign(
                            {},
                            block,
                            { imgFile: addPrefix(prefix, block.imgFile) }
                        )
                    )
                });
            }
        }
        return item;
    }
}
