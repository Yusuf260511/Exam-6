import movies from "./movies.js";

const body = document.body;
const moviespace = document.getElementById("moviesspace");
const filterType = document.getElementById("filter");
const sortt = document.getElementById('sort');
const tosearch = document.getElementById('tosearch')



function generator(films) {
    moviespace.innerHTML = '';
    films.forEach(film => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="img/img.png" alt="" class="img">

            <div class="card-texts">
                <h2 class="name">${film.Title}</h2>
                <div class="categories">
                    <div class="numberinfo">
                        <span class="rating">${film.imdb_rating}</span>
                        <span class="year">${film.movie_year}</span>
                        <span class="time">${film.runtime} min</span>
                    </div>

                    <p class="category">${film.Categories}</p>
                </div>
                <button class="btn">More info</button>
            </div>
        `;

        moviespace.appendChild(card);
    });
}

function search() {
    const inputValue = tosearch.value.toLowerCase().trim();

    const searched = movies.filter(movie =>
        String(movie.Title).toLowerCase().includes(inputValue)
    );

    generator(searched);
}



function filterByType () {
    const selectType = filterType.value.toLowerCase();
    let filteredMovies;
    if (selectType === "all") {
        filteredMovies = movies;
    } else {
        filteredMovies = movies.filter(movie => 
        movie.Categories.includes(filterType.value));
    }
    generator(filteredMovies);
}

function sort() {
    const sortType = sortt.value.toLowerCase();
    let filteredMovies = movies;

    switch (sortType) {
        case "Sort":
            filteredMovies = movies;
            break;
        case "0-10":
            filteredMovies.sort((a, b) => a.imdb_rating - b.imdb_rating);
            break;
        case "10-0":
            filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
            break;
        case "maxyear":
            filteredMovies.sort((a, b) => b.movie_year - a.movie_year);
            break;
        case "minyear":
            filteredMovies.sort((a, b) => a.movie_year - b.movie_year);
            break;
    }

    generator(filteredMovies);
}




generator(movies);

tosearch.addEventListener('input', search);
filterType.addEventListener('change', filterByType);
sortt.addEventListener("change", sort);