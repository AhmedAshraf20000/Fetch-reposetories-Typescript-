"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inputSearch = document.getElementById("search");
const btn = document.getElementById("btn");
const appContainer = document.getElementById("app-container");
const listContainer = document.getElementById("list-container");
const closeBtn = document.getElementById("close");
const alertDiv = document.getElementById("alert");
console.log(listContainer.childElementCount);
function fetchRepos(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            alertDiv.classList.add("hidden");
            let resp = yield fetch(`https://api.github.com/users/${name}/repos`);
            let data = yield resp.json();
            createList(data);
            console.log(data);
        }
        catch (e) {
            alertDiv.classList.remove("hidden");
        }
    });
}
function createList(repos) {
    listContainer.childElementCount > 1 ? listContainer.innerHTML = "" : "";
    repos.map((e) => {
        let list = document.createElement("div");
        list.className = "list";
        let name = document.createElement("p");
        name.innerHTML = `${e.name}`;
        let buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        let stars = document.createElement("span");
        stars.className = "stars";
        stars.innerHTML = `${e.stargazers_count} Stars`;
        let link = document.createElement("a");
        link.className = "link";
        link.innerText = "Visit";
        link.href = e.html_url;
        buttonsContainer.append(stars, link);
        list.append(name, buttonsContainer);
        listContainer.append(list);
    });
}
btn.onclick = () => {
    fetchRepos(inputSearch.value);
};
closeBtn.onclick = () => alertDiv.classList.add("hidden");
