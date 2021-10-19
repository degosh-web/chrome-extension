const categories = ['Clothes', 'Tech', 'Bots'];
const mods = ['placeholder', 'supreme', 'kith', 'tsum', 'adidas', 'shopify', 'sneakerhead', 'dns', 'stripe', 'lamoda', 'belief', 'soto', 'naked', 'supreme', 'solebox', 'yoomoney', 'streetbeat', 'solana'];

$(document).ready(function () {
	$('span[class*="category"]').on('click', function () {
		select($(this).attr('id'));
		if ($(this).attr('s') == 'true') {
			$(this).attr('s', 'false');
			checkCategories();
		} else {
			$('[s="true"]').attr('s', 'false');
			$(this).attr('s', 'true');
		}
	});

	$('span[class*="module"]').on('click', function () {
		if ($(this).attr('c') == 'true') {
			$(this).attr('c', 'false');
			checkModules();
		} else {
			$('[c="true"]').attr('c', 'false');
			$(this).attr('c', 'true');
			swapSettings($(this).attr('id'));
		}
	});

	updateProfiles();
});

function select(id) {
	$('span[class="module"]').hide();
	$('#currentCategory').html(id);
	for (i in categories) {
		if (categories[i] == id) {
			$(`span:contains("${categories[i]}")`).show();
		}
	}
}

function checkCategories() {
	if (!$('[s="true"]').length) {
		$('span[class="module"]').show();
		$('#currentCategory').html("All");
	}
}

function swapSettings(id) {
	$(`[id="${id}Module"]`).attr('style', 'display: flex');
	for (let i = 0; i < mods.length; i++) {
		if (mods[i] != id) {
			$(`[id="${mods[i]}Module"]`).attr('style', 'display: none');
		}
	}
}

function checkModules() {
	if (!$('[c="true"]').length) {
		for (let i = 0; i < mods.length; i++) {
			if (mods[i] != 'placeholder') {
				$(`[id="${mods[i]}Module"]`).attr('style', 'display: none');
			}
		}
		$('[id="placeholderModule"]').attr('style', 'display: flex');
	}
}

function updateProfiles() {
	const containerOptions = document.querySelector(".container-options");

	const selected = document.querySelector(".selected");

	chrome.storage.local.get('profiles', function (list) {
		if (list.profiles) {
			for (var i = 0; i < list.profiles.length; i++) {
				containerOptions.insertAdjacentHTML('beforeend', 
				`<div class="option" id="option-${i}">
					<input type="radio" class="radio" id="${i}" name="category" />
					<label for="${i}">${list.profiles[i].profileName}</label>
				</div>`);

				if (list.profiles[i].selected == true) {
					selected.innerHTML = list.profiles[i].profileName
				}
			}
		}

		selected.addEventListener("click", () => {
			containerOptions.classList.toggle("active");
		});

		$('div[id^="option"]').on('click', function () {
			selected.innerHTML = (this).querySelector("label").innerHTML;
			containerOptions.classList.remove("active");

			for (var i = 0; i < list.profiles.length; i++) {
				if (this.querySelector("label").innerHTML == list.profiles[i].profileName) {
					list.profiles[i].selected = true;
					chrome.storage.local.set({ 'profiles': list.profiles });	
				}

				if (list.profiles[i].profileName == selected.innerHTML) {
					list.profiles[i].selected = true;
					chrome.storage.local.set({ 'profiles': list.profiles });
				} else {
					list.profiles[i].selected = false;
					chrome.storage.local.set({ 'profiles': list.profiles });
				}
			}
		});

    });
}