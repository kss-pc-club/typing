const $ = require('jquery');
import {sleep} from "./commonFunc"

const scoreShow = async data=>{
	const correct = data.correctType;
	const incorrect = data.incorrectType;
	const totalType = correct + incorrect;
	const correctRate = Math.round((correct / totalType) * 10000) / 100;
	const score = Math.round(correct**2 / totalType * 100);
	console.log(`Correct Type: ${correct}\nIncorrect Type: ${incorrect}\nTotal: ${totalType}\nCorrect Rate: ${correctRate}\nScore: ${score}`);
	$('div.container#score p#correct').text(correct)
	$('div.container#score p#incorrect').text(incorrect)
	$('div.container#score p#total').text(totalType)
	$('div.container#score p#rate').text(correctRate)
	$('div.container#score p#scoreT').html(`${score}<br><span>正タイプ数(${correct}) × 正タイプ率(${correctRate}%) × 100</span>`)
	$('div.container#score button').click(()=>{
		if(confirm("スコアを記録しましたか？\n記録しないと、レーティングの得点に加算されません。\n（練習として行っている場合はOKを押してください）")){
			location.href = "https://github.com/KSS-PC-Club/";
		}
	})

	await sleep(3000);
	let _ = 1, __ = String(score), ___ = "", _____=~~(Math.log10(score))+1;
	let fps = 30;
	const timer = setInterval(()=>{
		if(_>_____*fps){
			return;
		}
		const rand = Math.floor(Math.random() * 10);
		let ____ = String(rand)
		if(_ % fps === 0){ ____ = __[_____-Math.floor(_/fps)]; }
		$('div.container#score p#score').text(____ + ___);
		if(_ % fps === 0){ ___ = ____ + ___};
		_++;
	},30);
	await sleep(30*fps*_____)
	clearInterval(timer)
	$('div.container#score .con').fadeIn(1000);
};

export {scoreShow};