$(document).ready(function() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    var bored = backgroundPage.bored;

    $("#ignoredHeaders").val(bored.config.ignoredHeaders.join("\n"));

    $("#options").submit(function() {
        bored.config.ignoredHeaders = $("#ignoredHeaders").val().split(/[\s,]+/g);
        bored.config.cleanAndSave();
        // todo: break coupling
        backgroundPage.validateQueuedUpdates();
    });

    $("#reset").click(function() {
        $("#ignoredHeaders").val(bored.config.getDefaultIgnoredHeaders().join("\n"));
    });
});
