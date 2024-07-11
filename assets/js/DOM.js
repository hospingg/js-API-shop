'use strict';

const productAPI = 'https://fakestoreapi.com/products?limit=19'


class Categories {
    constructor(data){
    data.forEach(item => {
        if(this[item.category]){
            this[item.category].push(item)
        }
        else{
            this[item.category] = [item]
        }})
    }
}

let list = {}
fetch(productAPI)
.then(res=>res.json())
.then(data => 
    list = new Categories(data))
.then(list => renderData(list))

const main = document.querySelector('main.wrapper')

function renderData(list){
    const catalogues = Object.keys(list)
    catalogues.forEach(cataloge => 
        {   
            let catalogueList = createCatalogue(cataloge)
            list[cataloge].forEach(item => {
               
                const card = createCard(item)
                catalogueList.append(card)
                
    })});
    return list
}
function createCatalogue(cataloge){
    const catalogue = document.createElement('div')
    catalogue.classList.add('catalogue-container') 

    const catalogueName = document.createElement('h2')
    catalogueName.classList.add('catalogue-name')
    catalogueName.textContent = [cataloge]

    const catalogueList = document.createElement('div')
    catalogueList.classList.add('cardList')
    catalogue.append(catalogueName, catalogueList)
    main.append(catalogue)
    return catalogueList
}

function createCard(item){
    const card = document.createElement('div')
    card.classList.add('card')
    const itemName = renderName(item)
    const itemImg = renderImg(item)
    const description = renderDecs(item)
    const price = renderPrice(item)
    const textContainer = document.createElement('div')
    textContainer.classList.add('text-container')
    textContainer.append( itemName, description, price)
    card.append(itemImg, textContainer)
    return card
}
function renderName(item){
    const itemName = document.createElement('p')
    itemName.textContent = item.title
    itemName.classList.add('item-name')
    return itemName
}
function renderImg(item){
    const itemImg = document.createElement('img')
    itemImg.classList.add('item-img')        
    itemImg.src = item.image
    return itemImg
}
function renderDecs(item){
    const description = document.createElement('span')
    description.classList.add('item-desc')
    description.textContent = item.description
    return description
}
function renderPrice(item){
    const price = document.createElement('span')
    price.classList.add('item-price')
    price.textContent = `${item.price}$`
    return price
}



