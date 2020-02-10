var Rx = require("@reactivex/rxjs");

module.exports = {
    ErrorRecoveryHelper: function(err) {
        console.error(err);
        return Rx.Observable.empty()
    }
};
