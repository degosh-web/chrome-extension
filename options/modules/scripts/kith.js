chrome.storage.local.get("kith", function (data) {
    if (data.kith == undefined) {
        chrome.storage.local.set({
            'kith': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.kith.autofill == true) {
            $('#kithAutofill').children().attr('sw', "on");
        }
    
        if (data.kith.autocheckout == true) {
            $('#kithAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {
    $('#kithAutofill').on('click', function () {
        chrome.storage.local.get("kith", function (data) {
            var status = new Object();

            if ($('#kithAutofill').children().attr('sw') == "on") {
                $('#kithAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.kith.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.kith.autocheckout
                }
                $('#kithAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'kith': status });
        });
    });

    $('#kithAutocheckout').on('click', function () {
        chrome.storage.local.get("kith", function (data) {
            var status = new Object();

            if ($('#kithAutocheckout').children().attr('sw') == "on") {
                $('#kithAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.kith.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.kith.autofill,
                    'autocheckout': true
                }
                $('#kithAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'kith': status });
        });
    });
});