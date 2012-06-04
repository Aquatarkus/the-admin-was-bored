// init
var newItemCount = 0;
var queuedUpdates = [];

bored.config.load();

chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        var headerInfo = {
            "tabId": details.tabId,
            "url": details.url,
            "headers": []
        };
        for (var i in details.responseHeaders) {
            var ignoreHeader = false;
            for (var j in bored.config.ignoredHeaders) {
                if (details.responseHeaders[i].name.toLowerCase() === bored.config.ignoredHeaders[j]) {
                    ignoreHeader = true;
                    break;
                }
            }

            if (ignoreHeader) {
                continue;
            }

            headerInfo.headers.push({
                "name": details.responseHeaders[i].name,
                "value": details.responseHeaders[i].value
            });
        }

        if (headerInfo.headers.length > 0) {
            newItemCount++;
            queuedUpdates.splice(0, 0, headerInfo);
            chrome.browserAction.setBadgeText({ text: newItemCount.toString() });
        }
    },
    {
        urls: [
            "http://*/*",
            "https://*/*"
        ]
    },
    [ "responseHeaders" ]
    );


function clearQueuedUpdates() {
    // clear counter; results show in popup
    newItemCount = 0;
    chrome.browserAction.setBadgeText({ text: "" });
    queuedUpdates = [];
}


function addHeaderToIgnore(headerName) {
    bored.config.addIgnoredHeaderName(headerName);
    validateQueuedUpdates();
}

// removes items if new headers are ignored
function validateQueuedUpdates() {
    for (var upd = queuedUpdates.length - 1; upd >= 0; upd--) {
        for (var hdr = queuedUpdates[upd].headers.length - 1; hdr >= 0; hdr--) {
            var ignoreHeader = false;
            for (var ignHdr in bored.config.ignoredHeaders) {
                if (queuedUpdates[upd].headers[hdr].name.toLowerCase() === bored.config.ignoredHeaders[ignHdr]) {
                    ignoreHeader = true;
                    break;
                }
            }

            if (ignoreHeader) {
                console.log("Ignoring " + bored.config.ignoredHeaders[ignHdr] + " from " + queuedUpdates[upd].url);
                queuedUpdates[upd].headers.splice(hdr, 1);
                continue;
            }
        }

        if (queuedUpdates[upd].headers.length == 0) {
            queuedUpdates.splice(upd, 1);
        }
    }
}

// expose queued updates to popup
function getQueuedUpdates() {
    // clear counter; results show in popup
    newItemCount = 0;
    chrome.browserAction.setBadgeText({ text: "" });
    return queuedUpdates;
}