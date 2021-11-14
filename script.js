// lancer db_connection avant !! il faut creer l'url
// node db_co... dans console

// fetch voir : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')
let notFound = true

let genres = []
const url2 = 'http://localhost:8000/api/genres'
function getGenre() {
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      data.forEach((movie) => {
        let genre = movie.name
        genres.push(genre)
      })
    })
  //console.log(genres)
}

getGenre()

let producers = []
const url3 = 'http://localhost:8000/api/producers'
function getProd() {
  fetch(url3)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      data.forEach((movie) => {
        let prod = movie.name
        producers.push(prod)
      })
    })
  //console.log(producers);
}

getProd()

const url = 'http://localhost:8000/api/movies'

function getMovies() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      showMovies(data)
    })
}

getMovies()

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach((movie) => {
    let prod_id = movie.producer_id
    let prod = producers[prod_id]
    prod = prod != null ? prod : ' unknown'
    let genre_id = movie.genre_id
    let genre = genres[genre_id]
    let title = movie.title
    let summary = movie.summary
    let release_date = movie.release_date
    release_date = release_date ? movie.release_date.slice(0, 4) : ' unknown'
    let prod_year = movie.prod_year
    prod_year = prod_year != 0 ? prod_year : ' unknown'
    let min_duration = movie.min_duration
    min_duration = min_duration != null ? min_duration : ' unknown'

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
        <div class="movie-info">
          <h3>${title}</h3>
          <h6>${genre}</h6>
        </div>
        <div class="summary">
          <h3>Summary</h3>
          <div class="pitch">
          ${summary}
          </div>
        </div>
        <button class="more">
        More infos
        </button>
        <div class="overview">
          <h4>More infos</h4>
          <p>Producer : ${prod}</p>
          <p>Release date : ${release_date}</p>
          <p>Production year : ${prod_year}</p>
          <p>Duration : ${min_duration} min</p>
        </div>`

    main.appendChild(movieEl)
  })

  const boxes = document.querySelectorAll('.movie')
  //console.log(boxes)
  boxes.forEach((box) => {
    box.classList.add('show')
  })

  window.addEventListener('scroll', () => {
    const triggerBottom = (window.innerHeight / 5) * 3.5
    boxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top

      if (boxTop < triggerBottom) {
        box.classList.add('show')
      } else {
        box.classList.remove('show')
      }
    })
  })
}

const url4 = 'http://localhost:8000/api/allmovies'

function getSearch(searchTerm) {
  notFound = true

  fetch(url4)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((movie) => {
        if (movie.title.includes(searchTerm)) {
          //console.log(movie.title)
          notFound = false
          let prod_id = movie.producer_id
          let prod = producers[prod_id]
          prod = prod != null ? prod : ' unknown'
          let genre_id = movie.genre_id
          let genre = genres[genre_id]
          let title = movie.title
          let summary = movie.summary
          let release_date = movie.release_date
          release_date = release_date
            ? movie.release_date.slice(0, 4)
            : ' unknown'
          let prod_year = movie.prod_year
          prod_year = prod_year != 0 ? prod_year : ' unknown'
          let min_duration = movie.min_duration
          min_duration = min_duration != null ? min_duration : ' unknown'

          const movieEl = document.createElement('div')
          movieEl.classList.add('movie')
          movieEl.innerHTML = `
        <div class="movie-info">
          <h3>${title}</h3>
          <h6>${genre}</h6>
        </div>
        <div class="summary">
          <h3>Summary</h3>
          <div class="pitch">
          ${summary}
          </div>
        </div>
        <button class="more">
        More infos
        </button>
        <div class="overview">
          <h4>More infos</h4>
          <p>Producer : ${prod}</p>
          <p>Release date : ${release_date}</p>
          <p>Production year : ${prod_year}</p>
          <p>Duration : ${min_duration} min</p>
        </div>`

          main.appendChild(movieEl)
        }
      })

      if (notFound) {
        const notFound = document.createElement('p')
        notFound.classList.add('notFound')
        notFound.innerText = 'No film found'
        main.appendChild(notFound)
      }

      const boxes = document.querySelectorAll('.movie')
      //console.log(boxes)
      boxes.forEach((box) => {
        box.classList.add('show')
      })

      window.addEventListener('scroll', () => {
        const triggerBottom = (window.innerHeight / 5) * 3.5
        boxes.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top

          if (boxTop < triggerBottom) {
            box.classList.add('show')
          } else {
            box.classList.remove('show')
          }
        })
      })
    })
}

form.addEventListener('submit', (e) => {
  console.log(e)
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm != '') {
    main.innerHTML = ''

    getSearch(searchTerm)
    // console.log(searchTerm)
    search.value = ''
  } else {
    window.location.reload() // recharge la page
  }
})
