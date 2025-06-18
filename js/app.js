function search(ele) {
  if (event.key === "Enter") {
    findMovies(ele.value);
  }
}


const movieListEl = document.querySelector(".movie-list");
const movieSearchBox = document.getElementById("input");

async function movSearch(searchTerm) {

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=96175b3f&s=` + `${searchTerm}`
  );
  const data = await res.json();
  //console.log(data.Search);
  if (data.Response == "True") {
    movHTML(data.Search)

};
};

function findMovies() {
  const spinner = document.querySelector(".loading");
  spinner.classList += ' .movies__loading'
  let searchTerm = movieSearchBox.value;
  if (searchTerm.length > 0) {
    const div = document.querySelector(".movie-list");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    movSearch(searchTerm);
    spinner.classList.remove('.movies__loading');
  }
  //console.log(searchTerm);
}

function movHTML(movies) {
  for (let idx = 0; idx < 6; ++idx) {
    let movieListItem = document.createElement("div");
    movieListItem.classList.add("movie");
    movieListItem.innerHTML = `<div class="movie">
                  <h3 class="mov__title">${movies[idx].Title}</h3>
                  <p class="mov__year"><b>Year:</b> ${movies[idx].Year}</p>
                  <p class="mov__id"><b>IMDB ID:</b> ${movies[idx].imdbID}</p>
                  <figure class="img__wrapper">
                      <img src="${movies[idx].Poster}" alt="" class="mov__img">
                  </figure>
              </div>`;
    movieListEl.appendChild(movieListItem);
  }
}
