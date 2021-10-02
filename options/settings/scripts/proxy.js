chrome.storage.local.get("proxy", function (data) {
    if (data.proxy != undefined) {
        $('#proxyData').val(data.proxy.data);
        if (data.proxy.switcher == true) {
            $('#proxyBtn').children().attr('sw', "on");
            go(true);
        }
    }
});

$(function () {
    $(document).on('change', '#proxyData', function () {
        chrome.storage.local.get("proxy", function (data) {
            var status = {
                'data': $('#proxyData').val(),
                'switcher': false
            }
            $('#proxyBtn').children().attr('sw', "off");
            chrome.storage.local.set({ 'proxy': status });
        });
    });

    $('#proxyBtn').on('click', function () {
        var status = new Object();

        if ($('#proxyBtn').children().attr('sw') == "on") {
            $('#proxyBtn').children().attr('sw', "off");
            status = {
                'data': $('#proxyData').val(),
                'switcher': false
            }
            go(false);
        } else {
            status = {
                'data': $('#proxyData').val(),
                'switcher': true
            }
            $('#proxyBtn').children().attr('sw', "on");
            go(true);
        }
        chrome.storage.local.set({ 'proxy': status });
    });
});

function go(b) {
    chrome.storage.local.get("proxy", function (data) {
        pr = data.proxy.data.split(':');
        var config = {
            mode: "direct"
        };

        if (b == true) {
            var config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http",
                        host: pr[0],
                        port: parseInt(pr[1])
                    },
                    bypassList: ["degosh.com", "dashboard.degosh.com"]
                }
            };
        }

        setTimeout(() => {
            chrome.proxy.settings.set(
                { value: config, scope: 'regular' },
                function () { });

            if (b == true) {
                chrome.webRequest.onAuthRequired.addListener(
                    function (details, callbackFn) {
                        console.log("onAuthRequired!", details, callbackFn);
                        callbackFn({
                            authCredentials: { username: pr[2], password: pr[3] }
                        });
                    },
                    { urls: ["<all_urls>"] },
                    ['asyncBlocking']
                );
            }
        }, 250);
    });
}