chrome.storage.local.get("adidas", function (data) {
    if (data.adidas == undefined) {
        chrome.storage.local.set({
            'adidas': {
                '35': $('button[id="adidas35"]').attr('class'),
                '4': $('button[id="adidas4"]').attr('class'),
                '45': $('button[id="adidas45"]').attr('class'),
                '5': $('button[id="adidas5"]').attr('class'),
                '55': $('button[id="adidas55"]').attr('class'),
                '6': $('button[id="adidas6"]').attr('class'),
                '65': $('button[id="adidas65"]').attr('class'),
                '7': $('button[id="adidas7"]').attr('class'),
                '75': $('button[id="adidas75"]').attr('class'),
                '8': $('button[id="adidas8"]').attr('class'),
                '85': $('button[id="adidas85"]').attr('class'),
                '9': $('button[id="adidas9"]').attr('class'),
                '95': $('button[id="adidas95"]').attr('class'),
                '10': $('button[id="adidas10"]').attr('class'),
                '105': $('button[id="adidas105"]').attr('class'),
                '11': $('button[id="adidas11"]').attr('class'),
                '115': $('button[id="adidas115"]').attr('class'),
                '12': $('button[id="adidas12"]').attr('class'),
                '125': $('button[id="adidas125"]').attr('class'),
                '13': $('button[id="adidas13"]').attr('class'),
                '135': $('button[id="adidas135"]').attr('class'),
                '14': $('button[id="adidas14"]').attr('class'),
                '145': $('button[id="adidas145"]').attr('class'),
                '15': $('button[id="adidas15"]').attr('class'),
                '16': $('button[id="adidas16"]').attr('class'),
                '17': $('button[id="adidas17"]').attr('class'),
                '18': $('button[id="adidas18"]').attr('class'),
                '19': $('button[id="adidas19"]').attr('class'),
                'autofill': false,
                'autocheckout': false,
                'restockMode': false,
                'requestMode': false
            }
        });
    } else {
        if (data.adidas.autofill) {
            $('#adidasAutofill').children().attr('sw', "on");
        }

        if (data.adidas.autocheckout) {
            $('#adidasAutocheckout').children().attr('sw', "on");
        }

        if (data.adidas.restockMode) {
            $('#adidasRestockMode').children().attr('sw', "on");
        }

        if (data.adidas.requestMode) {
            $('#adidasRequestMode').children().attr('sw', "on");
        }

        Object.keys(data.adidas).forEach(id => {
            if (data.adidas[id] == "sizeOn") {
                $(`#adidas${id}`).attr('class', 'sizeOn');
            }
        });
    }
});

$(function () {
    $('#adidasAutofill').on('click', function () {
        chrome.storage.local.get("adidas", function (data) {
            if ($('#adidasAutofill').children().attr('sw') == "on") {
                $('#adidasAutofill').children().attr('sw', "off");
                data.adidas.autofill = false;
                chrome.storage.local.set({ 'adidas': data.adidas });
            } else {
                $('#adidasAutofill').children().attr('sw', "on");
                data.adidas.autofill = true;
                chrome.storage.local.set({ 'adidas': data.adidas });
            }
        });
    });

    $('#adidasAutocheckout').on('click', function () {
        chrome.storage.local.get("adidas", function (data) {
            if ($('#adidasAutocheckout').children().attr('sw') == "on") {
                $('#adidasAutocheckout').children().attr('sw', "off");
                data.adidas.autocheckout = false;
                chrome.storage.local.set({ 'adidas': data.adidas });
            } else {
                $('#adidasAutocheckout').children().attr('sw', "on");
                data.adidas.autocheckout = true;
                chrome.storage.local.set({ 'adidas': data.adidas });
            }
        });
    });

    $('#adidasRestockMode').on('click', function () {
        chrome.storage.local.get("adidas", function (data) {
            if ($('#adidasRestockMode').children().attr('sw') == "on") {
                $('#adidasRestockMode').children().attr('sw', "off");
                data.adidas.restockMode = false;
                chrome.storage.local.set({ 'adidas': data.adidas });
            } else {
                $('#adidasRestockMode').children().attr('sw', "on");
                data.adidas.restockMode = true;
                chrome.storage.local.set({ 'adidas': data.adidas });
            }
        });
    });

    $('#adidasRequestMode').on('click', function () {
        chrome.storage.local.get("adidas", function (data) {
            if ($('#adidasRequestMode').children().attr('sw') == "on") {
                $('#adidasRequestMode').children().attr('sw', "off");
                data.adidas.requestMode = false;
                chrome.storage.local.set({ 'adidas': data.adidas });
            } else {
                $('#adidasRequestMode').children().attr('sw', "on");
                data.adidas.requestMode = true;
                chrome.storage.local.set({ 'adidas': data.adidas });
            }
        });
    });

    $('button[size]').on('click', function () {
        if ($(this).attr('class') == "sizeOff") {
            $(this).attr('class', 'sizeOn');
        } else {
            $(this).attr('class', 'sizeOff');
        }
        getInputs();
    });

    $('#adidasSelectAll').on('click', function () {
        $('button[size]').attr('class', 'sizeOn');
        getInputs();
    });

    $('#adidasUnselectAll').on('click', function () {
        $('button[size]').attr('class', 'sizeOff');
        getInputs();
    });
});

function getInputs() {
    chrome.storage.local.get("adidas", function (data) {
        var status = {
            '35': $('button[id="adidas35"]').attr('class'),
            '4': $('button[id="adidas4"]').attr('class'),
            '45': $('button[id="adidas45"]').attr('class'),
            '5': $('button[id="adidas5"]').attr('class'),
            '55': $('button[id="adidas55"]').attr('class'),
            '6': $('button[id="adidas6"]').attr('class'),
            '65': $('button[id="adidas65"]').attr('class'),
            '7': $('button[id="adidas7"]').attr('class'),
            '75': $('button[id="adidas75"]').attr('class'),
            '8': $('button[id="adidas8"]').attr('class'),
            '85': $('button[id="adidas85"]').attr('class'),
            '9': $('button[id="adidas9"]').attr('class'),
            '95': $('button[id="adidas95"]').attr('class'),
            '10': $('button[id="adidas10"]').attr('class'),
            '105': $('button[id="adidas105"]').attr('class'),
            '11': $('button[id="adidas11"]').attr('class'),
            '115': $('button[id="adidas115"]').attr('class'),
            '12': $('button[id="adidas12"]').attr('class'),
            '125': $('button[id="adidas125"]').attr('class'),
            '13': $('button[id="adidas13"]').attr('class'),
            '135': $('button[id="adidas135"]').attr('class'),
            '14': $('button[id="adidas14"]').attr('class'),
            '145': $('button[id="adidas145"]').attr('class'),
            '15': $('button[id="adidas15"]').attr('class'),
            '16': $('button[id="adidas16"]').attr('class'),
            '17': $('button[id="adidas17"]').attr('class'),
            '18': $('button[id="adidas18"]').attr('class'),
            '19': $('button[id="adidas19"]').attr('class'),
            'autofill': data.adidas.autofill || false,
            'autocheckout': data.adidas.autocheckout || false,
            'restockMode': data.adidas.restockMode || false,
            'requestMode': data.adidas.requestMode || false
        }

        chrome.storage.local.set({ 'adidas': status });
    });
};