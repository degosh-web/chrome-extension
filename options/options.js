checkKey();

$(function () {

    $('#profilesLink').on('click', function () {
        swipe(this);
    });

    $('#modulesLink').on('click', function () {
        swipe(this);
    });

    $('#customLink').on('click', function () {
        swipe(this);
    });

    $('#settingsLink').on('click', function () {
        swipe(this);
    });

    chrome.storage.local.get('spa', function (item) {
        if (item.spa != undefined) {
            $(`#${item.spa}`).click();
        }
    });
});

function swipe(that) {
    $('[nav]').removeAttr('class');
    $(that).attr('class', 'selectedBar');
    let currentTab = ($(that).attr('id')).split('Link')[0];
    $('.content').attr('style', 'display: none');
    $(`#${currentTab}`).attr('style', 'display: flex');
    chrome.storage.local.set({ 'spa': that.id });
}

function checkKey() {
    chrome.storage.local.get('license', function (key) {
        if (key.license) {
            fetch('https://dashboard.degosh.com/extension/enter', {
                method: 'POST',
                body: new URLSearchParams({
                    key: key.license.replace(/\s/g, '')
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
                .then(res => res.json())
                .then((json) => {
                    if (json.giveAccess == "Wrong IP" || json.giveAccess == "No key") {
                        window.location.href = "/options/auth/auth.html";
                    }
                }).catch(function (err) {
                    console.log('Something went wrong', err);
                    window.location.href = "/options/auth/auth.html";
                });
        } else {
            window.location.href = "/options/auth/auth.html";
        }
    });
}