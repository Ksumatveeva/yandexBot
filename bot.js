// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Vasilyeva Ksenia
// @match        https://ya.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

///["Школа юных джентльменов", "Робототехника в технопарке Наукоград"]
let links = document.links;
let btn = document.getElementsByClassName("search3__button")[0];
let keywords = ["Логоленд", "О  LOGOLAND", "Познакомьтесь со специалистами в Вашем городе!"];
let keyword = keywords[getRandom(0, keywords.length)];
if (btn !== undefined) {
    //Работает на главной странице
    document.getElementsByName("text")[0].value = keyword;
    btn.click();
}
else {
    //Работает в поисковой выдаче
    for( let i = 0; i < links.length; i++) {
        if(links[i].href.indexOf("https://xn--c1accwbndb.xn--p1ai/") != -1) {
            let link = links[i];
            console.log("Нашел строку " + link);
            link.click();
            break;
        }
    }
}
function getRandom(min, max){
return Math.floor(Math.random() * (max - min) + min)
}
