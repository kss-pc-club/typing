import {fileLoad, progressbarSet} from "./databaseLoader";
import {keyboardGen} from "./keyboard";
import {sleep} from "./commonFunc";
const $ = require("jquery");

document.addEventListener("DOMContentLoaded", ()=>{
	progressbarSet(0);
	fileLoad();
	keyboardGen();

	const pressStart = async e=>{
		if(!$(".container#start").hasClass("showing")) return;
		if(e.keyCode === 32){  // Space
			window.removeEventListener("keydown", pressStart);
			const $e = $(".container#start p");
			$e.text("3");
			await sleep(1000);
			$e.text("2");
			await sleep(1000);
			$e.text("1");
			await sleep(1000);
			$e.text("Start!");
			await sleep(1000);
			$(".container#start").removeClass("showing");
			$(".container#main").addClass("showing");
		}
	}
	window.addEventListener("keydown", pressStart);
});
