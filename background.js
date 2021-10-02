//Icon badge
badge();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    badge();
});

chrome.tabs.onCreated.addListener(tab => {
    badge();
});

function badge() {
    chrome.storage.local.get('switcher', (sw) => {
        if (sw.switcher == undefined) {
            chrome.storage.local.set({ 'switcher': false });
        }

        if (sw.switcher) {
            chrome.browserAction.setBadgeBackgroundColor({ color: '#9866FF' }, () => {
                chrome.browserAction.setBadgeText({ text: 'On' });
            });
        } else {
            chrome.browserAction.setBadgeText({});
        }
    });
}

//Check key
setInterval(() => {
    chrome.storage.local.get('license', function (key) {
        if (key.license != undefined) {
            fetch('https://dashboard.degosh.com/extension/enter', {
                method: 'POST',
                body: new URLSearchParams({
                    key: key.license.replace(/\s/g, '')
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
                .then(res => res.json())
                .then((json) => {
                    if (json.giveAccess == "No key") {
                        chrome.storage.local.set({ 'switcher': false });
                        badge();
                    } else if (json.giveAccess == "Wrong IP") {
                        chrome.storage.local.set({ 'switcher': false });
                        badge();
                    }
                }).catch(function (err) {
                    chrome.storage.local.set({ 'switcher': false });
                    badge();
                });
        } else {
            badge();
        }
    });
}, 60000);

//Focus event
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { focused: true })
    sendResponse();
});

//Proxy (on start)
chrome.storage.local.get("proxy", function (data) {
    if (data.proxy && data.proxy.switcher) {
        var b = data.proxy.switcher;
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
    }
});