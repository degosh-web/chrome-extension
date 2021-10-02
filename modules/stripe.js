chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('stripe', function (data) {
            if (data.stripe.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected) {
                            var profile = list.profiles[i];

                            var data = {
                                'Name': `${profile.fname} ${profile.sname}`,
                                'name': `${profile.fname} ${profile.sname}`,
                                'billingName': `${profile.fname} ${profile.sname}`,
                                'email': `${profile.email}`,
                                'Email': `${profile.email}`,
                                'tel': `${profile.phone}`,
                                'Address': `${profile.address1} ${profile.address2}`,
                                'address-line1': `${profile.address1}`,
                                'billingAddressLine1': `${profile.address1}`,
                                'address-level1': `${profile.zip}`,
                                'address-level2': `${profile.city}`,
                                'billingLocality': `${profile.city}`,
                                'shipping-city': `${profile.city}`,
                                'billingAddressLine2': `${profile.address2}`,
                                'billingCountry': `${profile.country}`,
                                'state': profile.state[0] + profile.state[1],
                                'address-level1': profile.state[0] + profile.state[1],
                                'postal-code': `${profile.zip}`,
                                'billingPostalCode': `${profile.zip}`,
                                'zip': `${profile.zip}`,
                                'ZIP': `${profile.zip}`,
                                'cardNumber': `${profile.cardNumber}`,
                                'cardnumber': `${profile.cardNumber}`,
                                'card_number': `${profile.cardNumber}`,
                                'exp-date': `${profile.expdate}`,
                                'cardExpiry': `${profile.expdate}`,
                                'cvc': `${profile.cvv}`,
                                'cc-csc': `${profile.cvv}`,
                                'cardCvc': `${profile.cvv}`,
                                'cc-exp': `${profile.expdate[0]}${profile.expdate[1]}${profile.expdate[3]}${profile.expdate[4]}`,
                                'postal': `${profile.zip}`
                            };

                            let waitForSomethingSpecial = setInterval(() => {
                                Object.keys(data).forEach(id => {
                                    changeValue(id, data[id]);
                                });

                                if ($(`option:contains("${profile.country}")`).length) {
                                    option = $(`option:contains("${profile.country}")`).val();
                                    $('#billingCountry').val(option);
                                    $('#shipping-country').val(option);
                                }
                            }, 250);

                        }
                    };
                });
            }

            if (data.stripe.autocheckout) {
                let waitForCheckoutAB = setInterval(() => {
                    if ($('[class*=SubmitButton]').length) {
                        $('[class*=SubmitButton]').click();
                    };
                }, 250);
            }

            if (data.stripe.autocheckout) {
                let waitForCheckoutAB = setInterval(() => {
                    if ($('button:contains("Pay")').length) {
                        $('button:contains("Pay")').click();
                    };
                    if ($('button:contains("Donate")').length) {
                        $('button:contains("Donate")').click();
                    };
                }, 250);
            }
        });
    }
});