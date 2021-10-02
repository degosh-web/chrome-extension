chrome.storage.local.get("shopify", function (data) {
    if (data.shopify == undefined) {
        chrome.storage.local.set({
            'shopify': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.shopify.autofill == true) {
            $('#shopifyAutofill').children().attr('sw', "on");
        }
    
        if (data.shopify.autocheckout == true) {
            $('#shopifyAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#shopifyAutofill').on('click', function () {
        chrome.storage.local.get("shopify", function (data) {
            var status = new Object();

            if ($('#shopifyAutofill').children().attr('sw') == "on") {
                $('#shopifyAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.shopify.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.shopify.autocheckout
                }
                $('#shopifyAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'shopify': status });
        });
    });

    $('#shopifyAutocheckout').on('click', function () {
        chrome.storage.local.get("shopify", function (data) {
            var status = new Object();

            if ($('#shopifyAutocheckout').children().attr('sw') == "on") {
                $('#shopifyAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.shopify.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.shopify.autofill,
                    'autocheckout': true
                }
                $('#shopifyAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'shopify': status });
        });
    });
});