const searchForm = document.getElementById('search')
const searchBar = document.getElementById('search-bar')
const movieList = document.querySelector('.movie-list')


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
    console.log(filmsArr)
    let newHtml = ''
    filmsArr.forEach(film => {
        console.log('hey!')
        newHtml += `
        <div class="movie">
                <img id='poster' src="${film.Poster}" alt="">
                <div class="title">${film.Title}</div>
                <div class="rating">${film.Ratings[0].Value}</div>
                <div class="duration">${film.Runtime}</div>
                <div class="genre">${film.Genre}</div>
                <button class="watchlist">+ Watchlist</button>
                <div class="description">${film.Plot} </div>
        </div>
        `
    })
    movieList.innerHTML = newHtml
}






