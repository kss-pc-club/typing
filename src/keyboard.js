const $ = require("jquery")

const keyboardGen = ()=>{
	for(let i=10; i<36; i++){
		const key = document.createElement("div");
		key.classList.add("key");
		key.innerText = i.toString(36).toUpperCase();
		key.style.gridArea = i.toString(36).toLowerCase();
		key.id = i.toString(36).toLowerCase();
		document.querySelector(".container#main .keyboard").appendChild(key);
	}
}

/**
 * @description KeyCode が Char になり得るか検証
 * @param {Number} c KeyCode
 * @returns {Boolean} True or False
 */
const validateCode = c=>(c >= 65 && c <= 90)

/**
 * @description KeyCode -> Char
 * @param {Number} c KeyCode
 * @returns {String} Char
 */
const code2char = c=>validateCode(c)?((Number(c) - 55).toString(36)):"";

window.addEventListener("keydown", e=>{
	e.preventDefault();
	if(validateCode(e.keyCode)){ $(`.key#${code2char(e.keyCode)}`).addClass("pressing"); }
});
window.addEventListener("keyup", e=>{
	e.preventDefault();
	if(validateCode(e.keyCode)){ $(`.key#${code2char(e.keyCode)}`).removeClass("pressing"); }
});

export {keyboardGen, code2char, validateCode}