const inputSearch = <HTMLInputElement>document.getElementById("search");
const btn = <HTMLButtonElement>document.getElementById("btn");
const appContainer = <HTMLDivElement>document.getElementById("app-container");
const listContainer = <HTMLDivElement>document.getElementById("list-container");
const closeBtn = <HTMLButtonElement>document.getElementById("close");
const alertDiv = <HTMLDivElement>document.getElementById("alert");


async function fetchRepos(name: string) {
    try {
        alertDiv.classList.add("hidden");
        let resp = await fetch(`https://api.github.com/users/${name}/repos`);
        let data = await resp.json();
        createList(data);
    }
    catch (e) {
        alertDiv.classList.remove("hidden");
    }

}

function createList(repos: any[]) {
    listContainer.childElementCount > 1 ? listContainer.innerHTML = "" : ""
    repos.map((e) => {
        let list = <HTMLDivElement>document.createElement("div");
        list.className = "list";
        let name = <HTMLParagraphElement>document.createElement("p");
        name.innerHTML = `${e.name}`;
        let buttonsContainer = <HTMLDivElement>document.createElement("div");
        buttonsContainer.className = "buttons-container";
        let stars = <HTMLSpanElement>document.createElement("span");
        stars.className = "stars";
        stars.innerHTML = `${e.stargazers_count} Stars`;
        let link = <HTMLAnchorElement>document.createElement("a");
        link.className = "link";
        link.innerText = "Visit";
        link.href = e.html_url;
        buttonsContainer.append(stars, link);
        list.append(name, buttonsContainer);
        listContainer.append(list);
    })
}

btn.onclick = () => {
    fetchRepos(inputSearch.value);
}

closeBtn.onclick = () => alertDiv.classList.add("hidden");