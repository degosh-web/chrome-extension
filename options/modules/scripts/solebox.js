//
chrome.storage.local.get("solebox", function (data) {
    if (data.solebox == undefined) {
        chrome.storage.local.set({
            'solebox': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.solebox.autofill == true) {
            $('#soleboxAutofill').children().attr('sw', "on");
        }
    
        if (data.solebox.autocheckout == true) {
            $('#soleboxAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#soleboxAutofill').on('click', function () {
        chrome.storage.local.get("solebox", function (data) {
            var status = new Object();

            if ($('#soleboxAutofill').children().attr('sw') == "on") {
                $('#soleboxAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.solebox.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.solebox.autocheckout
                }
                $('#soleboxAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'solebox': status });
        });
    });

    $('#soleboxAutocheckout').on('click', function () {
        chrome.storage.local.get("solebox", function (data) {
            var status = new Object();

            if ($('#soleboxAutocheckout').children().attr('sw') == "on") {
                $('#soleboxAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.solebox.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.solebox.autofill,
                    'autocheckout': true
                }
                $('#soleboxAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'solebox': status });
        });
    });
});