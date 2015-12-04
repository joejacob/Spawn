/* SearchSource.defineSource('tasks', function(searchText, options) {
   // var options = {sort: {timeUntil: 1}};
    if(searchText) {
        var regExp = buildRegExp(searchText);
        console.log(regExp);
        var selector = {
            name: regExp,
            description: regExp,
            host: regExp
        };        
        return Tasks.find(selector, options).fetch();
    } else {
        return Tasks.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    var words = searchText.trim().split(/[ \-\:]+/);
    var exps = _.map(words, function(word) {
        return "(?=.*" + word + ")";
    });
    var fullExp = exps.join('') + ".+";
    var exp = new RegExp(fullExp, "i");
    console.log(typeof(exp));
    return new RegExp(fullExp, "i");
} */