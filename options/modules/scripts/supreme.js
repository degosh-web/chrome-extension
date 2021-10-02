chrome.storage.local.get("supreme", function (data) {
    if (data.supreme == undefined) {
        chrome.storage.local.set({ 'supreme':
            {
                'autofill': false,
                'autocheckout': false,
                'category': "",
                'size': "",
                'pk': "",
                'nk': "",
                'delay': "",
                'color': ""
            }
        });

    } else {
        if (data.supreme.autofill == true) {
            $('#supremeAutofill').children().attr('sw', "on");
        }
    
        if (data.supreme.autocheckout == true) {
            $('#supremeAutocheckout').children().attr('sw', "on");
        }

        $('#supCategory').val(data.supreme.category);
        $('#supSize').val(data.supreme.size);
        $('#supPK').val(data.supreme.pk);
        $('#supNK').val(data.supreme.nk);
        $('#supDelay').val(data.supreme.delay);
        $('#supColor').val(data.supreme.color);
    }
});

$(function () {

    document.getElementById('supNK').addEventListener('input', function (e) {
        e.target.value = e.target.value.replaceAll(/[^a-zA-Z ]/g, '').replace(/[ ,]+/g, ", ");
    })

    document.getElementById('supPK').addEventListener('input', function (e) {
        e.target.value = e.target.value.replaceAll(/[^a-zA-Z ]/g, '').replace(/[ ,]+/g, ", ");
    })

    //Regex regex = new Regex("^[A-Za-z]+$");
    //#supColor
    //$(this).val(text.replace(/[^A-Za-z]/g,''));
    document.getElementById('supColor').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^A-Za-z]/g,'');
    })

    $('button[id="supremeAutofill"]').on('click', function () {
        chrome.storage.local.get("supreme", function (data) {
            var status = new Object();
            console.log($('#supremeAutofill').children().attr('sw'));

            if ($('#supremeAutofill').children().attr('sw') == "on") {
                $('#supremeAutofill').children().attr('sw', "off");
                status = {
                    'category': $('#supCategory').val(),
                    'size': $('#supSize').val(),
                    'pk': $('#supPK').val(),
                    'nk': $('#supNK').val(),
                    'delay': $('#supDelay').val(),
                    'color': $('#supColor').val(),
                    'autofill': false,
                    'autocheckout': data.supreme.autocheckout
                }

            } else {
                status = {
                    'category': $('#supCategory').val(),
                    'size': $('#supSize').val(),
                    'pk': $('#supPK').val(),
                    'nk': $('#supNK').val(),
                    'delay': $('#supDelay').val(),
                    'color': $('#supColor').val(),
                    'autofill': true,
                    'autocheckout': data.supreme.autocheckout
                }
                $('#supremeAutofill').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'supreme': status });
        });
    });

    $('#supremeAutocheckout').on('click', function () {
        chrome.storage.local.get("supreme", function (data) {
            var status = new Object();

            if ($('#supremeAutocheckout').children().attr('sw') == "on") {
                $('#supremeAutocheckout').children().attr('sw', "off");
                status = {
                    'category': $('#supCategory').val(),
                    'size': $('#supSize').val(),
                    'pk': $('#supPK').val(),
                    'nk': $('#supNK').val(),
                    'delay': $('#supDelay').val(),
                    'color': $('#supColor').val(),
                    'autofill': data.supreme.autofill,
                    'autocheckout': false
                }
            } else {
                status = {
                    'category': $('#supCategory').val(),
                    'size': $('#supSize').val(),
                    'pk': $('#supPK').val(),
                    'nk': $('#supNK').val(),
                    'delay': $('#supDelay').val(),
                    'color': $('#supColor').val(),
                    'autofill': data.supreme.autofill,
                    'autocheckout': true
                }
                $('#supremeAutocheckout').children().attr('sw', "on");
            }

            chrome.storage.local.set({ 'supreme': status });
        });
    });

    $(document).on('change', 'input', function () {
        getInputs();
    });

    $("#clearCartBtn").on('click', function () {
        var newWindow = window.open(`https://www.supremenewyork.com/shop/cart`, 'single');
    });
 
    //start supreme bot
    $("#supStartBtn").on('click', function () {
        chrome.storage.local.get("supreme", function (data) {
            if (data.supreme) {
                let missed = 0;

                Object.keys(data.supreme).forEach(id => {
                    //for each field id except autofill and autocheckout
                    if ((id != 'autofill') && (id != 'autocheckout')) {
                        if ((data.supreme[id] == null) || (data.supreme[id] == "")) {
                            missed++;
                        }
                    }
                });

                if (missed == 0) {
                    //execute supreme script that searches for the item
                    var newWindow = window.open(`https://www.supremenewyork.com/shop/all/${data.supreme['category']}`, 'single');
                } else {
                    iziToast.error({
                        title: `Fill all the empty fields first`,
                        description: 'you have missed some of the upper input fields',
                        backgroundColor: 'red',
                        position: 'topCenter',
                        icon: '',
                        titleColor: 'white',
                        timeout: 2500
                    });
                }
            }

        });

    });   
});

function getInputs() {
    chrome.storage.local.get("supreme", function (data) {
        var status = {
            'category': $('#supCategory').val(),
            'size': $('#supSize').val(),
            'pk': $('#supPK').val(),
            'nk': $('#supNK').val(),
            'delay': $('#supDelay').val(),
            'color': $('#supColor').val(),
            'autofill': data.supreme.autofill,
            'autocheckout': data.supreme.autocheckout
        }
        chrome.storage.local.set({ 'supreme': status });
    });
};
