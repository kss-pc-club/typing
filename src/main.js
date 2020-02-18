import {fileLoad, progressbarSet} from "./databaseLoader";

document.addEventListener("DOMContentLoaded", ()=>{
	progressbarSet(0);
	fileLoad();
});