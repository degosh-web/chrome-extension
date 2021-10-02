chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('profiles', function (list) {
            for (var i = 0; i < list.profiles.length; i++) {
                if (list.profiles[i].selected == true) {
                    var profile = list.profiles[i];

                    let phone = `+7(${profile.phone[0]}${profile.phone[1]}${profile.phone[2]})${profile.phone[3]}${profile.phone[4]}${profile.phone[5]}-${profile.phone[6]}${profile.phone[7]}-${profile.phone[8]}${profile.phone[9]}`

                    var data = {
                        'client_phone': `${phone}`,
                        'client[name]': `${profile.fname} ${profile.sname}`,
                        'client[email]': `${profile.email}`,
                        'shipping_address[address]': `${profile.address1}, ${profile.address2}, кв. ${profile.apt}`,
                        'ccnumber': `${profile.cardNumber}`,
                        'card-number': `${profile.cardNumber}`,
                        'cardholder': `${profile.bname}`,
                        'expirationdate': `${profile.expdate}`,
                        'expiry-month': `${profile.expdate[0]}${profile.expdate[1]}`,
                        'expiry-year': `${profile.expdate[3]}${profile.expdate[4]}`,
                        'cvc': `${profile.cvv}`,
                        'security-code': `${profile.cvv}`
                    };


                    let waitForSomethingSpecial = setInterval(() => {
                        Object.keys(data).forEach(id => {
                            changeValue(id, data[id]);
                        });
                    }, 250);

                    let success = setInterval(() => {
                        let orderID = window.location.href.split('/');
                        orderID = orderID[orderID.length - 2];
                        if (orderID.includes('orders')) {
                            orderID = $('.co-checkout-title').text();
                            orderID = orderID.split('№ ')[1];
                            //sendWebhook('belief', profile, orderID);
                            clearInterval(success);
                        }
                    }, 500);
                }
            };
        });
    }
});