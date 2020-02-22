import {fileLoad, progressbarSet} from "./databaseLoader";
import {keyboardGen} from "./keyboard";
import {sleep} from "./commonFunc";
import {mainGame} from "./game";
const $ = require("jquery");

document.addEventListener("DOMContentLoaded", ()=>{

	// Loader の進捗
	progressbarSet(0);
	fileLoad();

	// キーボード生成
	keyboardGen();

	// Press Space to Start
	const pressStart = async e=>{

		// Start が非アクティブならreturn
		if(!$(".container#start").hasClass("showing")) return;

		if(e.keyCode === 32){  // Space

			// このEventListenerを削除
			window.removeEventListener("keydown", pressStart);

			// ここには[Press Space to Start]の<p>が入る
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

			// ゲーム開始
			mainGame();
		}
	}
	window.addEventListener("keydown", pressStart);
});
