$(function () {
    $('#export').on('click', function () {
        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        chrome.storage.local.get("profiles", function (obj) {
            console.log(JSON.stringify(obj))
            download("DegoshExtensionProfiles.json", JSON.stringify(obj));
        });
    });

    $('#import').on('click', function () {
        $('#upload').click();

        const input = document.getElementById('upload');
        input.addEventListener('change', function (e) {
            const reader = new FileReader();

            reader.onload = function () {
                console.log(reader.result);
            }

            reader.readAsText(input.files[0]);

            setTimeout(function () {
                chrome.storage.local.get('profiles', function (list) {
                    var newProfilesList = (JSON.parse(reader.result));

                    for (var j = 0; j < list.profiles.length; j++) {
                        for (var i = 0; i < newProfilesList.profiles.length; i++) {
                            if (list.profiles[j].profileName == newProfilesList.profiles[i].profileName) {
                                newProfilesList.profiles[i].profileName += "!";
                            }
                        }
                    }

                    let update = list.profiles;

                    for (var i = 0; i < newProfilesList.profiles.length; i++) {
                        update.push(newProfilesList.profiles[i]);
                    }

                    chrome.storage.local.set({ 'profiles': update });
                    location.reload();
                });
            }, 250);
        });
    });
})