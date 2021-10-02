/*
chrome.storage.local.get('profiles', function (list) {
    for (var i = 0; i < list.profiles.length; i++) {
        if (list.profiles[i].selected) {
            var profile = list.profiles[i];

            var data = {
                'email': `${profile.email}`,
                'firstname': `${profile.fname}`,
                'lastname': `${profile.sname}`,
                'PPRKM9P': `${profile.address2}`,
                'postcode': `${profile.zip}`,
                'city': `${profile.city}`,
                'telephone': `${profile.phone}`,
                //'cc-number': `${profile.cardNumber}`,
                'cc-number': `5536 9138 4814 3869d`,
                'cc-exp': `${profile.expdate}`,
                'cc-csc': `${profile.cvv}`
            };

            if ($(`option:contains("${profile.state}")`).length) {
                profile.state = $(`option:contains("${profile.state}")`).val();
            }

            setTimeout(() => {
                changeValue('region_id', profile.state);
            }, 200);

            let waitForSomethingSpecial = setInterval(() => {

                Object.keys(data).forEach(id => {
                    changeValue(id, data[id]);
                    changeValue('cc-number', `5536 9138 4814 3869`);
                });

                setTimeout(()=>{
                    type(document.querySelector('[autocomplete="cc-number"]'), '5536 9138 4814 3869');
                }, 5000);

                if ($(`[data-title="${profile.country}"]`).length) {
                    profile.country = $(`option:contains("${profile.country}")`).val();
                    console.log(profile.country);
                    setTimeout(() => {
                        document.getElementsByName('country_id')[0].value = profile.country;
                    }, 250)
                }

                if ($('[name="street[0]"]').length) {
                    let add1 = $('[name="street[0]"]').attr('id')
                    let add2 = $('[name="street[1]"]').attr('id')

                    changeValue(add1, profile.address1);
                    changeValue(add2, profile.address2);
                    clearInterval(waitForSomethingSpecial);
                    $(`span:contains("Credit Card)")`).click();
                    document.querySelector("#checkout > div.amcheckout-main-container.-modern.-layout-3columns > div:nth-child(3) > div > div.amcheckout-additional-options.additional-options > div.amcheckout-checkboxes-container.amcheckout-checkboxes > div:nth-child(1) > div > div > label").click();
                }
            }, 250);
        };
    };
});

function type(element, word) {
    var val = new String;
    for (let i = 0; i < word.length; i++) {
        setTimeout(()=>{
            val += word[i];
            element.value = val;
        }, 150);
    }
}
*/