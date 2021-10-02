chrome.storage.local.get("naked", function (data) {
    if (data.naked == undefined) {
        chrome.storage.local.set({
            'naked': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.naked.autofill == true) {
            $('#nakedAutofill').children().attr('sw', "on");
        }
    
        if (data.naked.autocheckout == true) {
            $('#nakedAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#nakedAutofill').on('click', function () {
        chrome.storage.local.get("naked", function (data) {
            var status = new Object();

            if ($('#nakedAutofill').children().attr('sw') == "on") {
                $('#nakedAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.naked.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.naked.autocheckout
                }
                $('#nakedAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'naked': status });
        });
    });

    $('#nakedAutocheckout').on('click', function () {
        chrome.storage.local.get("naked", function (data) {
            var status = new Object();

            if ($('#nakedAutocheckout').children().attr('sw') == "on") {
                $('#nakedAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.naked.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.naked.autofill,
                    'autocheckout': true
                }
                $('#nakedAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'naked': status });
        });
    });
});