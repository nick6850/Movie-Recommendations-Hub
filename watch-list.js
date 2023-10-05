const addedFilmsContainer = document.querySelector(".added-films")


setInterval(refreshFilms, 1000)


function refreshFilms() {
    const storedFilmHtml = localStorage.getItem('watchListHtml');
    if (storedFilmHtml) {
      if (addedFilmsContainer.innerHTML.trim() !== storedFilmHtml.trim()) {
        addedFilmsContainer.innerHTML = storedFilmHtml;
      }
    }
  }
  
