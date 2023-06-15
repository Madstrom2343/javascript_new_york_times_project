/* script.js */



const api_key = '8koQMyf484JhsfGPZOt0VuIJspAhHXsM' // the home is what to change
const url = "http://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=" + api_key

const select = document.querySelector('#section')
const stories = document.querySelector('#stories')
const refresh = document.querySelector('#refresh')

function cardMaker(story) {
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('shadow')
    card.classList.add('mt-4')

    let img = document.createElement('img')
    // img.style.backgroundImage = `url(${story.multimedia[0].url})`
    img.setAttribute('src', story.multimedia[0].url)
    img.setAttribute('alt', story.multimedia[0].caption)
    img.classList.add('card-img-top')
    img.classList.add('articleImage')
    card.appendChild(img)

    let div = document.createElement('div')
    div.classList.add('card-body')
    card.appendChild(div)

    let h5 = document.createElement('h5')
    h5.innerText = story.title
    h5.classList.add('card-title')
    div.appendChild(h5)

    let byLine = document.createElement('p')
    byLine.classList.add('card-text')
    byLine.classList.add('mt-3')
    byLine.classList.add('text-start')
    byLine.innerText = story.byline
    div.appendChild(byLine)

    let datePub = document.createElement('p')
    datePub.classList.add('card-text')
    datePub.classList.add('mt-3')
    datePub.classList.add('text-start')
    let date = new Date(story.published_date)
    let dateStr = date.toLocaleDateString('en-us')
    datePub.innerText = dateStr
    div.appendChild(datePub)

    let abstract = document.createElement('p')
    abstract.classList.add('card-text')
    abstract.classList.add('text-start')
    abstract.innerText = story.abstract
    div.appendChild(abstract)

    let a = document.createElement('a')
    a.innerText = 'Read'
    a.setAttribute('href', story.url)
    a.classList.add('btn')
    a.classList.add('btn-primary')
    a.classList.add('float-center')
    div.appendChild(a)

    return card
}



select.addEventListener('change', function () {
    stories.innerHTML = ""

    const url2 = "http://api.nytimes.com/svc/topstories/v2/" + select.value + ".json?api-key=" + api_key
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.results.forEach((story) => {
                // BOTTOM BOTTOM STUFF
                cardMaker(story)
                stories.append(cardMaker(story))
            })

        })
})

const urlHome = "http://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + api_key
fetch(urlHome)
    .then(response => response.json())
    .then(data => {

        console.log(data)
        data.results.forEach((story) => {
            // BOTTOM BOTTOM STUFF
            cardMaker(story)
            stories.append(cardMaker(story))
        })
    })

refresh.addEventListener('click', function () {
    stories.innerHTML = ""
    const url2 = "http://api.nytimes.com/svc/topstories/v2/" + select.value + ".json?api-key=" + api_key
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.results.forEach((story) => {
                // BOTTOM BOTTOM STUFF
                cardMaker(story)
                stories.append(cardMaker(story))
            })

        })
})