chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get("yoomoney", function (data) {
            if (data.yoomoney.autofill) {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true) {
                            var profile = list.profiles[i];
                            setInterval(() => {
                                if ($('#cardNumber').length) {
                                    changeValue('cardNumber', profile.cardNumber);
                                    changeValue('[placeholder="ММ"]', profile.expdate[0] + profile.expdate[1]);
                                    changeValue('[placeholder="ГГ"]', profile.expdate[3] + profile.expdate[4]);
                                    changeValue('[placeholder="CVC"]', profile.cvv);
                                    if (data.yoomoney.autocheckout) {
                                        setTimeout(() => {
                                            $('span:contains("Pay")').click();
                                            $('span:contains("Pay")').parent().click();
                                        }, 150);
                                    }
                                }
                            }, 250);
                        }
                    }
                });
            }
        });
    }
});
