chrome.storage.local.get("streetbeat", function (data) {
    if (data.streetbeat == undefined) {
        chrome.storage.local.set({
            'streetbeat': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.streetbeat.autofill == true) {
            $('#streetbeatAutofill').children().attr('sw', "on");
        }

        if (data.streetbeat.autocheckout == true) {
            $('#streetbeatAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {
    $('#streetbeatAutofill').on('click', function () {
        chrome.storage.local.get("streetbeat", function (data) {
            var status = new Object();

            if ($('#streetbeatAutofill').children().attr('sw') == "on") {
                $('#streetbeatAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.streetbeat.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.streetbeat.autocheckout
                }
                $('#streetbeatAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'streetbeat': status });
        });
    });

    $('#streetbeatAutocheckout').on('click', function () {
        chrome.storage.local.get("streetbeat", function (data) {
            var status = new Object();

            if ($('#streetbeatAutocheckout').children().attr('sw') == "on") {
                $('#streetbeatAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.streetbeat.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.streetbeat.autofill,
                    'autocheckout': true
                }
                $('#streetbeatAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'streetbeat': status });
        });
    });
});