const $ = require("jquery")

const keyboardGen = () => {
	for (let i = 10; i < 36; i++) {
		const key = document.createElement("div");
		key.classList.add("key");
		key.innerText = i.toString(36).toUpperCase();
		key.style.gridArea = i.toString(36).toLowerCase();
		key.id = i.toString(36).toLowerCase();
		document.querySelector(".container#main .keyboard").appendChild(key);
	}
}

/**
 * @description KeyCode -> Char
 * @param {String} c Key
 * @returns {String} Char
 */
const code2char = c => {
	if (c === 'Space') return ' ';
	if (c === 'Backspace') return '\b';
	if (c === 'Enter') return '\n';
	if (c === 'Tab') return '\t';
	return c.toLowerCase();
}

window.addEventListener("keydown", e => {
	e.preventDefault();
	$(`.key#${code2char(e.key)}`).addClass("pressing");
});
window.addEventListener("keyup", e => {
	e.preventDefault();
	$(`.key#${code2char(e.key)}`).removeClass("pressing");
});

export { keyboardGen, code2char }