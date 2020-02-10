var InstagramPost = `
    type InstagramPost {
        created_time: Int
        link: String
        type: String
        images: InstagramImageSet
        videos: InstagramVideoSet
    }

    type InstagramImageSet {
        low_resolution: InstagramMedia
        thumbnail: InstagramMedia
        standard_resolution: InstagramMedia
    }

    type InstagramVideoSet {
        low_bandwidth: InstagramMedia
        low_resolution: InstagramMedia
        standard_resolution: InstagramMedia
    }

    type InstagramMedia {
        url: String
        width: Int
        height: Int
    }
`;

module.exports = function() {
    return [
        InstagramPost
    ];
};
