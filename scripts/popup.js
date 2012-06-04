var backgroundPage = chrome.extension.getBackgroundPage()
var bored = backgroundPage.bored;

function ignoreHeaderLink_Click(headerName) {
    backgroundPage.addHeaderToIgnore(headerName);
    bindList();
}

function addHeaderInfo(headerInfo) {
    var urlItem = document.createElement("li");
    $(urlItem).text(headerInfo.url);

    // create item for requested uri
    var headersList = document.createElement("ul");
    for (var i in headerInfo.headers) {
        // set up span with header name
        var headerName = document.createElement("span");
        $(headerName).addClass("headerName");
        $(headerName).attr("alt", "ignore \"" + headerInfo.headers[i].name + "\"");
        $(headerName).attr("hdr", headerInfo.headers[i].name);
        $(headerName).text(headerInfo.headers[i].name);

        $(headerName).click(function() {
            ignoreHeaderLink_Click($(this).attr("hdr"));
        });

        // set up list item for header name/value
        var headerItem = document.createElement("li");
        $(headerItem).text(": " + headerInfo.headers[i].value);
        $(headerItem).prepend($(headerName));

        $(headersList).append($(headerItem));
    }

    $(urlItem).append($(headersList));

    $("#headers").prepend($(urlItem));
}

function clearList() {
    backgroundPage.clearQueuedUpdates();
    bindList();
}

function bindList() {
    var queuedUpdates = backgroundPage.getQueuedUpdates();
    // remove "nothing found" message if there are updates to display
    $("#headers").empty();
    if (queuedUpdates.length == 0) {
        var li = document.createElement("li");
        $(li).text("No crazy headers detected yet!");
        $("#headers").append(li);
    }

    // newest on top
    for (var i = queuedUpdates.length - 1; i >= 0; i--) {
        addHeaderInfo(queuedUpdates[i]);
    }
}

$(document).ready(function() {
    bindList();
    $("#clear").click(clearList);
});
