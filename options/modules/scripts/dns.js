chrome.storage.local.get("dns", function (data) {
    if (data.dns == undefined) {
        chrome.storage.local.set({
            'dns': {
                'autofill': false,
                'autocheckout': false
            }
        });
    } else {
        if (data.dns.autofill == true) {
            $('#dnsAutofill').children().attr('sw', "on");
        }
    
        if (data.dns.autocheckout == true) {
            $('#dnsAutocheckout').children().attr('sw', "on");
        }
    }
});

$(function () {

    $('#dnsAutofill').on('click', function () {
        chrome.storage.local.get("dns", function (data) {
            var status = new Object();

            if ($('#dnsAutofill').children().attr('sw') == "on") {
                $('#dnsAutofill').children().attr('sw', "off");
                status = {
                    'autofill': false,
                    'autocheckout': data.dns.autocheckout
                }
            } else {
                status = {
                    'autofill': true,
                    'autocheckout': data.dns.autocheckout
                }
                $('#dnsAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'dns': status });
        });
    });

    $('#dnsAutocheckout').on('click', function () {
        chrome.storage.local.get("dns", function (data) {
            var status = new Object();

            if ($('#dnsAutocheckout').children().attr('sw') == "on") {
                $('#dnsAutocheckout').children().attr('sw', "off");
                status = {
                    'autofill': data.dns.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'autofill': data.dns.autofill,
                    'autocheckout': true
                }
                $('#dnsAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'dns': status });
        });
    });
});