const $ = require("jquery");
import {sleep, fade} from "./commonFunc";

const loadFile = ["basic/a", "acronym"];

window.database = [];

/**
 * @description Progress Barの読み込み具合変更
 * @param {Number} p 読み込みファイル数
 */
const progressbarSet = async p=>{
	const $bar = $("div.container#loader #bar");
	$("div.container#loader p#progressMsg").text(`${p} / ${loadFile.length}`);
	$bar.animate({width: `${(p/loadFile.length)*100}%`}, 200);
	const rad = $bar.width() - 400 + 18;
	$bar.css({borderTopRightRadius: rad, borderBottomRightRadius: rad});
	await sleep(200);
}

const fileLoad = async ()=>{
	for(let i=0; i<loadFile.length; i++){
		const e = loadFile[i];
		await fetch(`./database/${e}.json`).then(r=>r.text()).then(t=>JSON.parse(t)).then(j=>{
			for(let i=0; i<j.length; i++){
				window.database.push(j[i]);
			}
		});
		await progressbarSet(i+1);
	}
	fade(".container#loader", ".container#start")
}

export {fileLoad, progressbarSet}