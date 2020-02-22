const $ = require("jquery");
import {sleep, fade} from "./commonFunc";
import {scoreShow} from "./score";
import {code2char} from "./keyboard";

const time = 3000;  // 5min00.0s
let secRemaining = time;
let datas = {
	"correctType": 0,
	"incorrectType": 0
}
let typedChar = "";
let nowChar = "";
let remainingChar = "";
let nextWord = "";

const colors = [{
	// 残り時間が5%以下なら#f00
	cond: 5,
	color: "#f00"
},{
	cond: 30,
	color: "#ff0"
},{
	cond: 100,
	color: "#080"
}]

/**
 * @description 時間をフォーマットします。
 * @param {Number} t secRemaining
 * @returns {String} ${min}分${sec}秒
 */
const formatSec = t=>{
	const min = Math.floor(t / 600);
	let sec = (t % 600) / 10;
	sec = (sec < 10)?"0"+String(sec):String(sec);
	sec += (Number(sec) % 1 ===0)?".0":"";
	return `${min}分${sec}秒`;
}


const progressBarUpdate = ()=>{
	const percentage = secRemaining / time;

	const color = colors.filter(e=>e.cond === colors.filter(e=>(e.cond >= percentage * 100)).map(c=>c.cond).min())[0].color;

	$(".container#main .timeRemainingBar_container #bar").css({
		width: `${percentage * 100}%`,
		background: color
	});
}

const mainGame = ()=>{
	const fn = e=>{
		// 押すべきキー == 今押されたキー
		if(nowChar.toLowerCase() === code2char(e.keyCode)){
			datas.correctType++;

			typedChar += nowChar;
			nowChar = remainingChar[0];

			// 次押すキー != Null
			if(nowChar){
				remainingChar = remainingChar.substring(1);
			}
			else{
				if(window.database.length === 0 && !nextWord.en){
					alert("どうやらデータベースのすべてを打ち終わってしまったようです。");
					return;
				}
				// 残りキー = 次の単語
				remainingChar = nextWord.en.substring(1);
				nowChar = nextWord.en[0];
				$(".container#main .jap div.center").text(nextWord.ja);
				$(".container#main .pho div.center").text(nextWord.ph);
				typedChar = "";

				if(window.database.length !== 0){
					// ランダム生成
					const rand = Math.floor(Math.random() * window.database.length);
					nextWord = window.database[rand];

					// カッコ内を取り除く
					let tmp = nextWord.en.split("("); nextWord.en = tmp[0]; tmp = tmp[1]; nextWord.en += (tmp)?tmp.split(")")[1]:"";

					window.database.splice(rand,1);
				}
				else{ nextWord = {en: "", ja: "", ph: ""} }
				$(".container#main .next div.center").text(nextWord.en);
			}

			// 表示
			$(".container#main .keyboard .key.next").removeClass("next")
			$(".container#main .eng span.typed_char").text(typedChar);
			$(".container#main .eng span.next_char").text(nowChar);
			$(".container#main .eng span.remaining_char").text(remainingChar);
			$(".container#main .keyboard .key#"+nowChar.toLowerCase()).addClass("next");
			$(".container#main .typed").text(datas.correctType);
		}
		else{
			datas.incorrectType++;
		}
	};

	window.addEventListener("keydown", fn);

	const timer = setInterval(async ()=>{
		// 残り時間==0
		if(secRemaining <= 0){
			clearInterval(timer);
			window.removeEventListener("keyup", fn);

			// 「終了！」を表示
			$(".container#main").removeClass("showing");
			$(".container#end").addClass("showing");

			// スコア計算
			scoreShow(datas);
			await sleep(3000);

			// スコア表示
			fade(".container#end", ".container#score");
			return;
		}

		// 残り時間があるなら、時間表示
		$("div.container#main .time span#remTime").text(formatSec(secRemaining--));

		progressBarUpdate();
	},100);

	// 最初
	for(let i=0; i<2; i++){
		// ランダム生成
		const rand = Math.round(Math.random() * window.database.length);
		const e = window.database[rand]
		window.database.splice(rand,1);
		if(i===0){
			typedChar = "";
			remainingChar = e.en;
			let tmp = remainingChar.split("("); remainingChar = tmp[0]; tmp = tmp[1]; remainingChar += (tmp)?tmp.split(")")[1]:"";

			nowChar = remainingChar[0];
			remainingChar = remainingChar.substring(1);
			$(".container#main .jap div.center").text(e.ja);
			$(".container#main .pho div.center").text(e.ph);
			$(".container#main .eng span.typed_char").text("");
			$(".container#main .eng span.next_char").text(nowChar);
			$(".container#main .eng span.remaining_char").text(remainingChar);
			$(".container#main .keyboard .key#"+nowChar.toLowerCase()).addClass("next");
		}
		else{
			let tmp = e.en.split("("); e.en = tmp[0]; tmp = tmp[1]; e.en += (tmp)?tmp.split(")")[1]:"";
			nextWord = e;
			$(".container#main .next div.center").text(nextWord.en);
		}
	}
};

export {mainGame};