bored.config = {

    ignoredHeaders: [],

    getDefaultIgnoredHeaders: function() {
        return [
            "accept-charset",
            "accept-ranges",
            "access-control-allow-methods",
            "access-control-allow-origin",
            "access-control-expose-headers",
            "access-control-max-age",
            "adserver",
            "age",
            "allow",
            "bk-server",
            "cache-control",
            "cneonction",
            "comscore",
            "connection",
            "content-disposition",
            "content-encoding",
            "content-language",
            "content-length",
            "content-transfer-encoding",
            "content-type",
            "cteonnt-length",
            "date",
            "dclk_imp",
            "delay",
            "dpool_header",
            "edge-control",
            "etag",
            "expires",
            "gdata-version",
            "get-dictionary",
            "keep-alive",
            "last-modified",
            "location",
            "nncoection",
            "p3p",
            "ppserver",
            "pragma",
            "px-uncompress-origin",
            "retry-after",
            "s",
            "seq",
            "server",
            "set-cookie",
            "sina-lb",
            "slash_log_data",
            "status",
            "strict-transport-security",
            "transfer-encoding",
            "vary",
            "version",
            "via",
            "vtag",
            "www-authenticate",
            "x-amz-cf-id",
            "x-amz-id-1",
            "x-amz-id-2",
            "x-amz-meta-alexa-last-modified",
            "x-amz-meta-jets3t-original-file-date-iso8601",
            "x-amz-meta-md5-hash",
            "x-amz-request-id",
            "x-amz-version-id",
            "x-amzn-requestid",
            "x-aspnet-version",
            "x-auto-login",
            "x-c",
            "x-cache",
            "x-cdn",
            "x-cnection",
            "x-content-digest",
            "x-content-type-options",
            "x-fb-debug",
            "x-frame-options",
            "x-gdata-user-country",
            "x-imf",
            "x-mid",
            "x-mm-dbg",
            "x-mm-host",
            "x-msadid",
            "x-n",
            "x-nc",
            "x-netacuity",
            "x-node-id",
            "x-powered-by",
            "x-proc-ms",
            "x-public-image",
            "x-px",
            "x-rack-cache",
            "x-radid",
            "x-ratelimit-limit",
            "x-ratelimit-remaining",
            "x-request-id",
            "x-runtime",
            "x-transaction",
            "x-tumblr-usec",
            "x-ua-compatible",
            "x-ua-profile",
            "x-varnish",
            "x-via",
            "x-xrds-location",
            "x-xss-protection",
            "x-ysws-request-id",
            "xserver"
        ];
    },

    save: function() {
        localStorage["ignoredHeaders"] = JSON.stringify(this.ignoredHeaders);
    },

    cleanAndSave: function() {
        // sort
        this.ignoredHeaders.sort(function(l, r) {
            var l_lc = l.toLowerCase();
            var r_lc = r.toLowerCase();

            if (l_lc < r_lc) return -1;
            if (l_lc > r_lc) return 1;
            return 0;
        });

        // de-dupe and remove entries that are whitespace/empty
        var pos = 0;
        while (pos < this.ignoredHeaders.length - 1) {
            if (this.ignoredHeaders[pos] === this.ignoredHeaders[pos + 1] || /^\s*$/.test(this.ignoredHeaders[pos])) {
                this.ignoredHeaders.splice(pos, 1);
            } else {
                pos++;
            }
        }

        this.save();
    },

    load: function() {
        var loadedSuccessfully = false;
        var configIgnoredHeaders;

        if (localStorage["ignoredHeaders"]) {
            try {
                configIgnoredHeaders = JSON.parse(localStorage["ignoredHeaders"]);
                loadedSuccessfully = true;
            }
            catch (e) {
                console.log("Error parsing ignored headers from local storage");
            }
        } else {
            console.log("No \"ignored headers\" list found in config; using defaults");
        }

        this.ignoredHeaders = configIgnoredHeaders || this.getDefaultIgnoredHeaders();

        // save defaults to local storage
        if (!loadedSuccessfully) {
            this.save();
        }
    },

    addIgnoredHeaderName: function(headerName) {
        console.log("Now ignoring \"" + headerName + "\"");
        this.ignoredHeaders.push(headerName.toLowerCase());
        this.cleanAndSave();
    }
};
