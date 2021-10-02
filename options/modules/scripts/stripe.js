chrome.storage.local.get("stripe", function (data) {
    if (data.stripe == undefined) {
        chrome.storage.local.set({
            'stripe': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.stripe.autofill == true) {
            $('#stripeAutofill').children().attr('sw', "on");
        }
    
        if (data.stripe.autocheckout == true) {
            $('#stripeAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#stripeAutofill').on('click', function () {
        chrome.storage.local.get("stripe", function (data) {
            var status = new Object();

            if ($('#stripeAutofill').children().attr('sw') == "on") {
                $('#stripeAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.stripe.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.stripe.autocheckout
                }
                $('#stripeAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'stripe': status });
        });
    });

    $('#stripeAutocheckout').on('click', function () {
        chrome.storage.local.get("stripe", function (data) {
            var status = new Object();

            if ($('#stripeAutocheckout').children().attr('sw') == "on") {
                $('#stripeAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.stripe.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.stripe.autofill,
                    'autocheckout': true
                }
                $('#stripeAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'stripe': status });
        });
    });
});