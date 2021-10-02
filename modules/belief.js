var userKey = 'unknown';

chrome.storage.local.get("license", function (key) {
    userKey = key.license;
});

var hookURL = 'unknown';
var hookRequired = false;

chrome.storage.local.get("discord", function (url) {
    if (url.discord) {
        hookURL = url.discord.link;
        if (url.discord.switcher) {
            hookRequired = true;
        }
    }
});

chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('belief', function (data) {
            if (data.belief.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true) {
                            var profile = list.profiles[i];

                            let phone = `+7(${profile.phone[0]}${profile.phone[1]}${profile.phone[2]})${profile.phone[3]}${profile.phone[4]}${profile.phone[5]}-${profile.phone[6]}${profile.phone[7]}-${profile.phone[8]}${profile.phone[9]}`

                            if (document.getElementById('client_phone')) {
                                if (document.getElementById('client_phone').value != phone) {
                                    document.getElementById('client_phone').dispatchEvent(new Event('change', { bubbles: true }))
                                    document.getElementById('client_phone').value = phone;
                                    document.getElementById('client_phone').dispatchEvent(new Event('change', { bubbles: true }))
                                    $('client_phone').val(phone);
                                }
                            }

                            var data = {
                                //'client_phone': `${phone}`,
                                'client[name]': `${profile.fname} ${profile.sname}`,
                                'client[email]': `${profile.email}`,
                                'shipping_address[address]': `${profile.address1}, ${profile.address2}, кв. ${profile.apt}`,
                                'ccnumber': `${profile.cardNumber}`,
                                'card-number': `${profile.cardNumber}`,
                                'ccnumber': `${profile.cardNumber}`,
                                'cardholder': `${profile.bname}`,
                                'expirationdate': `${profile.expdate}`,
                                'expiry-month': `${profile.expdate[0]}${profile.expdate[1]}`,
                                'expiry-year': `${profile.expdate[3]}${profile.expdate[4]}`,
                                'cvc': `${profile.cvv}`,
                                'cvv2': `${profile.cvv}`,
                                'security-code': `${profile.cvv}`
                            };


                            let waitForSomethingSpecial = setInterval(() => {
                                clearInterval(waitForSomethingSpecial);
                                Object.keys(data).forEach(id => {
                                    changeValue(id, data[id]);
                                });
                            }, 250);
                        }
                    };
                });
            }

            let success = setInterval(() => {
                let orderID = window.location.href.split('/');
                orderID = orderID[orderID.length - 2];
                if (orderID.includes('orders')) {
                    orderID = parseInt($('.co-checkout-title').text().replace(/[^a-zA-Z0-9 ]/g, ""));                    
                    chrome.storage.local.get('profiles', function (list) {
                        for (var i = 0; i < list.profiles.length; i++) {
                            if (list.profiles[i].selected == true) {
                                var profile = list.profiles[i];
                                var title = $('[data-title="Наименование"]').text();
                                new Successloghook(userKey, 'belief', title).send();
                                if (hookRequired) {
                                    new Successhook(hookURL, 'belief', title, orderID, profile.profileName).send();
                                }
                            }
                        }
                    });
                    clearInterval(success);
                }
            }, 500);


            if (data.belief.autocheckout) {
                let waitForCheckoutAB = setInterval(() => {
                    if ($('[type="submit"]').length && window.location.pathname == "/cart_items") {
                        $('[type="submit"]').click();
                        clearInterval(waitForCheckoutAB);
                    }
                }, 250);
            }

            if (data.belief.autocheckout) {
                let waitForCheckoutAB = setInterval(() => {
                    if ($('#submit').length && window.location.hostname == "pay.alfabank.ru") {
                        $('#submit').click();
                        clearInterval(waitForCheckoutAB);
                    }
                }, 250);
            }
        });
    }
});