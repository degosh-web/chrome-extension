chrome.storage.local.get('theme', function (mode) {
	if (mode.theme) {
		if (mode.theme == 'dark') {
			$('#switchTheme').attr('mode', 'dark');
			$('#switchTheme').html('Light theme');
			$('head').append('<link rel="stylesheet" href="darkmode.css">');
		}
	}
});

//оставляем квадратик зеленым или делаем серым еще до загрузки страницы
window.onload = function () {
	chrome.storage.local.get('switcher', (sw) => {
		if (sw.switcher == undefined) {
			chrome.storage.local.set({ 'swithcer': false });
		}

		if (sw.switcher) {
			$('#globalSwitcherBtn').children().attr('sw', "on");
			chrome.browserAction.setBadgeBackgroundColor({ color: '#9866FF' }, () => {
				chrome.browserAction.setBadgeText({ text: 'On' });
			});
		} else {
			chrome.browserAction.setBadgeText({});
		}
	});
}



//как только загрузилась стрница
$(document).ready(function () {
	//переключалка global switcher, которая перезаписывает
	//булевую true/false переменную в storage
	$('#globalSwitcherBtn').on('click', function () {
		chrome.storage.local.get('switcher', function (sw) {
			if ($('#globalSwitcherBtn').children().attr('sw') == "on") {
				$('#globalSwitcherBtn').children().attr('sw', "off");
				chrome.browserAction.setBadgeText({});
				sw.switcher = false;
				chrome.storage.local.set({ 'switcher': sw.switcher });
			} else {
				$('#globalSwitcherBtn').children().attr('sw', "on");
				chrome.browserAction.setBadgeBackgroundColor({ color: '#9866FF' }, () => {
					chrome.browserAction.setBadgeText({ text: 'On' });
				});
				sw.switcher = true;
				chrome.storage.local.set({ 'switcher': sw.switcher });
			}
		});
	});

	//кнопка открытия options
	$('#settingsBtn').on("click", function () {
		window.open("../options/options.html");
	});

	//переменная дива с опшенами
	const containerOptions = document.querySelector(".container-options");

	//переменная верхней хуйни селекта
	const selected = document.querySelector(".selected");

	//заполняем селект профилями
	chrome.storage.local.get('profiles', function (list) {
		//принт какие селектед а какие нет
		//убрать
		if (list.profiles) {
			for (var i = 0; i < list.profiles.length; i++) {
				console.log(i);
				console.log(list.profiles[i].selected);
			}
		}

		//заполняем
		if (list.profiles) {
			for (var i = 0; i < list.profiles.length; i++) {
				containerOptions.insertAdjacentHTML('beforeend',
					`<div class="option" id="option-${i}">
					<input type="radio" class="radio" id="${i}" name="category" />
					<label for="${i}">${(list.profiles[i]).profileName}</label>
				</div>`);

				if (list.profiles[i].selected == true) {
					selected.innerHTML = list.profiles[i].profileName
				}
			}
		}

		//как только кликаем по верхней хуйне селекта
		selected.addEventListener("click", () => {
			//разворачиваем или сворачиваем опшены
			containerOptions.classList.toggle("active");
		});

		//по нажатию на какой-либо опшн - записывать его вместо плейсхолдера
		$('div[id^="option"]').on('click', function () {
			console.log((this).querySelector("label").innerHTML);
			selected.innerHTML = (this).querySelector("label").innerHTML;
			containerOptions.classList.remove("active");

			//проверяем какой был нажат и делаем его selected
			for (var i = 0; i < list.profiles.length; i++) {
				//если имя нажатого совпадает с именем какого-то профиля - то он был нажат
				if (this.querySelector("label").innerHTML == list.profiles[i].profileName) {
					list.profiles[i].selected = true;
					chrome.storage.local.set({ 'profiles': list.profiles });
				}

				//если имя какого-то профиля совпадает с тем, что наверху селекта
				if (list.profiles[i].profileName == selected.innerHTML) {
					//то сделать этому профилю selected = true
					list.profiles[i].selected = true;
					chrome.storage.local.set({ 'profiles': list.profiles });
				} else {
					//иначе selected = false
					list.profiles[i].selected = false;
					chrome.storage.local.set({ 'profiles': list.profiles });
				}
			}
		});

	});

});
