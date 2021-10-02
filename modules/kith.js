chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('kith', function (data) {
            chrome.storage.local.get('profiles', function (list) {
                for (var i = 0; i < list.profiles.length; i++) {
                    if (list.profiles[i].selected == true && data.kith['autofill'] == 'actionBtnOn') {
                        var profile = list.profiles[i];
                        let fields1 = {
                            '#CheckoutData_BillingFirstName': profile.fname,
                            '#CheckoutData.BillingFirstName': profile.fname,
                            '#CheckoutData_BillingLastName': profile.sname,
                            '#CheckoutData.BillingLastName': profile.sname,
                            '#CheckoutData_BillingAddress1': profile.address1,
                            '#CheckoutData.BillingAddress1': profile.address1,
                            '#CheckoutData_BillingAddress2': profile.address2,
                            '#CheckoutData.BillingAddress2': profile.address2,
                            '#CheckoutData_Email': profile.email,
                            '#CheckoutData.Email': profile.email,
                            '#BillingCity': profile.city,
                            '#BillingCity': profile.city,
                            '#BillingZIP': profile.zip,
                            '#BillingZIP': profile.zip,
                            '#CheckoutData_BillingPhone': profile.phone,
                            '#CheckoutData_BillingPhone': profile.phone,
                            '#cardNum': profile.cardNumber,
                            '#cardNum': profile.cardNumber,
                            '#cvdNumber': profile.cvv,
                            '#cvdNumber': profile.cvv
                        }

                        let checkExists = setInterval(() => {
                            if ($('#CheckoutData_BillingFirstName')) {
                                clearInterval(checkExists);
                            }

                            var month = new Number();

                            switch (profile.expdate[0] + profile.expdate[1]) {
                                case "01":
                                    month = "1";
                                    break;
                                case "02":
                                    month = "2";
                                    break;
                                case "03":
                                    month = "3";
                                    break;
                                case "04":
                                    month = "4";
                                    break;
                                case "05":
                                    month = "5";
                                    break;
                                case "06":
                                    month = "6";
                                    break;
                                case "07":
                                    month = "7";
                                    break;
                                case "08":
                                    month = "8";
                                    break;
                                case "09":
                                    month = "9";
                                    break;
                                case "10":
                                    month = "10";
                                    break;
                                case "11":
                                    month = "11";
                                    break;
                                case "12":
                                    month = "12";
                                    break;
                            }

                            fillFieldK('#cardExpiryMonth', parseInt(month), true);
                            fillFieldK('#cardExpiryYear', parseInt("20" + profile.expdate[3] + profile.expdate[4]), true);

                            Object.keys(fields1).forEach(id => {
                                fillFieldK(id, fields1[id]);
                            });

                            if (data.kith['autocheckout'] == "actionBtnOn") {
                                setTimeout(() => {
                                    $('#btnPay').click();
                                }, 1000);
                            }

                        }, 1000);
                    }
                }
            });
        });

        function fillFieldK(id, value, select = false) {
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