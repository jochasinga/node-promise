require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        holder: '../bower_components/holderjs/holder.min',
        mustache: '../bower_components/mustache.js/mustache.min',
    }
});

require(["app"], function(app) {});

requirejs(["index"]);