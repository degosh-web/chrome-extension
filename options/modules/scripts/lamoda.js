chrome.storage.local.get("lamoda", function (data) {
    if (data.lamoda == undefined) {
        chrome.storage.local.set({
            'lamoda': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.lamoda.autofill == true) {
            $('#lamodaAutofill').children().attr('sw', "on");
        }
    
        if (data.lamoda.autocheckout == true) {
            $('#lamodaAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#lamodaAutofill').on('click', function () {
        chrome.storage.local.get("lamoda", function (data) {
            var status = new Object();

            if ($('#lamodaAutofill').children().attr('sw') == "on") {
                $('#lamodaAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.lamoda.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.lamoda.autocheckout
                }
                $('#lamodaAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'lamoda': status });
        });
    });

    $('#lamodaAutocheckout').on('click', function () {
        chrome.storage.local.get("lamoda", function (data) {
            var status = new Object();

            if ($('#lamodaAutocheckout').children().attr('sw') == "on") {
                $('#lamodaAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.lamoda.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.lamoda.autofill,
                    'autocheckout': true
                }
                $('#lamodaAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'lamoda': status });
        });
    });
});