// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Vasilyeva Ksenia
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @match        https://www.autorus.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btn = document.getElementsByClassName("search3__button")[0];
let keywords = ["Запчасти для ТО", "Сезонное хранение шин", "Автохимия", "Обслуживание автопарка"];
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName("text")[0];

if (btn !== undefined) {
    let i=0;
    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if(i ==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    }, 500);
} else if (location.hostname == "www.autorus.ru") {
    //Работает на целевом сайте
    console.log("Мы на целевом сайте");
    setInterval(() => {
        let index = getRandom(0, links.length);
        // c долей вероятности 20% пойдет искать обратно
        if (getRandom(0, 101 ) >=80) {
            location.href = "https://ya.ru/";
        }
        //перебирает сслыки и проверяет, что по ним можно кликнуть
        if (links[index].href.indexOf("www.autorus.ru") != -1) links[index].click();
    }, getRandom(2000,5000))
} else {
    let nextYandexPage = true;
    //Работает в поисковой выдаче
    for( let i = 0; i < links.length; i++) {
        if(links[i].href.indexOf("www.autorus.ru") != -1) {
            let link = links[i];
            nextYandexPage = false;
            console.log("Нашел строку " + link);
            link.removeAttribute("target");
            setTimeout(() => {
                link.click();
            }, getRandom(2500, 5000))
            break;
        }
    }
    //если не нашел на первой странице выдачи

    let element = document.getElementsByClassName("Pager-Item_type_next")[0];
    let elementExist = setInterval(() => {
        let actElement = document.getElementsByClassName("Pager-Item_current")[0];
        if (element != undefined) {
            if (actElement.innerText == "7") {
                nextYandexPage = false;
                location.href = "https://ya.ru/";
            }
            clearInterval(elementExist);
        }
    }, 100)
    if (nextYandexPage) {
        setTimeout(() => {
            element.click();
        }, getRandom(3000, 8000))
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}
