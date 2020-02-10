var SearchResult = `
    type SearchResult {
        title: String
        link: String
        snippet: String
        image: String
        ogimage: String
    }
    
`;

module.exports = function() {
    return [
        SearchResult
    ];
};
