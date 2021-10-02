chrome.storage.local.get('switcher', function (st) {
	if (st.switcher) {
		$(document).ready(function () {
			chrome.storage.local.get('solebox', function (data) {
				chrome.storage.local.get('profiles', function (list) {
					for (var i = 0; i < list.profiles.length; i++) {
						if (list.profiles[i].selected == true && data.solebox['autofill'] == true) {
							var profile = list.profiles[i];

							var fields = {
								"dwfrm_shipping_shippingAddress_addressFields_firstName": profile.fname,
								"dwfrm_shipping_shippingAddress_addressFields_lastName": profile.sname,
								"dwfrm_shipping_shippingAddress_addressFields_postalCode": profile.zip,
								"dwfrm_shipping_shippingAddress_addressFields_city": profile.city,
								"dwfrm_shipping_shippingAddress_addressFields_street": profile.address1,
								"dwfrm_shipping_shippingAddress_addressFields_suite": profile.apt,
								"dwfrm_shipping_shippingAddress_addressFields_address2": profile.address2,
								"dwfrm_contact-de_email": profile.email,
								"dwfrm_contact-de_phone": "+7" + profile.phone

							};

							var cardFields = {
								"CardNumber": profile.cardNumber,
								"Expiry": profile.expdate[0] + profile.expdate[1] + profile.expdate[2] + "20" + profile.expdate[3] + profile.expdate[4],
								"HolderName": profile.fname + " " + profile.sname,
								"VerificationCode": profile.cvv
							}

							let waitSame = setInterval(() => {
								if ($(`span[class="f-label-value"]`).length) {
									clearInterval(waitSame);

									if ($(`span[class="f-label-value"]`).length) {
										//document.getElementById('dwfrm_shipping_shippingAddress_shippingAddressUseAsBillingAddress').click();
										$(`span[class="f-label-value"]`).click();
									}
								}
							}, 3000);

							//id="dwfrm_shipping_shippingAddress_addressFields_firstName"
							let waitDeliveryAddress = setInterval(() => {
								if (document.getElementById("dwfrm_shipping_shippingAddress_addressFields_firstName")) {
									clearInterval(waitDeliveryAddress);

									Object.keys(fields).forEach(f => {
										changeSB(f, fields[f]);
										//document.getElementById(`${f}`).value = fields[f];
									});

									document.getElementsByClassName("f-custom-select-item js-custom-select-item")[1].click();

									if ($(`span[class="f-label-value"]`).length) {
										//document.getElementById('dwfrm_shipping_shippingAddress_shippingAddressUseAsBillingAddress').click();
										$(`span[class="f-label-value"]`).click();
									}

									Object.keys(document.getElementsByClassName("f-custom-select-item js-custom-select-item")).forEach(num => {
										if (document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].id == `\n${profile.country}\n`) {
											document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].click();
										}
										//b-localization-search-input js-search-country-selector-input
									});

								}
							}, 3000);

							let waitState = setInterval(() => {
								//if ((window.location.href == "http://www.solebox.com/*")) {
								if ($(`button[class="dwfrm_shipping-us_shippingAddress_addressFields_statesCA_stateCode"]`).length) {
									clearInterval(waitState);

									Object.keys(document.getElementsByClassName("f-custom-select-item js-custom-select-item")).forEach(num => {
										if (document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].id == `\n${profile.state}\n`) {
											document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].click();
										}
										//b-localization-search-input js-search-country-selector-input
									});

									document.getElementsByClassName("f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit")[0].click();
								} else if ($(`button[class="f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit"]`).length) {
									clearInterval(waitState);
									document.getElementsByClassName("f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit")[0].click();
								}
								//}

							}, 3000);

							let waitClickCard = setInterval(() => {
								if ($(`img[class="CREDIT_CARD-option"]`).length) {
									clearInterval(waitClickCard);

									//$(`input[id="paymentMethod_CREDIT_CARD"].children("span"):contains("Credit Card")`).click();
									//$(`img[class="CREDIT_CARD-option"]`)[].click();
									//document.getElementsByClassName("CREDIT_CARD-option")[0].click();
									document.getElementsByClassName("CREDIT_CARD-option")[0].click();
								}
								$('button[value="submit-payment"]').click();
							}, 3000);

							let waitSaveContinue = setInterval(() => {
								if ($(`button[value="submit-payment"]`).length && (true == data.solebox['autocheckout'])) {
									clearInterval(waitSaveContinue);

									document.getElementsByClassName("js-place-order-with")[1].click();
									//$(`button[value="submit-payment"]`).click();
									//$(`button[value="submit-payment"]`).click();

									/*
									document.getElementsByClassName("f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit")[0].click();
									document.getElementsByClassName("f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit")[0].click();
									document.getElementsByClassName("f-button f-button--primary f-button--medium a-checkout-step-submit f-button--full-width js-checkout-step-submit")[0].click();
									*/
								}
							}, 4000);

							let waitCard = setInterval(() => {
								if ($(`button[class="btn btn-select btn-card-visa"]`).length) {
									clearInterval(waitCard);

									if ((detectCardType(profile.cardNumber) == 'visa') && $(`button[class="btn btn-select btn-card-visa"]`).length) {
										document.getElementsByClassName("btn btn-select btn-card-visa")[0].click();


									} else if (detectCardType(profile.cardNumber) == 'mastercard') {
										document.getElementsByClassName("btn btn-select btn-card-mastercard")[0].click();
									}
								}

							}, 1000);

							if (detectCardType(profile.cardNumber) == 'visa') {
								let waitVisa = setInterval(() => {
									window.focus();
									if ($(`input[class="input-large input-cardnumber form-control is-touched is-invalid cardnumber__input"]`).length) {
										clearInterval(waitVisa);
										;
										document.getElementsByClassName("icon icon-hint")[2].click();
										//$(`input[class="input-large input-cardnumber form-control is-touched is-invalid cardnumber__input"]`).val('1234 1234 1234 1234');
										//changeValue('CardNumber', profile.cardNumber);
										Object.keys(cardFields).forEach(id => {
											changeValue(id, cardFields[id]);
											window.open('', 'visaCardWindow').focus();
										});
										document.getElementsByClassName("icon icon-hint")[2].click();

										if ($(`button[class="btn btn-next"]`).length) {
											$(`button[class="btn btn-next"]`).click();
										}
									}
								}, 2000);
							} else if (detectCardType(profile.cardNumber) == 'mastercard') {
								let waitMaster = setInterval(() => {
									window.focus();
									if ($(`input[class="input-large input-cardnumber form-control is-touched is-invalid cardnumber__input"]`).length) {
										clearInterval(waitMaster);

										document.getElementsByClassName("icon icon-hint")[2].click();

										//$(`input[class="input-large input-cardnumber form-control is-touched is-invalid cardnumber__input"]`).val('1234 1234 1234 1234');
										//changeValue('CardNumber', profile.cardNumber);
										setTimeout(() => {
											alert('starting to fill');
											Object.keys(cardFields).forEach(id => {
												changeValue(id, cardFields[id]);
											});
										}, 4000);

										document.getElementsByClassName("icon icon-hint")[2].click();

										if ($(`button[class="btn btn-next"]`).length) {
											$(`button[class="btn btn-next"]`).click();
										}

									}
								}, 2000);
							}

							//class="f-button f-button--primary f-button--medium a-submit-payment a-checkout-step-submit f-button--full-width js-checkout-step-submit"

							/*
								setTimeout(function(){
									if (document.getElementById("dwfrm_shipping-us_shippingAddress_addressFields_statesCA_stateCode")) {
										//
										if ($(`option:contains("${profile.state}")`).length) { 
											profile.state = $(`option:contains("${profile.state}")`).val(); 
										}
										document.getElementById("dwfrm_shipping-us_shippingAddress_addressFields_statesCA_stateCode").value = profile.state;
									}
		
									Object.keys(document.getElementsByClassName("f-custom-select-item js-custom-select-item")).forEach(num => {
										if (document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].id == `\n${profile.state}\n`) {
											document.getElementsByClassName("f-custom-select-item js-custom-select-item")[num].click();
										}
										//b-localization-search-input js-search-country-selector-input
									});
		
								}, 500);
							*/


							/*
							let waitSelect = setInterval(() => {
								//if there is optionn list
								//which has option
								//that contains country we need
								if (document.getElementsByClassName("f-custom-select-header js-custom-select-header")[0]) {
									clearInterval(waitSelect);
									document.getElementsByClassName("f-custom-select-header js-custom-select-header")[0].click();
		
									//console.log($(` li:contains(class="f-custom-select-list js-custom-select-list")`));
		
								}
							}, 500);
							*/
						}
					};
				});
			});
		});

		const changeSB = (el, value) => {
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


		function detectCardType(number) {
			number = number.replace(/\s+/g, '');
			var re = {
				electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
				maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
				dankort: /^(5019)\d+$/,
				interpayment: /^(636)\d+$/,
				unionpay: /^(62|88)\d+$/,
				visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
				mastercard: /^5[1-5][0-9]{14}$/,
				amex: /^3[47][0-9]{13}$/,
				diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
				discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
				jcb: /^(?:2131|1800|35\d{3})\d{11}$/
			}

			for (var key in re) {
				if (re[key].test(number)) {
					return key
				}
			}
		}
	}
});


/*
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


	let wait = setInterval(() => {
		if ($("#SOME_INPUT_ID").length) {
			clearInterval(wait);
			// window.focus() <--- does not work, and i still have to click the page
			console.log('ready to fill SOME_INPUT_ID');
			change("SOME_INPUT_ID", 'STRING_TO_FILL_SOME_INPUT_ID');
		}
	}, 1000);


const change = (el, value) => {
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