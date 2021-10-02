const changeValue = (query, value) => {
    let element = {
        value: ''
    };

    if (document.querySelectorAll(query).length) {
        element = document.querySelectorAll(query);
    } else if ($('#' + query).length) {
        element = document.querySelectorAll('#' + query);
    } else if ($('.' + query).length) {
        element = document.querySelectorAll('.' + query);
    } else if ($(`[name*="${query}"]`).length) {
        element = document.querySelectorAll(`[name="${query}"]`);
    } else if ($(`[autocomplete*="${query}"]`).length) {
        element = document.querySelectorAll(`[autocomplete="${query}"]`);
    } else if ($(`[placeholder*="${query}"]`).length) {
        element = document.querySelectorAll(`[placeholder="${query}"]`);
    } else {
        return 0;
    }

    for (let i = 0; i < element.length; i++) {
        if (element[i] && element[i].value == '') {
            element[i].focus();
            element[i].dispatchEvent(new Event('focus'));
            element[i].value = value;
            element[i].dispatchEvent(new Event('change', { bubbles: true }));
            element[i].blur();
            element[i].dispatchEvent(new Event('blur'));
            element[i].focus();
            element[i].dispatchEvent(new Event('focus'));
        }
    }
}

const changeValueI = (el, value) => {
    if (el) {
        el.dispatchEvent(new Event('focus'));
        el.select();
        if (!document.execCommand('insertText', false, value)) {s
            el.value = value;
        }
        el.dispatchEvent(new Event('change', { bubbles: true })); // usually not needed
        el.dispatchEvent(new Event('blur'));
    }
    return el;
}