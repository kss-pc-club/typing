const $ = require("jquery");
import {sleep, fade} from "./commonFunc";

// 読み込むファイル
const loadFile = [
	// ベーシック系
	"basic/a",
	"basic/b",
	"basic/c",
	"basic/d",
	"basic/e",
	"basic/f",
	"basic/g",
	"basic/h",
	"basic/i",
	"basic/l",
	"basic/m",
	"basic/n",
	"basic/o",
	"basic/p",
	"basic/q",
	"basic/r",
	"basic/s",
	"basic/t",
	"basic/u",
	"basic/v",
	"basic/w",

	// アドバンスト系
	"advanced/a",
	"advanced/b",
	"advanced/c",
	"advanced/d",
	"advanced/e",
	"advanced/f",
	"advanced/g",
	"advanced/h",
	"advanced/i",
	"advanced/l",
	"advanced/m",
	"advanced/n",
	"advanced/o",
	"advanced/p",
	"advanced/q",
	"advanced/r",
	"advanced/s",
	"advanced/t",
	"advanced/u",
	"advanced/v",
	"advanced/w",
	"advanced/z",

	// 前提系
	"premise/a",
	"premise/b",
	"premise/c",
	"premise/d",
	"premise/e",
	"premise/f",
	"premise/g",
	"premise/h",
	"premise/i",
	"premise/j",
	"premise/k",
	"premise/l",
	"premise/m",
	"premise/n",
	"premise/o",
	"premise/p",
	"premise/r",
	"premise/s",
	"premise/t",
	"premise/u",
	"premise/v",
	"premise/w",
	"premise/y",

	// その他
	"acronym",
	"reserved",
	"short"
];

window.database = [];

/**
 * @description Progress Barの読み込み具合変更
 * @param {Number} p 読み込みファイル数
 */
const progressbarSet = async p=>{
	const $bar = $("div.container#loader #bar");
	$("div.container#loader p#progressMsg").text(`${p} / ${loadFile.length}`);
	$bar.animate({width: `${(p/loadFile.length)*100}%`}, 100);
	const rad = $bar.width() - 400 + 18;
	$bar.css({borderTopRightRadius: rad, borderBottomRightRadius: rad});
	await sleep(100);
}

const fileLoad = async ()=>{
	console.groupCollapsed("Database Load");
	for(let i=0; i<loadFile.length; i++){
		const e = loadFile[i];
		await fetch(`./database/${e}.json`).then(r=>r.text()).then(t=>JSON.parse(t)).then(j=>{
			for(let i=0; i<j.length; i++){
				window.database.push(j[i]);
			}
		}).catch(r=>console.error(`File: ${e}.json\n`,r));
		await progressbarSet(i+1);
	}
	console.groupEnd("Database Load");
	fade(".container#loader", ".container#start")
}

export {fileLoad, progressbarSet}