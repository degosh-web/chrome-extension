chrome.storage.local.get('theme', function (mode) {
    if (mode.theme) {
        if (mode.theme == 'dark') {
            $('#switchTheme').attr('mode', 'dark');
            $('#switchTheme').html('Light theme');
            $('head').append('<link rel="stylesheet" href="darkmode.css">');
        }
    }
});

chrome.storage.local.get('license', function (key) {
    if (key.license != undefined) {
        $("#key").val(key.license.replace(/\s/g, ''));
    }
    if ($('#key').val().length) {
        fetch('https://dashboard.degosh.com/extension/enter', {
            method: 'POST',
            body: new URLSearchParams({
                key: key.license.replace(/\s/g, '')
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
            .then(res => res.json())
            .then((json) => {
                if (json.giveAccess == "Correct") {
                    window.location.href = "/options/options.html";
                } else if (json.giveAccess == "No key") {
                    iziToast.error({
                        title: `No such key on the database`,
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                } else if (json.giveAccess == "Wrong IP") {
                    iziToast.error({
                        title: `The key is binded to another IP`,
                        description: 'type !reset to the discord bot',
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                }
            }).catch(function (err) {
                console.log('Something went wrong', err);
                window.location.href = "/options/auth/auth.html";
            });
    }
});

$(document).ready(function () {

    $('span[id="lock"]').on('click', function () {
        $(this).toggleClass('unlocked');
    });

    $('span[id="lock"]').on('click', function () {
        setTimeout(() => { syncLicense(); }, 1000);
    });

    $('body').on('keypress', function (e) {
        if (e.which === 13) {
            $('span[id="lock"]').click();
        }
    });

    function syncLicense() {
        chrome.storage.local.get('license', function (key) {
            let lkey = $("#key").val().replace(/\s/g, '');
            chrome.storage.local.set({ 'license': lkey });
        });
        location.reload();
    }

});


