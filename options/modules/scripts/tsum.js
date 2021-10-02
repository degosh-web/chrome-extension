chrome.storage.local.get("tsum", function (data) {
    if (data.tsum == undefined) {
        chrome.storage.local.set({
            'tsum': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.tsum.autofill == true) {
            $('#tsumAutofill').children().attr('sw', "on");
        }
    
        if (data.tsum.autocheckout == true) {
            $('#tsumAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#tsumAutofill').on('click', function () {
        chrome.storage.local.get("tsum", function (data) {
            var status = new Object();

            if ($('#tsumAutofill').children().attr('sw') == "on") {
                $('#tsumAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.tsum.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.tsum.autocheckout
                }
                $('#tsumAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'tsum': status });
        });
    });

    $('#tsumAutocheckout').on('click', function () {
        chrome.storage.local.get("tsum", function (data) {
            var status = new Object();

            if ($('#tsumAutocheckout').children().attr('sw') == "on") {
                $('#tsumAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.tsum.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.tsum.autofill,
                    'autocheckout': true
                }
                $('#tsumAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'tsum': status });
        });
    });
});