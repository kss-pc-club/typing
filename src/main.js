import {fileLoad, progressbarSet} from "./databaseLoader";
import {keyboardGen} from "./keyboard";

document.addEventListener("DOMContentLoaded", ()=>{
	progressbarSet(0);
	fileLoad();
	keyboardGen();
});