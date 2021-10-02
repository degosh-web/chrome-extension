/*
chrome.storage.local.get('naked', function (data) { 
    chrome.storage.local.get('profiles', function (list) {
        for (var i = 0; i < list.profiles.length; i++) {
            if (list.profiles[i].selected == true && data.naked['autofill'] == true) {
                var profile = list.profiles[i];

                var fields1 = {
					"postalCodeQuery": profile.zip,
					"firstName": profile.fname,
					"lastName": profile.sname,
					"addressLine2": profile.address1,
					"addressLine3": profile.address2,
					"postalCode": profile.zip,
					"city": profile.city,
					"phoneNumber": "7" + profile.phone,
                };

				var cardFields = {
					"encryptedCardNumber": profile.cardNumber,
					"encryptedExpiryMonth": profile.expdate[0] + profile.expdate[1],
					"encryptedExpiryYear": profile.expdate[3] + profile.expdate[4],
					"encryptedSecurityCode": profile.cvv,
				};

				// fill country select
				let wait1 = setInterval(() => {
                    if (document.getElementsByClassName("country"[0])) {
                        clearInterval(wait1);
						
                        if ($(`option:contains("${profile.country}")`).length) { 
                            profile.country = $(`option:contains("${profile.country}")`).val(); 
                        }
                        document.getElementsByName('country')[0].value = profile.country;
                        document.getElementsByName('emailAddress')[0].value = profile.email;
						$('button[data-cart-state="check-email"]').click();

                    }
                }, 500)

				let shipWait = setInterval(() => {
					if (document.getElementsByClassName("country"[0])) {
                        clearInterval(shipWait);
						
                        Object.keys(fields1).forEach(n => {
                            //changeN(name, fields1[name]);
							document.getElementsByName(`${n}`)[0].value = fields1[n];
                        });


						$('button[class="continue-btn continue-btn--details continue-btn--finalize-step btn btn-primary btn-lg"]').click();

						setTimeout(function(){
							if (data.naked['autocheckout'] == true) {
								$('button[class="continue-btn continue-btn--shipping continue-btn--finalize-step btn btn-primary btn-lg"]').click();
							}
						}, 1000);
                    }
				}, 500);


				let cardNumWait = setInterval(() => {
					if (document.getElementById('encryptedCardNumber')) {
						clearInterval(cardNumWait);
						
						//changeNaked('encryptedCardNumber', profile.cardNumber);
						//bySymbol('encryptedCardNumber', profile.cardNumber);
						//$('#encryptedCardNumber').writeText('1234');
						changeValue('encryptedCardNumber', profile.cardNumber);
					}
				}, 500);

				let cvvWait = setInterval(() => {
					if (document.getElementById('encryptedSecurityCode')) {
						clearInterval(cvvWait);
						
						changeNaked('encryptedSecurityCode', profile.cvv);
					}
				}, 500);

				let expMonthWait = setInterval(() => {
					if (document.getElementById('encryptedExpiryMonth')) {
						clearInterval(expMonthWait);
						
						changeNaked('encryptedExpiryMonth', profile.expdate[0] + profile.expdate[1]);
					}
				}, 500);

				let expYearWait = setInterval(() => {
					if (document.getElementById('encryptedExpiryYear')) {
						clearInterval(expYearWait);
						
						changeNaked('encryptedExpiryYear', profile.expdate[3] + profile.expdate[4]);
					}
				}, 500);

				$('span[id="terms-disclaimer"]').click();
				//$('button[data-cart-state="checkout"]').click();
            }
        };
    });
});

(function($) {
    $.fn.writeText = function(content) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        setInterval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
        }, 100);
    };
})(jQuery);

const bySymbol = (el, value) => {
	var event = new Event('change', { bubbles: true });
    var evnt = new Event('focus');
    var evt = new Event('blur');

    if (document.getElementById(el)) {
        var element = document.getElementById(el);

        if (element) {
            element.focus();
            element.dispatchEvent(evnt);

            //element.value = value;
			element.writeText(value);
            element.dispatchEvent(event);

            element.blur();
            element.dispatchEvent(evt);
        }
    }
}

const changeNaked = (el, value) => {
    var event = new Event('change', { bubbles: true });
    var evnt = new Event('focus');
    var evt = new Event('blur');

    if (document.getElementById(el)) {
        var element = document.getElementById(el);

        if (element) {
            element.focus();
            element.dispatchEvent(evnt);
            element.value = value;
            element.dispatchEvent(event);
            element.blur();
            element.dispatchEvent(evt);
        }
    }
}
*/