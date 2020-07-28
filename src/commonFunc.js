const $ = require("jquery");

/**
 * @description 指定されたミリ秒待つ
 * @param {Number} t ミリ秒数
 * @returns {Promise}
 */
const sleep = t => new Promise(r => setTimeout(r, t));

/**
 * @description フェードアニメーション
 * @param {String} b 消える要素セレクタ
 * @param {String} a 現れる要素セレクタ
 */
const fade = async (b, a) => {
	$(b).fadeOut(500);
	await sleep(500);
	$(a).fadeIn(500).css("display", "grid");
	await sleep(499);
	$(b).removeClass("showing").removeAttr("style");
	$(a).addClass("showing").removeAttr("style");
}

Array.prototype.min = function () {
	let m = 1e5;
	this.forEach(_ => {
		m = (_ < m) ? _ : m;
	});
	return m;
}

export { sleep, fade }