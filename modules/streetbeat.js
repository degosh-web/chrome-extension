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
        chrome.storage.local.get("streetbeat", function (data) {
            if (data.streetbeat.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true) {
                            var profile = list.profiles[i];
                            var num = `+7 (${profile.phone[0]}${profile.phone[1]}${profile.phone[2]}) ${profile.phone[3]}${profile.phone[4]}${profile.phone[5]}-${profile.phone[6]}${profile.phone[7]}-${profile.phone[8]}${profile.phone[9]}`;
                            let fastCheckout = setInterval(() => {
                                if ($('label:contains("Адрес доставки")').length) {
                                    clearInterval(fastCheckout);
                                    changeValueI(document.querySelector('input[token]'), profile.address1);
                                    setTimeout(() => {
                                        if (document.querySelector('input[token]').children[0]) {
                                            document.querySelector('input[token]').children[0].click();
                                        }
                                    }, 200);

                                    $('div[class="main-title payment__type"]:contains("Онлайн-оплата")').click();

                                    let waitSurname = setInterval(() => {
                                        let surnameInput = Array.prototype.slice.call(document.querySelectorAll('label')).filter(function (el) {
                                            return el.textContent.replace(/\s/g, '') == 'Фамилия';
                                        })[0];

                                        if (surnameInput.parentElement) {
                                            clearInterval(waitSurname);
                                            changeValueI(surnameInput.parentElement.children[1].children[0], profile.sname);
                                        }

                                        let nameInput = Array.prototype.slice.call(document.querySelectorAll('label')).filter(function (el) {
                                            return el.textContent.replace(/\s/g, '') == 'Имя';
                                        })[0];

                                        changeValueI(nameInput.parentElement.children[1].children[0], profile.fname);

                                        let phone = Array.prototype.slice.call(document.querySelectorAll('label')).filter(function (el) {
                                            return el.textContent.replace(/\s/g, '') == 'Телефон';
                                        })[0];

                                        changeValueI(phone.parentElement.children[1].children[0], num);

                                        let email = Array.prototype.slice.call(document.querySelectorAll('label')).filter(function (el) {
                                            return el.textContent.replace(/\s/g, '') == 'E-mail';
                                        })[0];

                                        changeValueI(email.parentElement.children[1].children[0], profile.email);
                                        if (data.streetbeat.autocheckout) {
                                            document.querySelector('input[token]').click();
                                            setTimeout(() => {
                                                if (document.querySelector('input[token]').children[0]) {
                                                    document.querySelector('input[token]').children[0].click();
                                                }
                                            }, 1000);
                                            $('button:contains("Оплатить")').click();
                                            setTimeout(() => {
                                                document.querySelector('input[token]').click();
                                                if (document.querySelector('input[token]').children[0]) {
                                                    document.querySelector('input[token]').children[0].click();
                                                }
                                                $('button:contains("Оплатить")').click();
                                            }, 1000);
                                        }
                                    }, 100);
                                }
                            }, 250);


                            let defaultCheckout = setInterval(() => {
                                if (location.href.includes('/order/cart')) {
                                    clearInterval(defaultCheckout);
                                    $('#order-auth-button').click();
                                }

                                if ($('[placeholder="Имя"]').length) {
                                    $('[placeholder="Имя"]').val(profile.fname);
                                    $('[placeholder="Телефон"]').val(num);
                                    $('[placeholder="E-mail"]').val(profile.email);
                                    if (data.streetbeat.autocheckout) {
                                        setTimeout(() => {
                                            $('button:contains("Продолжить без регистрации")').click();
                                        }, 500);
                                    }
                                }

                                if ($('#registration-form').length && $('#registration-form').attr('class') == 'js-auth-form ajax') {
                                    clearInterval(defaultCheckout);
                                    $('[class="checkbox__icon"]').click();
                                }

                                if ($('[placeholder="Адрес"]').length) {
                                    $('[placeholder="Адрес"]').val(profile.address1);
                                    $('div:contains("Онлайн-оплата")').click();
                                    $('[placeholder="Фамилия"]').val(profile.sname);
                                    if (data.streetbeat.autocheckout) {
                                        setInterval(() => {
                                            $('button:contains("Оплатить")').click();
                                        }, 1000);
                                    }
                                }
                            }, 250);
                        }
                    }
                });
            }
        });


        let webhook = setInterval(() => {
            if (location.href.includes('order/complete/')) {
                if ($('.cart__title[data-id]').length) {
                    clearInterval(webhook);
                    new Successloghook(userKey, 'street beat', $('.cart__title[data-id]').children().text(), $('img[class="cart__image"]').attr('src')).send();
                    if (hookRequired) {
                        new Successhook(hookURL, 'street beat', $('.cart__title[data-id]').children().text(), location.href.split('/')[5], profile.profileName, $('img[class="cart__image"]').attr('src')).send();
                    }
                }
            }
        }, 500);
    }
});