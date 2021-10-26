chrome.storage.local.get('switcher', function (st) {
    if (st.switcher) {
        chrome.runtime.onConnect.addListener(function (port) {
            if (port.name == "dublicateDone") {
                port.onMessage.addListener(function (response) {
                    if (response.notify) {
                        iziToast.success({
                            title: 'New dublicate',
                            message: '',
                            position: 'topCenter'
                        });
                    }
                });
            }
        });

        chrome.storage.local.get('solana', function (data) {
            if (data.solana.autocheckout == true && !location.href.includes('google') && !location.href.includes('yandex.ru') && !location.href.includes('youtube.com') && !location.href.includes('vk.com') && !location.href.includes('twitter.com') && !location.href.includes('discord') && !location.href.includes('gmail.com') && !location.href.includes('sheltercook') && !location.href.includes('mail.ru')) {
                let mintClick = setInterval(() => {
                    $('span:contains("MINT")').parent().click();
                    $('span:contains("Mint")').parent().click();
                    $('span:contains("mint")').parent().click();
                    $('button:contains("Mint")').click();
                    $('button:contains("mint")').click();
                    $('button:contains("MINT")').click();
                    $('button:contains("for")').click();
                    $('button:contains("For")').click();
                    $('button[id*="Mint"]').click();
                    $('button[id*="mint"]').click();
                    $('h1:contains("Mint")').parent().parent().click();
                    $('h1:contains("MINT")').parent().parent().click();
                    $('h1:contains("mint")').parent().parent().click();
                    $('h2:contains("Mint")').parent().parent().click();
                    $('h2:contains("MINT")').parent().parent().click();
                    $('h2:contains("mint")').parent().parent().click();
                    $('h3:contains("Mint")').parent().parent().click();
                    $('h3:contains("MINT")').parent().parent().click();
                    $('h3:contains("mint")').parent().parent().click();
                    $('h3:contains("mint")').parent().click();
                    $('h1:contains("Mint")').parent().click();
                    $('h1:contains("MINT")').parent().click();
                    $('h1:contains("mint")').parent().click();
                    $('h2:contains("Mint")').parent().click();
                    $('h2:contains("MINT")').parent().click();
                    $('h2:contains("mint")').parent().click();
                    $('h3:contains("Mint")').parent().click();
                    $('h3:contains("MINT")').parent().click();
                    $('h3:contains("mint")').parent().click();
                    $('h3:contains("mint")').parent().click();
                    $('h3:contains("Mint")').parent().click();
                    $('p:contains("MINT")').parent().click();
                    $('p:contains("mint")').parent().click();
                    $('p:contains("mint")').parent().click();
                    $('a:contains("MINT")').parent().click();
                    $('a:contains("mint")').parent().click();
                    $('a:contains("mint")').parent().click();
                }, 200);
            }
        });
    }
});