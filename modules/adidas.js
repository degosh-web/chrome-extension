var atc = getSizes();

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

//Array shuffling func
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

//check if global switcher turned on
chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        //Waiting for passing queue, then by chrome extension API sending spechial message to background.js to make focus on current google chrome window
        //Then starting autocart (by requests)
        let waitForSizes = setInterval(() => {
            if ($('[data-auto-id="text-yeezy-header"]').text().includes('Поздравляем')) {
                clearInterval(waitForSizes);

                chrome.runtime.sendMessage({
                    type: "notification", options: {
                        type: "basic",
                        iconUrl: chrome.extension.getURL("icon128.png"),
                        title: "Test",
                        message: "Test"
                    }
                });

                iziToast.success({
                    title: `Getting sizes`,
                    description: 'Adidas Request Mode',
                    backgroundColor: 'orange',
                    position: 'topCenter',
                    icon: '',
                    titleColor: 'white',
                    timeout: 3500
                });

                fetch(`https://www.adidas.ru/api/products/${window.location.pathname.split('/')[3]}/availability`, {
                    "headers": {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin"
                    },
                    "referrer": "https://www.adidas.ru/yeezy/product/GZ0717",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Something went wrong');
                        }
                    })
                    .catch((error) => {
                        iziToast.success({
                            title: `Can't get sizes`,
                            description: 'Adidas Request Mode',
                            backgroundColor: 'red',
                            position: 'topCenter',
                            icon: '',
                            titleColor: 'white',
                            timeout: 3500
                        });
                    })
                    .then(data => data.variation_list)
                    .then(sizes => {
                        iziToast.success({
                            title: `Size selection`,
                            description: 'Adidas Request Mode',
                            backgroundColor: 'orange',
                            position: 'topCenter',
                            icon: '',
                            titleColor: 'white',
                            timeout: 3500
                        });

                        //Finding matching sizes 
                        var found = false;
                        var i = 0;
                        sizes = shuffle(sizes);

                        while (!found && i < sizes.length) {
                            var line = sizes[i];
                            i++;
                            if (line.availability_status != "NOT_AVAILABLE" && atc.includes(parseInt(line.size).toString())) {
                                found = true;
                                fetch("https://www.adidas.ru/api/checkout/baskets/-/items", {
                                    "headers": {
                                        "accept": "application/json, text/plain, */*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/json;charset=UTF-8",
                                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin"
                                    },
                                    "referrer": `https://www.adidas.ru/yeezy/product/${window.location.pathname.split('/')[3]}`,
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": '[{"captchaResponse":"","display_size":\"' + line.size + '\", "productId":\"' + line.sku + '\","product_id":\"' + window.location.pathname.split('/')[3] + '\","product_variation_sku":\"' + line.sku + '\","quantity":1,"size":\"' + line.size + '\"}]',
                                    "method": "POST",
                                    "mode": "cors",
                                    "credentials": "include"
                                }).then((response) => {
                                    if (response.status == 200) {
                                        iziToast.success({
                                            title: `Added to cart`,
                                            description: 'Adidas Request Mode',
                                            backgroundColor: 'green',
                                            position: 'topCenter',
                                            icon: '',
                                            titleColor: 'white',
                                            timeout: 3500
                                        });

                                        window.location = "https://www.adidas.ru/cart";
                                    } else {
                                        location.reload();
                                    }
                                })
                            }
                        }
                        if (!found) {
                            iziToast.success({
                                title: `bad sizes :(`,
                                description: 'Adidas Request Mode',
                                backgroundColor: 'red',
                                position: 'topCenter',
                                icon: '',
                                titleColor: 'white',
                                timeout: 3500
                            });
                        }
                    })
            };
        }, 250);

        //Request checkout
        chrome.storage.local.get('adidas', function (data) {
            if (data.adidas.requestMode) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true) {
                            var profile = list.profiles[i];
                            var num = '+7(' + profile.phone[0] + profile.phone[1] + profile.phone[2] + ')' + profile.phone[3] + profile.phone[4] + profile.phone[5] + '-' + profile.phone[6] + profile.phone[7] + '-' + profile.phone[8] + profile.phone[9];

                            var h = profile.address1.match(/\d+/);
                            if (profile.address1.includes('(')) {
                                house = profile.address1.match(/\(([^)]+)\)/)[1];
                                h = profile.address1.split('(')[0];
                            }

                            if (profile.address1.includes('(')) {
                                h = profile.address1.match(/\(([^)]+)\)/)[1];
                                profile.address1 = profile.address1.split('(')[0];
                            }

                            let req = setInterval(function () {
                                if (window.location.pathname == '/cart' || $('[data-auto-id="glass-checkout-button-right-side"]').length) {
                                    clearInterval(req)
                                    $(function () {
                                        let bid = localStorage.getItem('basketId');
                                        let jwt = localStorage.getItem('jwtToken');

                                        iziToast.success({
                                            title: `Searching for basketID`,
                                            description: 'Adidas Request Mode',
                                            backgroundColor: 'orange',
                                            position: 'topCenter',
                                            icon: '',
                                            titleColor: 'white',
                                            timeout: 3500
                                        });

                                        iziToast.success({
                                            title: `Filling delivery`,
                                            description: 'Adidas Request Mode',
                                            backgroundColor: 'orange',
                                            position: 'topCenter',
                                            icon: '',
                                            titleColor: 'white',
                                            timeout: 3500
                                        });

                                        fetch(`https://www.adidas.ru/api/chk/baskets/${bid}`, {
                                            "headers": {
                                                "accept": "*/*",
                                                "accept-language": "en-US,en;q=0.9",
                                                "checkout-authorization": jwt,
                                                "content-type": "application/json",
                                                "glassversion": "6d93aba",
                                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                "sec-ch-ua-mobile": "?0",
                                                "sec-fetch-dest": "empty",
                                                "sec-fetch-mode": "cors",
                                                "sec-fetch-site": "same-origin",
                                                "x-instana-l": "1,correlationType=web;correlationId=23cf4ad2c2fca899",
                                                "x-instana-s": "23cf4ad2c2fca899",
                                                "x-instana-t": "23cf4ad2c2fca899"
                                            },
                                            "referrer": "https://www.adidas.ru/delivery",
                                            "referrerPolicy": "strict-origin-when-cross-origin",
                                            "body": '{\"customer\":{\"email\":\"' + profile.email + '\",\"receiveSmsUpdates\":false},\"shippingAddress\":{\"emailAddress\":\"' + profile.email + '\",\"country\":\"RU\",\"firstName\":\"' + profile.fname + '\",\"lastName\":\"' + profile.sname + '\",\"city\":\"' + profile.city + '\",\"zipcode\":\"' + profile.zip + '\",\"address1\":\"' + profile.address1 + '\",\"houseNumber\":\"' + h + '\",\"phoneNumber\":\"' + num + '\"},\"billingAddress\":{\"emailAddress\":\"' + profile.email + '\",\"country\":\"RU\",\"firstName\":\"' + profile.fname + '\",\"lastName\":\"' + profile.sname + '\",\"city\":\"' + profile.city + '\",\"zipcode\":\"' + profile.zip + '\",\"address1\":\"' + profile.address1 + '\",\"houseNumber\":\"' + h + '\",\"phoneNumber\":\"' + num + '\"},\"newsletterSubscription\":false,\"consentVersion\":\"ADI_VER_20191007_RU_RU\",\"methodList\":[{\"id\":\"Standard-RU-399\",\"shipmentId\":\"me\",\"carrierCode\":\"CDEK\",\"carrierServiceCode\":\"CDE000RU3680000018\",\"shipNode\":\"3610\",\"collectionPeriod\":\"2021-09-12T21:30:00.000Z,2021-09-12T21:30:00.000Z\",\"deliveryPeriod\":\"2021-09-13T09:00:00.000Z,2021-09-13T18:00:00.000Z\"}]}',
                                            "method": "PATCH",
                                            "mode": "cors",
                                            "credentials": "include"
                                        })
                                            .then(() => {
                                                iziToast.success({
                                                    title: `Confirming delivery`,
                                                    description: 'Adidas Request Mode',
                                                    backgroundColor: 'orange',
                                                    position: 'topCenter',
                                                    icon: '',
                                                    titleColor: 'white',
                                                    timeout: 3500
                                                });

                                                fetch("https://www.adidas.ru/api/chk/customer/baskets", {
                                                    "headers": {
                                                        "accept": "*/*",
                                                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                                                        "checkout-authorization": jwt,
                                                        "content-type": "application/json",
                                                        "glassversion": "e59d7e3",
                                                        "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
                                                        "sec-ch-ua-mobile": "?0",
                                                        "sec-ch-ua-platform": "\"macOS\"",
                                                        "sec-fetch-dest": "empty",
                                                        "sec-fetch-mode": "cors",
                                                        "sec-fetch-site": "same-origin",
                                                        "x-instana-l": "1,correlationType=web;correlationId=7c1a67daddc054d2",
                                                        "x-instana-s": "7c1a67daddc054d2",
                                                        "x-instana-t": "7c1a67daddc054d2"
                                                    },
                                                    "referrer": "https://www.adidas.ru/delivery",
                                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                                    "body": null,
                                                    "method": "GET",
                                                    "mode": "cors",
                                                    "credentials": "include"
                                                });
                                            })
                                            .then(() => {
                                                iziToast.success({
                                                    title: `Creating payment window`,
                                                    description: 'Adidas Request Mode',
                                                    backgroundColor: 'orange',
                                                    position: 'topCenter',
                                                    icon: '',
                                                    titleColor: 'white',
                                                    timeout: 3500
                                                });

                                                fetch(`https://www.adidas.ru/api/chk/baskets/${bid}/payment_methods`, {
                                                    "headers": {
                                                        "accept": "*/*",
                                                        "accept-language": "en-US,en;q=0.9",
                                                        "checkout-authorization": jwt,
                                                        "content-type": "application/json",
                                                        "glassversion": "6d93aba",
                                                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                        "sec-ch-ua-mobile": "?0",
                                                        "sec-fetch-dest": "empty",
                                                        "sec-fetch-mode": "cors",
                                                        "sec-fetch-site": "same-origin",
                                                        "x-instana-l": "1,correlationType=web;correlationId=282fc7fdb83b090",
                                                        "x-instana-s": "282fc7fdb83b090",
                                                        "x-instana-t": "282fc7fdb83b090"
                                                    },
                                                    "referrer": "https://www.adidas.ru/payment",
                                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                                    "body": null,
                                                    "method": "GET",
                                                    "mode": "cors",
                                                    "credentials": "include"
                                                }).then(response => {
                                                    iziToast.success({
                                                        title: `Done`,
                                                        description: 'Adidas Request Mode',
                                                        backgroundColor: 'green',
                                                        position: 'topCenter',
                                                        icon: '',
                                                        titleColor: 'white',
                                                        timeout: 3500
                                                    });

                                                    window.location = "https://www.adidas.ru/payment";
                                                }, 250);
                                            })
                                    });
                                };
                            }, 250);
                        }
                    }
                })
            }
        });
    }
});

chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        const changeValueAdi = (element, value) => {
            var event = new Event('change', { bubbles: true });
            var evnt = new Event('focus');
            var evt = new Event('blur');
            if (element) {
                if (element.value != undefined) {
                    element.value = value;
                    element.dispatchEvent(event);
                    element.focus();
                    element.dispatchEvent(evnt);
                    element.blur();
                    element.dispatchEvent(evt);
                }
            }
        }

        let success = setInterval(() => {
            let orderID = window.location.href.split('/');
            orderID = orderID[orderID.length - 1];
            if ((orderID.includes('?orderId') || orderID.includes('order')) && (orderID.includes('confirmation') || orderID.includes('&async'))) {
                orderID = orderID.split('=');
                orderID = orderID[1];

                if (orderID.includes('&')) {
                    orderID = orderID.split('&')[0];
                }

                setTimeout(() => {
                    chrome.storage.local.get('profiles', function (list) {
                        for (var i = 0; i < list.profiles.length; i++) {
                            if (list.profiles[i].selected == true) {
                                var profile = list.profiles[i];
                                var product = $('img[src*="https://assets.adidas.com/images/"]');
                                if (product.attr('alt') != undefined && product.attr('alt').length > 0) {
                                    new Successloghook(userKey, 'adidas', product.attr('alt'), product.attr('src')).send();
                                    if (hookRequired) {
                                        new Successhook(hookURL, 'adidas', product.attr('alt'), orderID, profile.profileName, product.attr('src')).send();
                                    }
                                }
                            }
                        }
                    });
                }, 500);
                clearInterval(success);
            }
        }, 500);

        chrome.storage.local.get('profiles', function (list) {
            for (var i = 0; i < list.profiles.length; i++) {
                if (list.profiles[i].selected == true) {
                    var profile = list.profiles[i];
                    chrome.storage.local.get('adidas', function (data) {
                        let checkExist = setInterval(function () {
                            if ($('[data-qa-payment-option-preview-type="anyCard"]').length) {
                                $('[data-qa-payment-option-preview-type="anyCard"]').click();
                            }

                            setTimeout(function () {
                                if (data.adidas['autofill'] == true) {
                                    changeValueAdi(document.getElementsByName("card-number")[0], profile.cardNumber);
                                    changeValueAdi(document.getElementsByName("expiry-month")[0], profile.expdate[0] + profile.expdate[1]);
                                    changeValueAdi(document.getElementsByName("expiry-year")[0], profile.expdate[3] + profile.expdate[4]);
                                    changeValueAdi(document.getElementsByName("security-code")[0], profile.cvv);
                                }

                                if (data.adidas['autocheckout'] == true) {
                                    $('span[class="MuiButton-label"]').click();
                                }
                            }, 500);
                        }, 500);
                    });
                }
            }
        });

        chrome.storage.local.get('profiles', function (list) {
            chrome.storage.local.get('adidas', function (data) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (list.profiles[i].selected == true) {
                        var profile = list.profiles[i];

                        if (profile.phone[1] == "7") {
                            profile.phone = profile.phone[0] + profile.phone[1] + "7" + profile.phone[2] + profile.phone[3] + profile.phone[4] + profile.phone[5] + profile.phone[6] + profile.phone[7] + profile.phone[8] + profile.phone[9];
                        }

                        var house = profile.address1.match(/\d+/);

                        if (profile.address1.includes('(')) {
                            house = profile.address1.match(/\(([^)]+)\)/)[1];
                            profile.address1 = profile.address1.split('(')[0];
                        }

                        setTimeout(() => {
                            let checkExist = setInterval(function () {
                                if (data.adidas['autofill'] == true) {
                                    if ($('input[name="firstName"]').length) {
                                        changeValueAdi(document.getElementsByName("firstName")[0], profile.fname);
                                        changeValueAdi(document.getElementsByName("lastName")[0], profile.sname);
                                        changeValueAdi(document.getElementsByName("city")[0], profile.city);
                                        changeValueAdi(document.getElementsByName("zipcode")[0], profile.zip);
                                        changeValueAdi(document.getElementsByName("address1")[0], profile.address1);
                                        changeValueAdi(document.getElementsByName("houseNumber")[0], parseInt(profile.address1.match(/\d+/)));
                                        changeValueAdi(document.getElementsByName("apartmentNumber")[0], parseInt(profile.apt));
                                        changeValueAdi(document.getElementsByName("emailAddress")[0], profile.email);
                                        changeValueAdi(document.getElementsByName("phoneNumber")[0], profile.phone);
                                        clearInterval(checkExist);
                                    }

                                    if ($('input[name="shippingAddress.firstName"]').length) {
                                        changeValueAdi(document.getElementsByName("shippingAddress.firstName")[0], profile.fname);
                                        changeValueAdi(document.getElementsByName("shippingAddress.lastName")[0], profile.sname);
                                        changeValueAdi(document.getElementsByName("shippingAddress.city")[0], profile.city);
                                        changeValueAdi(document.getElementsByName("shippingAddress.zipcode")[0], profile.zip);
                                        changeValueAdi(document.getElementsByName("shippingAddress.address1")[0], profile.address1);
                                        changeValueAdi(document.getElementsByName("shippingAddress.houseNumber")[0], house);
                                        changeValueAdi(document.getElementsByName("shippingAddress.apartmentNumber")[0], parseInt(profile.apt));
                                        changeValueAdi(document.getElementsByName("shippingAddress.emailAddress")[0], profile.email);
                                        changeValueAdi(document.getElementsByName("shippingAddress.phoneNumber")[0], profile.phone);
                                        clearInterval(checkExist);
                                    }
                                }
                            }, 1000);

                            let markAndCh = setInterval(() => {
                                if ($('[data-auto-id="explicit-consent-checkbox"]:checked').length == 0 && window.location.href.includes("delivery")) {
                                    if ($('[type="checkbox"]').length) {
                                        $('[type="checkbox"]')[1].click();
                                    }
                                }


                                if (data.adidas['autocheckout'] == true) {
                                    setTimeout(function () {
                                        $('[data-auto-id="review-and-pay-button"]').click();
                                    }, 600);
                                }
                            }, 100)
                        }, 150)
                    }
                }
            });
        });

        chrome.storage.local.get('adidas', function (data) {
            if (data.adidas['autocheckout'] == true && data.adidas['requestMode'] == false) {
                let checkExistAddToCart = setInterval(function () {
                    if (data.adidas['restockMode'] != true) {
                        clearInterval(checkExistAddToCart);
                    }

                    if ($('[data-auto-id="glass-checkout-button-right-side"]').length) {
                        setTimeout(function () {
                            $('[data-auto-id="glass-checkout-button-right-side"]').click();
                        }, 500);

                        setTimeout(function () {
                            $('[data-auto-id="glass-checkout-button-right-side"]').click();
                        }, 1000);
                    }
                }, 200);
            }
        });

        if (window.location.origin.includes("yoomoney")) {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (list.profiles[i].selected == true) {
                        var profile = list.profiles[i];
                    }
                }

                chrome.storage.local.get('adidas', function (data) {
                    let checkExist = setInterval(function () {
                        if ($('input[name="card-number"]').length) {
                            clearInterval(checkExist);


                            const changeValue = (element, value) => {
                                const event = new Event('input', { bubbles: true })
                                element.value = value
                                element.dispatchEvent(event)
                            }

                            if (data.adidas['autofill'] == "settingOn") {
                                changeValueAdi(document.getElementsByName("card-number")[0], profile.cardNumber);
                                changeValueAdi(document.getElementsByName("expiry-month")[0], profile.expdate[0] + profile.expdate[1]);
                                changeValueAdi(document.getElementsByName("expiry-year")[0], profile.expdate[3] + profile.expdate[4]);
                                changeValueAdi(document.getElementsByName("security-code")[0], profile.cvv);
                            }

                            if (data.adidas['autocheckout'] == "settingOn") {
                                setTimeout(function () {
                                    $('span[class="MuiButton-label"]').click();
                                }, 1000);
                            }
                        }
                    }, 100);
                });


            });
        }
    }
});

//A function that passes sizes from chrome.storage.local to an array
function getSizes() {
    var positiveSizes = new Array();
    chrome.storage.local.get('adidas', function (data) {
        if (data.adidas) {
            for (var i = 0; i < Object.keys((data.adidas)).length; i++) {
                if (Object.entries(data.adidas)[i][1] == "sizeOn") {
                    if (Object.keys(data.adidas)[i] == "35") {
                        positiveSizes.push("3.5");
                        positiveSizes.push("35");
                    } else if (Object.keys(data.adidas)[i] == "45") {
                        positiveSizes.push("4.5");
                        positiveSizes.push("36");
                    } else if (Object.keys(data.adidas)[i] == "55") {
                        positiveSizes.push("5.5");
                        positiveSizes.push("37");
                    } else if (Object.keys(data.adidas)[i] == "65") {
                        positiveSizes.push("6.5");
                        positiveSizes.push("38");
                    } else if (Object.keys(data.adidas)[i] == "75") {
                        positiveSizes.push("7.5");
                        positiveSizes.push("39");
                    } else if (Object.keys(data.adidas)[i] == "85") {
                        positiveSizes.push("8.5");
                        positiveSizes.push("40.5");
                    } else if (Object.keys(data.adidas)[i] == "95") {
                        positiveSizes.push("9.5");
                        positiveSizes.push("42");
                    } else if (Object.keys(data.adidas)[i] == "105") {
                        positiveSizes.push("10.5");
                        positiveSizes.push("43");
                    } else if (Object.keys(data.adidas)[i] == "115") {
                        positiveSizes.push("11.5");
                        positiveSizes.push("44.5");
                    } else if (Object.keys(data.adidas)[i] == "125") {
                        positiveSizes.push("12.5");
                        positiveSizes.push("46");
                    } else if (Object.keys(data.adidas)[i] == "135") {
                        positiveSizes.push("13.5");
                        positiveSizes.push("47");
                    } else if (Object.keys(data.adidas)[i] == "145") {
                        positiveSizes.push("14.5");
                        positiveSizes.push("48.5");
                    } else if (Object.keys(data.adidas)[i] == "4") {
                        positiveSizes.push("4");
                        positiveSizes.push("35.5");
                    } else if (Object.keys(data.adidas)[i] == "5") {
                        positiveSizes.push("5");
                        positiveSizes.push("36.5");
                    } else if (Object.keys(data.adidas)[i] == "6") {
                        positiveSizes.push("6");
                        positiveSizes.push("37.5");
                    } else if (Object.keys(data.adidas)[i] == "7") {
                        positiveSizes.push("7");
                        positiveSizes.push("38.5");
                    } else if (Object.keys(data.adidas)[i] == "8") {
                        positiveSizes.push("8");
                        positiveSizes.push("40");
                    } else if (Object.keys(data.adidas)[i] == "9") {
                        positiveSizes.push("9");
                        positiveSizes.push("41");
                    } else if (Object.keys(data.adidas)[i] == "10") {
                        positiveSizes.push("10");
                        positiveSizes.push("4.5");
                    } else if (Object.keys(data.adidas)[i] == "11") {
                        positiveSizes.push("11");
                        positiveSizes.push("44");
                    } else if (Object.keys(data.adidas)[i] == "12") {
                        positiveSizes.push("12");
                        positiveSizes.push("45");
                    } else if (Object.keys(data.adidas)[i] == "13") {
                        positiveSizes.push("13");
                        positiveSizes.push("46.5");
                    } else {
                        positiveSizes.push(Object.keys(data.adidas)[i]);
                    }
                }
            }
        }
    });
    return positiveSizes;
}

//Out dated code

/* 1. ATC script (DOM manipulation)
    function clickSize(array = atc) {
        var size = array[Math.floor(Math.random() * array.length)];
        if ($(`li:contains("${size}")`).length) {
            $(`li:contains("${size}")`).click();
            setTimeout(function () {
                $('[data-auto-id="button-add-to-bag"]').click();
            }, 1000);
        } else {
            clickSize(array);
        }
    }
*/
