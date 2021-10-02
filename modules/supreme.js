chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.storage.local.get('supreme', function (data) {

            console.log('ready');

            //работает только на странице выбраной категории товара
            if (window.location.href == `https://www.supremenewyork.com/shop/all/${data.supreme['category']}`) {

                if (findItem()) {
                    findItem();
                } else {
                    let waitFindItem = setInterval(function () {
                        if (findItem()) {
                            clearInterval(waitFindItem);
                        } else {
                            location.reload();
                        }
                        findItem();
                    }, 1500);
                }
            }
            clearCart();


            $(document).ready(function () {
                chrome.storage.local.get('profiles', function (list) {
                    for (var i = 0; i < list.profiles.length; i++) {
                        if (list.profiles[i].selected == true && data.supreme['autofill'] == true) {
                            var profile = list.profiles[i];

                            let ids = {
                                "order_billing_name": profile.fname + " " + profile.sname,
                                "order_email": profile.email,
                                "order_tel": profile.phone,
                                "bo": profile.address1,
                                "oba3": profile.address2,
                                "order_billing_address_3": profile.address1 + " " + profile.address2,
                                "order_billing_city": profile.city,
                                "order_billing_zip": profile.zip,
                                "cnb": profile.cardNumber,
                                "vval": profile.cvv,
                                //add card inputs
                                "credit_card_month": profile.expdate[0] + profile.expdate[1],
                                "credit_card_year": profile.expdate[3] + profile.expdate[4]
                            };

                            let waitSizeNCheckout = setInterval(() => {
                                if ($(`option:contains("${data.supreme['size']}")`).length) {
                                    clearInterval(waitSizeNCheckout);
                                    let sizeToSet = $(`option:contains("${data.supreme['size']}")`).val();

                                    //console.log(sizeToSet);

                                    if ($('select[id="size"]')) {
                                        $('select[id="size"]').val(sizeToSet);
                                    }
                                    $('input[value="add to basket"]').click();

                                    let BwaitIf = setInterval(function () {
                                        //document.getElementsByClassName("button checkout")[0].click();
                                        if (document.getElementsByClassName('button checkout')[0] && (window.location.href != "https://www.supremenewyork.com/checkout")) {
                                            clearInterval(BwaitIf);

                                            console.log('found the btn');
                                            document.getElementsByClassName('button checkout')[0].click();
                                        }
                                    }, 500);

                                } else if (!$('select[id="size"]').length) {
                                    clearInterval(waitSizeNCheckout);
                                    //document.getElementsByName('commit')[0].click();
                                    $('input[value="add to basket"]').click();

                                    let BwaitElse = setInterval(function () {
                                        //document.getElementsByClassName("button checkout")[0].click();
                                        if ($('a[class="button checkout"]').length && (window.location.href != "https://www.supremenewyork.com/checkout")) {
                                            clearInterval(BwaitElse);

                                            console.log('found the btn');
                                            document.getElementsByClassName('button checkout')[0].click();
                                        }
                                    }, 500);
                                }
                            }, 500);

                            let waitFillData = setInterval(() => {
                                if (document.getElementById('order_billing_country')) {
                                    clearInterval(waitFillData);

                                    if ($(`option:contains("${profile.country.toUpperCase()}")`).length) {
                                        profile.country = $(`option:contains("${profile.country.toUpperCase()}")`).val();
                                    }
                                    document.getElementById('order_billing_country').value = profile.country;

                                    if ($(`option:contains("${ids["credit_card_month"]}")`).length) {
                                        document.getElementById('credit_card_month').value = profile.expdate[0] + profile.expdate[1];
                                    }

                                    if ($(`option:contains("${'20' + profile.expdate[3] + profile.expdate[4]}")`).length) {
                                        var year = $(`option:contains("${'20' + profile.expdate[3] + profile.expdate[4]}")`).val();
                                    }

                                    document.getElementById('credit_card_type').value = 'credit card';
                                    document.getElementsByName("order[terms]")[0].click();

                                }
                            }, 500);

                            let wait1 = setInterval(() => {
                                if (document.getElementById('order_billing_name')) {
                                    clearInterval(wait1);

                                    Object.keys(ids).forEach(id => {
                                        change(id, ids[id]);
                                    });
                                }
                            }, 500);

                            let waitYear = setInterval(() => {
                                if (document.getElementById('order_billing_name')) {
                                    clearInterval(waitYear);
                                }
                                change("credit_card_year", "20" + profile.expdate[3] + profile.expdate[4]);
                            }, 500);


                            if ((data.supreme['autocheckout'] == true) && (window.location.href == "https://www.supremenewyork.com/checkout")) {
                                let waitProcess = setInterval(() => {
                                    if (($('input[value="process payment"]').length)) {
                                        clearInterval(waitProcess);
                                        console.log('cleared process payment interval')
                                    }

                                    setTimeout(function () { $('input[value="process payment"]').click(); }, data.supreme['delay']);

                                }, 500);
                            }
                        }
                    };
                });
            });
        });

        const change = (el, value) => {

            var event = new Event('change', { bubbles: true });
            var evnt = new Event('focus');
            var evt = new Event('blur');

            if (document.getElementById(el)) {
                var element = document.getElementById(el);

                if (element) {
                    element.value = value;
                    //element.val(value);
                    element.dispatchEvent(event);
                    element.focus();
                    element.dispatchEvent(evnt);
                    element.blur();
                    element.dispatchEvent(evt);
                }
            }
        }

        function clearCart() {
            let waitRemove = setInterval(() => {
                if (document.getElementsByClassName("button remove")[0]) {
                    Object.keys(document.getElementsByClassName("button remove")).forEach(num => {
                        document.getElementsByClassName("button remove")[num].click();
                    });
                } else if (!document.getElementsByClassName("button remove")[0]) {
                    clearInterval(waitRemove);
                }
            }, 500);
        };

        function findItem() {
            chrome.storage.local.get("supreme", function (data) {

                if (data.supreme.nk) {
                    let strNeg = data.supreme.nk;

                    const nkArr = strNeg.split(", ");
                    Object.keys(nkArr).forEach(nk => {
                        if (nkArr[nk] == "") {
                            nkArr.pop();
                            //console.log('popped');
                        } else {
                            //console.log(`'${nkArr[nk]}'`);
                        }
                    });

                    Object.keys(nkArr).forEach(nk => {
                        if ($(`a:contains('${nkArr[nk]}')`)) {
                            $(`a:contains('${nkArr[nk]}')`).remove();
                        }
                    })
                }

                if (data.supreme.pk && data.supreme.color) {
                    let strPos = data.supreme.pk;
                    const pkArr = strPos.split(", ");

                    Object.keys(pkArr).forEach(pk => {
                        if (pkArr[pk] == "") {
                            pkArr.pop();
                            //console.log('popped');
                        } else {
                            //console.log(`'${pkArr[pk]}'`);
                        }
                    });

                    if ($(` article:has(a${pkArr.map(keyword => `:contains("${keyword}")`).join('')}):has(a:contains(${data.supreme.color})) `)) {
                        $(` article:has(a${pkArr.map(keyword => `:contains("${keyword}")`).join('')}):has(a:contains(${data.supreme.color})) `).find("img").click();
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        };
    }
});

//document on ready

//The Catheters - nothing
/*
if (data.supreme['autocheckout'] == true) {
document.getElementsByClassName("button checkout")[0].click();
}
*/

 //console.log(data.supreme.color);
/*
var pkString = pkArr.join(" ");
console.log(pkString);
*/
// ищем article в котором есть такой то name, такой-то color, 
// затем ищем img и кликаем
/*
var nameAtag = $(`a${pkArr.map(keyword => `:contains("${keyword}")`).join('')}`);
var nameText = $(`a${pkArr.map(keyword => `:contains("${keyword}")`).join('')}`).text();
*/
//console.log(nameText);
//article that has <a> with such keywords
//and <a> with such color

/*
if (nameAtag && (nameAtag.parentsUntil("div").siblings("p").find("a").text() == data.supreme.color)) {

console.log('found this item');
if (nameAtag.parentsUntil("div").siblings("a").find("img")) {
    nameAtag.parentsUntil("div").siblings("a").find("img").click()
}
} else {
console.log('something went wrong');
}

var colorText = nameAtag.parentsUntil("div").siblings("p").find("a").text();
console.log(colorText);

*/