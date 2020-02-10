module.exports = function(instagramConnector) {    
    return {
        list: function(obj, args, context, info) {
            return instagramConnector.list(args.limit)
                .toArray()
                .toPromise();
        }
    };
};
