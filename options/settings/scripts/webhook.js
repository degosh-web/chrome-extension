var hookURL = '';

chrome.storage.local.get("discord", function (url) {
    if (url.discord != undefined) {
        $('#dsUrl').val(url.discord.link);
        hookURL = url.discord.link;
        if (url.discord.switcher == true) {
            $('#dshook').children().attr('sw', "on");
        }
    }
});

$(function () {
    $(document).on('change', '#dsUrl', function () {
        chrome.storage.local.get("discord", function (url) {
            var status = {
                'link': $('#dsUrl').val(),
                'switcher': false
            }
            $('#dshook').children().attr('sw', "off");
            chrome.storage.local.set({ 'discord': status });
        });
    });

    $('#dshook').on('click', function () {
        var status = new Object();

        if ($('#dshook').children().attr('sw') == "on") {
            $('#dshook').children().attr('sw', "off");
            status = {
                'link': $('#dsUrl').val(),
                'switcher': false
            }
        } else {
            status = {
                'link': $('#dsUrl').val(),
                'switcher': true
            }
            $('#dshook').children().attr('sw', "on");
            new Testhook(status.link).send();
        }
        chrome.storage.local.set({ 'discord': status });
    });
});