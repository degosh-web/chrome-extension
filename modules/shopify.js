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
        chrome.storage.local.get('shopify', function (data) {
            if (data.shopify.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected) {
                            if (data.shopify['autofill'] == true) {
                                var profile = list.profiles[i];

                                let fields = {
                                    'checkout_shipping_address_first_name': profile.fname,
                                    'checkout_shipping_address_last_name': profile.sname,
                                    'checkout_shipping_address_address1': profile.address1,
                                    'checkout_shipping_address_address2': profile.address2,
                                    'checkout_shipping_address_city': profile.city,
                                    'checkout_shipping_address_zip': profile.zip,
                                    'checkout_shipping_address_phone': profile.phone,
                                    'checkout_billing_address_first_name': profile.fname,
                                    'checkout_billing_address_last_name': profile.sname,
                                    'checkout_billing_address_address1': profile.address1,
                                    'checkout_billing_address_address2': profile.address2,
                                    'checkout_billing_address_city': profile.city,
                                    'checkout_billing_address_zip': profile.zip,
                                    'checkout_billing_address_phone': profile.phone,
                                    'cc-name': profile.bname,
                                    'cc-number': profile.cardNumber,
                                    'cc-exp': profile.expdate,
                                    'cc-csc': profile.cvv,
                                    'checkout[email_or_phone]': profile.email,
                                    'checkout[email]': profile.email,
                                    'checkout_email': profile.email,
                                    'checkout_email_or_phone': profile.email,
                                    'checkout_shipping_address_country': profile.country,
                                    'checkout_billing_address_country': profile.country
                                }

                                Object.keys(fields).forEach(id => {
                                    changeValue(id, fields[id]);
                                });

                                fillFieldS('#checkout_shipping_address_country', profile.country);
                                fillFieldS('#checkout_billing_address_country', profile.country);

                                if ($(`option:contains("${profile.state}")`).length) {
                                    profile.state = $(`option:contains("${profile.state}")`).val();
                                }

                                fillFieldS('#checkout_shipping_address_province', profile.state);
                                fillFieldS('#checkout_billing_address_province', profile.state);

                            }

                            let success = setInterval(() => {
                                if ($('.os-order-number').length && $(`h2:contains("Thank you")`)) {
                                    clearInterval(success);

                                    let orderID = $('.os-order-number').text().split("#")[1];
                                    var product = $('.product__description').children().text();
                                    var pic = "https:" + $('[class="product-thumbnail__image"]').attr('src');

                                    new Successloghook(userKey, 'shopify', product, pic).send();

                                    console.log(pic);
                                    new Successhook(hookURL, 'shopify', product, orderID, profile.profileName, pic).send();
                                    if (hookRequired) {
                                    }
                                    //sendWebhook('shopify', profile, orderID);
                                    clearInterval(success);
                                }
                            }, 500);
                        }
                    }
                });
            }

            if (data.shopify.autocheckout) {
                let waitForCheckoutS = setInterval(() => {
                    if ($('[type="submit"]').length) {
                        $('[type="submit"]').click();
                    };
                    clearInterval(waitForCheckoutS)
                }, 250);
            }
        });

        function fillFieldS(id, value) {
            $(`${id}`).val("");
            let element = document.querySelector(id);

            if (element) {
                element.focus();
                element.dispatchEvent(new Event('focus'));
                element.value = value;
                element.dispatchEvent(new Event('change', { bubbles: true }));
                element.blur()
                element.dispatchEvent(new Event('blur'));
            }
        }
    }
});