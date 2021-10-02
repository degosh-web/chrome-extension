chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('lamoda', function (data) {
            if (data.lamoda.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true) {
                            var profile = list.profiles[i];

                            let phone = `7${profile.phone[0]}${profile.phone[1]}${profile.phone[2]}${profile.phone[3]}${profile.phone[4]}${profile.phone[5]}${profile.phone[6]}${profile.phone[7]}${profile.phone[8]}${profile.phone[9]}`

                            let deliveryInput = setInterval(() => {
                                if ($('[id="phone"]').length) {
                                    clearInterval(deliveryInput);
                                }

                                changeValueI(document.querySelector('[id="phone"]'), phone);
                                changeValueI(document.querySelector('[id="city_name"]'), profile.city);
                                changeValueI(document.querySelector('[id="first_name"]'), profile.fname);
                                changeValueI(document.querySelector('[id="last_name"]'), profile.sname);
                                changeValueI(document.querySelector('[id="email"]'), profile.email);
                                
                                $('[aria-label="Не получать новости и скидки"]').click();
                                $('span:contains("Онлайн-оплата картой")').click();
                                setTimeout(() => {
                                    $('button[aria-label="Оформить заказ"]').click();
                                }, 2000);
                            }, 500);

                            let cardInput = setInterval(() => {
                                if ($('[id="payForm"]').length) {
                                    clearInterval(cardInput);
                                    changeValueI(document.querySelector('[autocomplete="cc-number"]'), profile.cardNumber);
                                    changeValueI(document.querySelector('[placeholder="MM/ГГ"]'), profile.expdate);
                                    changeValueI(document.querySelector('[autocomplete="cc-csc"]'), profile.cvv);
                                    setTimeout(() => {
                                        $('button[id="pay"]').click()
                                    }, 250)
                                }
                            }, 250);
                        }
                    };
                });
            }
        });
    }
});