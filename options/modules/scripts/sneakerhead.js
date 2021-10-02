chrome.storage.local.get("sneakerhead", function (data) {
    if (data.sneakerhead == undefined) {
        chrome.storage.local.set({
            'sneakerhead': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.sneakerhead.autofill == true) {
            $('#sneakerheadAutofill').children().attr('sw', "on");
        }
    
        if (data.sneakerhead.autocheckout == true) {
            $('#sneakerheadAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#sneakerheadAutofill').on('click', function () {
        chrome.storage.local.get("sneakerhead", function (data) {
            var status = new Object();

            if ($('#sneakerheadAutofill').children().attr('sw') == "on") {
                $('#sneakerheadAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.sneakerhead.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.sneakerhead.autocheckout
                }
                $('#sneakerheadAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'sneakerhead': status });
        });
    });

    $('#sneakerheadAutocheckout').on('click', function () {
        chrome.storage.local.get("sneakerhead", function (data) {
            var status = new Object();

            if ($('#sneakerheadAutocheckout').children().attr('sw') == "on") {
                $('#sneakerheadAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.sneakerhead.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.sneakerhead.autofill,
                    'autocheckout': true
                }
                $('#sneakerheadAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'sneakerhead': status });
        });
    });
});