chrome.storage.local.get('switcher', function (st) {
	if (st.switcher) {
		chrome.storage.local.get('sneakerhead', function (sh) {
			if (sh.sneakerhead.autofill) {
				chrome.storage.local.get('profiles', function (list) {
					for (var i = 0; i < list.profiles.length; i++) {
						if (list.profiles[i].selected == true) {
							var profile = list.profiles[i];
							if (sh.sneakerhead.autofill) {
								let data = {
									'CHECKOUT_FORM[EMAIL]': profile.email,
									'CHECKOUT_FORM[PHONE]': "7" + profile.phone,
									'CHECKOUT_FORM[FULL_NAME]': profile.fname + " " + profile.sname,
									'CHECKOUT_FORM[ADDRESS]': profile.address1 + ", " + profile.address2 + ", кв. " + profile.apt,
									'cardNumber': profile.cardNumber,
									'inputMonth': '' + profile.expdate[0] + profile.expdate[1],
									'cc-exp-month': '' + profile.expdate[0] + profile.expdate[1],
									'inputYear': '' + profile.expdate[3] + profile.expdate[4],
									'cc-exp-year': '' + profile.expdate[3] + profile.expdate[4],
									'cardHolder': profile.bname,
									'cardCvv': profile.cvv,
									'inputEmail': profile.email
								}

								let waitForSomethingSpecial = setInterval(() => {
									Object.keys(data).forEach(id => {
										changeValueSH(id, data[id]);
									});
								}, 250);
							}


							let success = setInterval(() => {
								let orderID = window.location.href.split('/');
								orderID = orderID[orderID.length - 1];
								if (orderID.includes('?ORDER_ID')) {
									orderID = orderID.split('=');
									orderID = orderID[1];
									sendWebhook('sneakerhead', profile, orderID);
									clearInterval(success);
								}
							}, 500);
						}
					}
				});
			}

			if (sh.sneakerhead.autocheckout) {
				let waitForCheckoutAB = setInterval(() => {
					if ($('button:contains("Оплата картой")').length) {
						$('button:contains("Оплата картой")').click();
					};

					if ($('span:contains("Оплатить")').length) {
						$('span:contains("Оплатить")').click();
					};
				}, 250);
			}
		});

		const changeValueSH = (query, value) => {
			if (document.getElementById(query)) {
				if (document.getElementById(query).value === "") {

					element = document.getElementById(query);

					element.focus();
					element.dispatchEvent(new Event('focus'));
					element.value = value;
					element.dispatchEvent(new Event('change', { bubbles: true }));
					element.blur();
					element.dispatchEvent(new Event('blur'));
					element.focus();
					element.dispatchEvent(new Event('focus'));
				}

			}

		}
	}
});