const elChangeThemeBtn = document.querySelector(".site-header-theme-button");
const elForm = document.querySelector(".form-content");
const elSelectForm = document.querySelector(".select-form ");
const elInputSearch = document.querySelector(".search-input");
const elSelectRegion = document.querySelector(".select-region");
const elList = document.querySelector(".flag-list");
const elTemplate = document.querySelector(".template").content;
const fragment = document.createDocumentFragment();
const elText = document.querySelector(".title");
let data;
let apiAll = `https://restcountries.com/v3.1/all`;

//Modal elements 
const elModal = document.querySelector(".modal-info");
const modalImg = document.querySelector(".img");
const modalCountryName = document.querySelector(".country");
const modalRegion = document.querySelector(".modalregion");
const modalCurrency = document.querySelector(".currency");
const modalBorders = document.querySelector(".borders");
const modalLanguage = document.querySelector(".language");
const modalSubRegion = document.querySelector(".subregion");
const modalMap = document.querySelector(".maps");

async function createList(api) {
    elList.innerHTML = "";
    try {
        const res = await fetch(api);
        data = await res.json();

        for (const element of data) {
            console.log(element);

            const clonedTemplate = elTemplate.cloneNode(true);
            clonedTemplate.querySelector(".flag-img").src = element.flags.svg;
            clonedTemplate.querySelector(".topic").textContent = element.name.official;
            clonedTemplate.querySelector(".population-c").textContent = element.population;
            clonedTemplate.querySelector(".region-r").textContent = element.region;
            clonedTemplate.querySelector(".capital-c").textContent = element.capital;
            clonedTemplate.querySelector(".more-info").dataset.id = element.name.common;

            fragment.appendChild(clonedTemplate);
        }
        elList.appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}

function moreInfo(nameId) {
    let foundCountry = data.find((element) => {
        return element.name.common === nameId;
    })

    elText.textContent = foundCountry.name.official;

    modalImg.src = foundCountry.flags.svg;
    modalCountryName.textContent = foundCountry.name.official;
    modalRegion.textContent = foundCountry.region;

    let currency = Object.keys(foundCountry.currencies)
    modalCurrency.textContent = currency.join(", ");
    modalBorders.textContent = foundCountry.borders.join(", ");

    let language = Object.values(foundCountry.languages);
    modalLanguage.textContent = language.join(", ");
    modalSubRegion.textContent = foundCountry.subregion;
    modalMap.href = foundCountry.maps.googleMaps;
}

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".more-info")) {
        moreInfo(evt.target.dataset.id);
    }
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let value = elInputSearch.value.trim();
    if (value.length > 0) {
        createList(`https://restcountries.com/v3.1/name/${value}`)
    } 
})

elSelectForm.addEventListener("change", function (evt) {
    evt.preventDefault();
    elList.innerHTML = "";
    let regionValue = elSelectRegion.value;
    createList(`https://restcountries.com/v3.1/region/${regionValue}`)
})

elChangeThemeBtn.addEventListener("click", function () {
    document.body.classList.toggle("theme-dark");
});

createList(apiAll)