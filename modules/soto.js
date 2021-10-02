chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('soto', function (data) {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (list.profiles[i].selected == true && data.soto['autofill'] == true) {
                        var profile = list.profiles[i];

                        let fields1 = {
                            "email-address-input": profile.email,
                            "first-name-input": profile.fname,
                            "last-name-input": profile.sname,
                            "address-line-2-input": profile.address1 + ' ' + profile.address2,
                            "address-line-3-input": profile.address2,
                            "postal-code-input": profile.zip,
                            "city-input": profile.zip,
                            "phone-number-input": profile.phone
                        };

                        let wait1 = setInterval(() => {
                            if (document.getElementsByClassName('payment method is-selected first')[0] ||
                                document.getElementsByClassName('payment method first')[0]) {
                                clearInterval(wait1);
                                document.getElementsByClassName('payment method is-selected first')[0].click();
                                document.getElementsByClassName('payment method first')[0].click();

                                if ($(`option:contains("${profile.country}")`).length) {
                                    profile.country = $(`option:contains("${profile.country}")`).val();
                                }

                                document.getElementsByName('country')[0].value = profile.country;

                            }
                        }, 500);

                        let wait2 = setInterval(() => {
                            if (document.getElementById('email-address-input')) {
                                clearInterval(wait2);

                                Object.keys(fields1).forEach(id => {
                                    change(id, fields1[id]);
                                });
                                document.getElementById('terms-disclaimer').click();
                            }
                        }, 500);

                        let wait3 = setInterval(() => {
                            if ($('button[type="submit"]') && data.soto['autocheckout'] == true) {
                                clearInterval(wait3);

                                $('button[type="submit"]').click();
                            }
                        }, 1500);

                        let waitPayFill = setInterval(() => {
                            if (document.getElementById("card.cardNumber")) {
                                clearInterval(waitPayFill);

                                change("card.cardNumber", profile.cardNumber);
                                change("card.cardHolderName", profile.fname + ' ' + profile.sname);
                                change("card.cvcCode", profile.cvv);
                                change("card.expiryMonth", profile.expdate[0] + profile.expdate[1]);
                                change("card.expiryYear", parseInt("20" + profile.expdate[3] + profile.expdate[4]));
                            }
                        }, 500)

                        let waitPayBtn = setInterval(() => {
                            if ($('input[type="submit"]') && data.soto['autocheckout'] == true) {
                                clearInterval(waitPayBtn);

                                $('input[type="submit"]').click();
                                $('input[type="submit"]').click();
                            }
                        }, 1000);

                    }
                };
            });
        });

        const change = (el, value) => {

            var event = new Event('change', { bubbles: true });
            var evnt = new Event('focus');
            var evt = new Event('blur');

            if (document.getElementById(el)) {
                var element = document.getElementById(el);

                if (element) {
                    element.value = value;
                    //element.val(value);
                    element.dispatchEvent(event);
                    element.focus();
                    element.dispatchEvent(evnt);
                    element.blur();
                    element.dispatchEvent(evt);
                }
            }
        }
    }
});