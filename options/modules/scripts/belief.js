chrome.storage.local.get("belief", function (data) {
    if (data.belief == undefined) {
        chrome.storage.local.set({
            'belief': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.belief.autofill == true) {
            $('#beliefAutofill').children().attr('sw', "on");
        }
    
        if (data.belief.autocheckout == true) {
            $('#beliefAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {
    $('#beliefAutofill').on('click', function () {
        chrome.storage.local.get("belief", function (data) {
            var status = new Object();

            if ($('#beliefAutofill').children().attr('sw') == "on") {
                $('#beliefAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.belief.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.belief.autocheckout
                }
                $('#beliefAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'belief': status });
        });
    });

    $('#beliefAutocheckout').on('click', function () {
        chrome.storage.local.get("belief", function (data) {
            var status = new Object();

            if ($('#beliefAutocheckout').children().attr('sw') == "on") {
                $('#beliefAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.belief.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.belief.autofill,
                    'autocheckout': true
                }
                $('#beliefAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'belief': status });
        });
    });
});