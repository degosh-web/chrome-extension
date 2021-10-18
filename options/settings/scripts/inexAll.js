const list = ["profiles", "proxy", "switcher", "theme", "discord", "adidas", "dns", "kith", "shopify", "sneakerhead", "supreme", "shopify", "dns", "naked", "solebox", "soto", "stripe", "belief", "yoomoney", "streetbeat", "lamoda", "solana"];

$(function () {
    $('#exportAll').on('click', function () {
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        var exportData = new Object;


        for (let i in list) {
            chrome.storage.local.get(list[i], function (data) {
                let method = list[i];
                exportData[method] = data[method];
            });
        }

        setTimeout(() => {
            download("extensionAllData.degosh", JSON.stringify(exportData));
        }, 650);
    });

    $('#importAll').on('click', function () {
        $('#uploadAll').click();

        const input = document.getElementById('uploadAll');
        input.addEventListener('change', function (e) {
            const reader = new FileReader();

            reader.onload = function () {
                let allData = reader.result;
                allData= JSON.parse(allData);

                chrome.storage.local.set({ 'profiles': allData.profiles });
                chrome.storage.local.set({ 'proxy': allData.proxy });
                chrome.storage.local.set({ 'discord': allData.discord });
                chrome.storage.local.set({ 'adidas': allData.adidas });
                chrome.storage.local.set({ 'dns': allData.dns });
                chrome.storage.local.set({ 'kith': allData.kith });
                chrome.storage.local.set({ 'shopify': allData.shopify });
                chrome.storage.local.set({ 'sneakerhead': allData.sneakerhead });
                chrome.storage.local.set({ 'supreme': allData.supreme });
                chrome.storage.local.set({ 'tsum': allData.tsum });
                chrome.storage.local.set({ 'stripe': allData.stripe });
                chrome.storage.local.set({ 'solebox': allData.solebox });
                chrome.storage.local.set({ 'soto': allData.soto });
                chrome.storage.local.set({ 'belief': allData.belief });
                chrome.storage.local.set({ 'yoomoney': allData.yoomoney });
                chrome.storage.local.set({ 'streetbeat': allData.streetbeat });
                chrome.storage.local.set({ 'lamoda': allData.lamoda });
                chrome.storage.local.set({ 'solana': allData.solana });
                chrome.storage.local.set({ 'switcher': allData.switcher });
                chrome.storage.local.set({ 'theme': allData.theme });
            }

            reader.readAsText(input.files[0]);
            location.reload();
        });
    });
});
