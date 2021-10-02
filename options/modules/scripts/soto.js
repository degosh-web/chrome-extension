chrome.storage.local.get("soto", function (data) {
    if (data.soto == undefined) {
        chrome.storage.local.set({
            'soto': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.soto.autofill == true) {
            $('#sotoAutofill').children().attr('sw', "on");
        }
    
        if (data.soto.autocheckout == true) {
            $('#sotoAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#sotoAutofill').on('click', function () {
        chrome.storage.local.get("soto", function (data) {
            var status = new Object();

            if ($('#sotoAutofill').children().attr('sw') == "on") {
                $('#sotoAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.soto.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.soto.autocheckout
                }
                $('#sotoAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'soto': status });
        });
    });

    $('#sotoAutocheckout').on('click', function () {
        chrome.storage.local.get("soto", function (data) {
            var status = new Object();

            if ($('#sotoAutocheckout').children().attr('sw') == "on") {
                $('#sotoAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.soto.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.soto.autofill,
                    'autocheckout': true
                }
                $('#sotoAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'soto': status });
        });
    });
});