chrome.storage.local.get("yoomoney", function (data) {
    if (data.yoomoney == undefined) {
        chrome.storage.local.set({
            'yoomoney': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.yoomoney.autofill == true) {
            $('#yoomoneyAutofill').children().attr('sw', "on");
        }
    
        if (data.yoomoney.autocheckout == true) {
            $('#yoomoneyAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {
    $('#yoomoneyAutofill').on('click', function () {
        chrome.storage.local.get("yoomoney", function (data) {
            var status = new Object();

            if ($('#yoomoneyAutofill').children().attr('sw') == "on") {
                $('#yoomoneyAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.yoomoney.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.yoomoney.autocheckout
                }
                $('#yoomoneyAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'yoomoney': status });
        });
    });

    $('#yoomoneyAutocheckout').on('click', function () {
        chrome.storage.local.get("yoomoney", function (data) {
            var status = new Object();

            if ($('#yoomoneyAutocheckout').children().attr('sw') == "on") {
                $('#yoomoneyAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.yoomoney.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.yoomoney.autofill,
                    'autocheckout': true
                }
                $('#yoomoneyAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'yoomoney': status });
        });
    });
});