const searchForm = document.getElementById('search')
const searchBar = document.getElementById('search-bar')
const movieList = document.querySelector('.movie-list')
const addToWatchList = document.querySelector('.movie-list')
const addedFilms = document.querySelector('.added-films')

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    getFilms(searchBar.value)
})

const getFilms = function(keyWords) {
    fetch(`https://www.omdbapi.com/?s=${keyWords}&apikey=3a26a972`)
        .then(res => res.json())
        .then(data => {
            getFilmsDetails(data.Search.slice(0, 6))
        })
}


const getFilmsDetails = function(filmsArr) {
    let fetchPromises = filmsArr.map(film => {
      return fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=3a26a972`)
        .then(res => res.json());
    });
  
    Promise.all(fetchPromises)
      .then(data => {
        renderFilms(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

const renderFilms = function(filmsArr) {
    let newHtml = ''
    filmsArr.forEach(film => {
        newHtml += `
        <div class="movie">
                <img id='poster' src="${film.Poster}" alt="">
                <div class="title">${film.Title}</div>
                <div class="rating">${film.Ratings[0].Value}</div>
                <div class="duration">${film.Runtime}</div>
                <div class="genre">${film.Genre}</div>
                <button id="watchlist" class="watchlist">+ Watchlist</button>
                <div class="description">${film.Plot} </div>
        </div>
        `
    })
    movieList.innerHTML = newHtml
}

let watchListHtml = ''


document.body.addEventListener('click', (e) => {
  if (e.target.id === 'watchlist') {
    watchListHtml += e.target.parentElement.innerHTML
    e.target.disabled = true
  }
  localStorage.setItem('watchListHtml', watchListHtml);
})


