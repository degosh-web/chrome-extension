setInterval(() => {
    modulesStatus();
}, 150);

function modulesStatus() {
    chrome.storage.local.get("adidas", function (data) {
        if (data.adidas) {
            let activated = 0;

            Object.keys(data.adidas).forEach(id => {
                if (data.adidas[id] == "sizeOn" || data.adidas[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="adidas"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="adidas"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("dns", function (data) {
        if (data.dns) {
            let activated = 0;

            Object.keys(data.dns).forEach(id => {
                if (data.dns[id] == "sizeOn" || data.dns[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="dns"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="dns"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("kith", function (data) {
        if (data.kith) {
            let activated = 0;

            Object.keys(data.kith).forEach(id => {
                if (data.kith[id] == "sizeOn" || data.kith[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="kith"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="kith"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("shopify", function (data) {
        if (data.shopify) {
            let activated = 0;

            Object.keys(data.shopify).forEach(id => {
                if (data.shopify[id] == "sizeOn" || data.shopify[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="shopify"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="shopify"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("sneakerhead", function (data) {
        if (data.sneakerhead) {
            let activated = 0;

            Object.keys(data.sneakerhead).forEach(id => {
                if (data.sneakerhead[id] == "sizeOn" || data.sneakerhead[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="sneakerhead"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="sneakerhead"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("soto", function (data) {
        if (data.soto) {
            let activated = 0;

            Object.keys(data.soto).forEach(id => {
                if ( data.soto[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="soto"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="soto"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("belief", function (data) {
        if (data.belief) {
            let activated = 0;

            Object.keys(data.belief).forEach(id => {
                if ( data.belief[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="belief"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="belief"]').attr('sw', 'true');
                }
            }, 100);
        }
    });
    
    chrome.storage.local.get("naked", function (data) {
        if (data.naked) {
            let activated = 0;

            Object.keys(data.naked).forEach(id => {
                if ( data.naked[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="naked"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="naked"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("solebox", function (data) {
        if (data.solebox) {
            let activated = 0;

            Object.keys(data.solebox).forEach(id => {
                if ( data.solebox[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="solebox"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="solebox"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("supreme", function (data) {
        if (data.supreme) {
            let activated = 0;

            Object.keys(data.supreme).forEach(id => {
                if (data.supreme[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="supreme"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="supreme"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("tsum", function (data) {
        if (data.tsum) {
            let activated = 0;

            Object.keys(data.tsum).forEach(id => {
                if (data.tsum[id] == "sizeOn" || data.tsum[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="tsum"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="tsum"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("stripe", function (data) {
        if (data.stripe) {
            let activated = 0;

            Object.keys(data.stripe).forEach(id => {
                if (data.stripe[id] == "sizeOn" || data.stripe[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="stripe"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="stripe"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("yoomoney", function (data) {
        if (data.yoomoney) {
            let activated = 0;

            Object.keys(data.yoomoney).forEach(id => {
                if (data.yoomoney[id] == "sizeOn" || data.yoomoney[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="yoomoney"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="yoomoney"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("streetbeat", function (data) {
        if (data.streetbeat) {
            let activated = 0;

            Object.keys(data.streetbeat).forEach(id => {
                if (data.streetbeat[id] == "sizeOn" || data.streetbeat[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="streetbeat"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="streetbeat"]').attr('sw', 'true');
                }
            }, 100);
        }
    });

    chrome.storage.local.get("lamoda", function (data) {
        if (data.lamoda) {
            let activated = 0;

            Object.keys(data.lamoda).forEach(id => {
                if (data.lamoda[id] == "sizeOn" || data.lamoda[id] == true) {
                    activated += 1;
                }
            });

            setTimeout(function () {
                if (activated == 0) {
                    $('[class="module"][id="lamoda"]').attr('sw', 'false');
                } else {
                    $('[class="module"][id="lamoda"]').attr('sw', 'true');
                }
            }, 100);
        }
    });
}