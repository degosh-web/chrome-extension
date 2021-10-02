$(document).ready(function () {
    var exitAppModal = document.getElementById("exitAppModal");
    $("#logout").on("click", function () {
        exitAppModal.style.display = "block";
    });

    $("#exitAppNoBtn").on("click", function () {
        exitAppModal.style.display = "none";
    });

    var resetAllModal = document.getElementById("resetAllModal");
    $("#resetA").on("click", function () {
        resetAllModal.style.display = "block";
    });
    $("#resetAllNoBtn").on("click", function () {
        resetAllModal.style.display = "none";
    });
    $("#resetAllYesBtn").on("click", function () {
        resetAllModal.style.display = "none";
    });

    var resetPfofilesModal = document.getElementById("resetProfilesModal");
    $("#resetP").on("click", function () {
        resetPfofilesModal.style.display = "block";
    });
    $("#resetProfilesNoBtn").on("click", function () {
        resetPfofilesModal.style.display = "none";
    });
    $("#resetProfilesYesBtn").on("click", function () {
        resetPfofilesModal.style.display = "none";
    });
});

$(function () {
    chrome.storage.local.get('theme', function (mode) {
        if (mode.theme) {
            if (mode.theme == 'dark') {
                $('#switchTheme').attr('mode', 'dark');
                $('#switchTheme').html('Light theme');
                $('head').append('<link rel="stylesheet" href="darkmode.css">');
            }
        }
    });

    $('#switchTheme').on('click', function () {
        if ($(this).attr('mode') == 'light') {
            $(this).attr('mode', 'dark');
            $(this).html('Light theme');
            chrome.storage.local.set({ 'theme': 'dark' });
        } else {
            $(this).attr('mode', 'light');
            $(this).html('Dark theme');
            chrome.storage.local.set({ 'theme': 'light' });
        }
        location.reload();
    });

    $('#resetProfilesYesBtn').on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
        location.reload();
    });

    $('#resetAllYesBtn').on('click', function () {
        chrome.storage.local.set({ 'profiles': new Array() });
        chrome.storage.local.set({ 'proxy': new Object() });
        chrome.storage.local.set({ 'discord': new Object() });
        chrome.storage.local.set({ 'adidas': new Object() });
        chrome.storage.local.set({ 'dns': new Object() });
        chrome.storage.local.set({ 'kith': new Object() });
        chrome.storage.local.set({ 'shopify': new Object() });
        chrome.storage.local.set({ 'sneakerhead': new Object() });
        chrome.storage.local.set({ 'supreme': new Object() });
        chrome.storage.local.set({ 'tsum': new Object() });
        chrome.storage.local.set({ 'belief': new Object() });
        chrome.storage.local.set({ 'soto': new Object() });
        chrome.storage.local.set({ 'solebox': new Object() });
        chrome.storage.local.set({ 'stripe': new Object() });
        chrome.storage.local.set({ 'streetbeat': new Object() });
        chrome.storage.local.set({ 'lamoda': new Object() });
        chrome.storage.local.set({ 'yoomoney': new Object() });
        chrome.storage.local.set({ 'switcher': new Object() });
        location.reload();
    });

    $('#exitAppYesBtn').on('click', function () {
        chrome.storage.local.set({ 'license': null });
        location.reload();
    });
});