var Rx = require("@reactivex/rxjs");
var ErrorHelper = require("../helpers/error");
module.exports = function(googleSearchConnector) {    
    searchmapping = function(d){
        var processTitle = d.title
        var a = processTitle.lastIndexOf('-');
        if (a > 0){
            processTitle = processTitle.substring(0, a); 
        }
        return{
            title:  processTitle,
            link: d.link,
            snippet: d.snippet,
            image: d.pagemap.cse_image[0].src,
            ogimage: d.pagemap.metatags[0]['og:image']
        }
    }
    return {
        list: function(obj, args, context, info) {
            
            var offset = args.offset || 0;
            var searchResultObs = googleSearchConnector.list(args.query, offset, args.excludeterms);
            var searchResult$ = Rx.Observable.from(searchResultObs)
            .catch(ErrorHelper.ErrorRecoveryHelper)
            .map(searchmapping);
            // var subs = searchResult$.subscribe(function(x){
            //                console.log('subs');
            //                console.log(x);   
            // });
            return searchResult$
                .toArray()
                .toPromise();
        }
    };
};
