chrome.storage.local.get("solana", function (data) {
    if (data.solana == undefined) {
        chrome.storage.local.set({
            'solana': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.solana.autofill == true) {
            $('#solanaAutofill').children().attr('sw', "on");
        }
    
        if (data.solana.autocheckout == true) {
            $('#solanaAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#solanaAutofill').on('click', function () {
        chrome.storage.local.get("solana", function (data) {
            var status = new Object();

            if ($('#solanaAutofill').children().attr('sw') == "on") {
                $('#solanaAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.solana.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.solana.autocheckout
                }
                $('#solanaAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'solana': status });
        });
    });

    $('#solanaAutocheckout').on('click', function () {
        chrome.storage.local.get("solana", function (data) {
            var status = new Object();

            if ($('#solanaAutocheckout').children().attr('sw') == "on") {
                $('#solanaAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.solana.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.solana.autofill,
                    'autocheckout': true
                }
                $('#solanaAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'solana': status });
        });
    });
});