const countries = chrome.runtime.getURL('../../additional/countries.json');
const testProfile = { 'fname': "Name", 'sname': "Surname", 'email': "test@example.com", 'phone': "9123456789", 'country': "Russia", 'state': "Moscow", 'city': "Moscow", 'zip': "125310", 'address1': "Polanka St., 25", 'address2': "entrance 2", 'apt': "75", 'cardNumber': "4242 4242 4242 4242", 'expdate': "02/30", 'cvv': "123", 'bname': "Ryan Li", 'profileName': "Test", 'selected': false };
var profile = { 'fname': null, 'sname': null, 'email': null, 'phone': null, 'country': null, 'state': null, 'city': null, 'zip': null, 'address1': null, 'address2': null, 'apt': null, 'cardNumber': null, 'expdate': null, 'cvv': null, 'bname': null, 'profileName': null, 'selected': null };

$(function () {
    $('.contentConstructor').hide();
    $('#goBackBtn').hide();

    $('#createProfile').on('click', function () {
        $('.contentProfilesList').hide();
        $('.contentConstructor').show();
        $('#createProfile').hide();
        $('#goBackBtn').show();
    });

    $('#goBackBtn').on('click', function () {
        $('.contentProfilesList').show();
        $('.contentConstructor').hide();
        $('#createProfile').show();
        $('#goBackBtn').hide();
    })
});

$(function () {
    showProfiles();

    fetch(countries)
        .then((response) => response.json())
        .then(json => {
            let countriesList = document.getElementById('countryList');
            for (var i = 0; i < json.length; i++) {
                countriesList.insertAdjacentHTML('beforeend',
                    `<option value="${json[i].country}">`
                );
            }
        });
});

function showProfiles() {
    chrome.storage.local.get('profiles', function (list) {
        if (!list.profiles) {
            chrome.storage.local.set({ 'profiles': new Array() });
        } else {
            for (let i = 0; i < list.profiles.length; i++) {
                pushProfile(list.profiles[i]);
            }
        }
    });
}

$(function () {
    $('#go').on('click', function () {

        if ($('#profileName').val().length) {
            Object.keys(profile).forEach(id => {
                profile[id] = $(`#${id}`).val();
            });

            let unique = true;

            chrome.storage.local.get('profiles', function (list) {
                for (let i = 0; i < list.profiles.length; i++) {
                    if ((list.profiles[i])['profileName'] == profile['profileName']) {
                        unique = false;
                    }
                }
            });

            setTimeout(function () {
                if (unique) {
                    pushProfile(profile);
                    createProfile(profile);
                    //chooseGenerate();
                } else {
                    rewriteProfile(profile);
                }
            }, 250);
        } else {
            iziProfileNameError()
        }
    });

    $('#test').on('click', function () {
        Object.keys(testProfile).forEach(id => {
            $(`#${id}`).val(testProfile[id]).trigger('change', { bubble: true });
        });
        $('#state').val(testProfile.state).trigger('change', { bubble: true });;
    });

    $('#clear').on('click', function () {
        Object.keys(testProfile).forEach(id => {
            $(`#${id}`).val("").trigger('change', { bubble: true });
        });
    });

    $('input[id="fname"]').on('input', function () {
        if ($('input[id="fname"]').length) {
            $('input[id="bname"]').val($('input[id="fname"]').val());
        }

        if ($('input[id="sname"]').length) {
            let bubble = $('input[id="fname"]').val() + " " + $('input[id="sname"]').val()
            $('input[id="bname"]').val(bubble);
        }
    });

    $('input[id="sname"]').on('input', function () {
        if ($('input[id="sname"]').length) {
            let bubble = $('input[id="fname"]').val() + " " + $('input[id="sname"]').val()
            $('input[id="bname"]').val(bubble);
        }
    });

    document.getElementById('phone').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1').trim();
    });

    document.getElementById('cardNumber').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    document.getElementById('expdate').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '').trim();
    });

    document.getElementById('cvv').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').trim();
    });
});

function pushProfile(newProfile) {
    let { profileName, country, cardNumber, email } = newProfile;
    let cardEnding = cardNumber[15] + cardNumber[16] + cardNumber[17] + cardNumber[18];
    var profilesPlace = document.getElementById("profilesListPlace");

    if (!cardNumber.length) {
        cardEnding = "No"
    }

    if (!country.length) {
        country = "No"
    }

    if (!email.length) {
        email = "No"
    }

    let shortcutProfileName = profileName;

    if (profileName.length >= 12) {
        shortcutProfileName = new String;
        for (let i = 0; i < 12; i++) {
            if (profileName[i]) {
                shortcutProfileName += profileName[i];
            }
        }
        shortcutProfileName += "..."
    }

    profilesPlace.insertAdjacentHTML('beforeend', `
            <div id="degosh${profileName}" class="profile">
                <a>${shortcutProfileName}</a>
                <a class="showExtra">${country}</a>
                <a class="showExtra">${cardEnding}</a>
                <a class="showExtra">${email}</a>
                <img id="degosh${profileName}" class="edit">
                <img id="degosh${profileName}" class="trash">
            </div>
        `);

    $('.edit').on('click', function () {
        var remote = $(this).attr('id');
        setTimeout(function () {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (remote == "degosh" + list.profiles[i].profileName) {
                        readProfile(list.profiles[i]);
                    }
                }
            });
        }, 100);
    });

    
    $('.trash').on('click', function () {
        var remote = $(this).attr('id');
        setTimeout(function () {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if ("degosh" + list.profiles[i].profileName == remote) {
                        let that = 'degosh' + list.profiles[i].profileName;
                        $(`#${that}`).attr('style', 'display: none');
                        list.profiles.splice(i, 1);
                    }
                }
                chrome.storage.local.set({ 'profiles': list.profiles });
            });
        }, 100);
    });
}

function createProfile(newProfile) {
    chrome.storage.local.get('profiles', function (list) {
        list.profiles.push(newProfile)
        iziProfileAdded(newProfile.profileName);
        chrome.storage.local.set({ 'profiles': list.profiles });
        console.log(list.profiles)
    });
}

function readProfile(profile) {
    Object.keys(profile).forEach(id => {
        $(`#${id}`).val(profile[id]);
    });
    $('#createProfile').click();
}

function rewriteProfile(profile) {
    chrome.storage.local.get('profiles', function (list) {
        for (let i = 0; i < list.profiles.length; i++) {
            if ((list.profiles[i])['profileName'] == profile['profileName']) {
                list.profiles[i] = profile;
                chrome.storage.local.set({ 'profiles': list.profiles });
            }
        }
    });
    iziProfileEdited(profile.profileName);
}

function iziProfileAdded(profileName) {
    iziToast.success({
        title: `${profileName}`,
        message: `Profile created!`,
        position: 'topCenter',
        backgroundColor: '#C7AEFC',
        icon: '',
        titleColor: 'white',
        messageColor: 'white',
        timeout: 2500
    });
}

function iziProfileEdited(profileName) {
    iziToast.success({
        title: `${profileName}`,
        message: `Profile edited!`,
        position: 'topCenter',
        backgroundColor: '#C7AEFC',
        icon: '',
        titleColor: 'white',
        messageColor: 'white',
        timeout: 2500
    });
}

function iziProfileNameError() {
    iziToast.error({
        title: `Profile name is requied!`,
        backgroundColor: 'red',
        position: 'topCenter',
        icon: '',
        titleColor: 'white',
        timeout: 2500
    });
}

function iziProfileNameError() {
    iziToast.error({
        title: `Profile name is requied!`,
        backgroundColor: 'red',
        position: 'topCenter',
        icon: '',
        titleColor: 'white',
        timeout: 2500
    });
}