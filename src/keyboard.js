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

const code2char = c=>(Number(c) - 55).toString(36);


window.addEventListener("keydown", e=>{
	e.preventDefault();
	if(e.keyCode >= 65 && e.keyCode <= 90){ $(`.key#${code2char(e.keyCode)}`).addClass("pressing"); }
});
window.addEventListener("keyup", e=>{
	e.preventDefault();
	if(e.keyCode >= 65 && e.keyCode <= 90){ $(`.key#${code2char(e.keyCode)}`).removeClass("pressing"); }
});

export {keyboardGen, code2char}