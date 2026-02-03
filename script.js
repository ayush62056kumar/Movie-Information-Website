// function getStars(rating) {
//     let stars = "";
//     let fullStars = Math.round(rating / 2);
//     for (let i = 1; i <= 5; i++) {
//         stars += i <= fullStars ? "★" : "☆";
//     }
//     return stars;
// }

// function renderMovies(list) {
//     let result = document.getElementById("movieResult");
//     if (list.length === 0) {
//         result.innerHTML = "<p>❌ Movie not found</p>";
//         return;
//     }

//     result.innerHTML = list.map(movie => `
//         <div class="card">
//             <img src="${movie.poster}" alt="${movie.title}">
//             <h3>${movie.title}</h3>
//             <p><strong>Rating:</strong> ${movie.rating}</p>
//             <div class="stars">${getStars(movie.rating)}</div>
//             <p><strong>Year:</strong> ${movie.year}</p>
//         </div>
//     `).join("");
// }

// function searchMovie() {
//     let input = document.getElementById("movieName").value.toLowerCase().trim();

//     // Input blank → show ALL movies (multiple cards)
//     if (input === "") {
//         renderMovies(movies);
//         return;
//     }

//     // Input diya → filter karke show
//     let filtered = movies.filter(m => m.name.includes(input));
//     renderMovies(filtered);
// }

// // Page load par bhi saari movies dikhao
// window.onload = () => renderMovies(movies);
function openModal(movie) {
    document.getElementById("movieModal").style.display = "block";
    document.getElementById("modalImg").src = movie.poster;
    document.getElementById("modalTitle").innerText = movie.title;
    document.getElementById("modalRating").innerText = "Rating: " + movie.rating;
    document.getElementById("modalYear").innerText = "Year: " + movie.year;
    document.getElementById("modalDesc").innerText = movie.description;
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

function getStars(rating) {
    let stars = "";
    let fullStars = Math.round(rating / 2);
    for (let i = 1; i <= 5; i++) {
        stars += i <= fullStars ? "★" : "☆";
    }
    return stars;
}

// ===== Render Movies =====
// function renderMovies(list, containerId) {
//     let container = document.getElementById(containerId);

//     if (list.length === 0) {
//         container.innerHTML = "<p>No movies</p>";
//         return;
//     }

//     container.innerHTML = list.map(movie => `
//         <div class="card">
//             <img src="${movie.poster}" alt="${movie.title}">
//             <h3>${movie.title}</h3>
//             <p><strong>Rating:</strong> ${movie.rating}</p>
//             <div class="stars">${getStars(movie.rating)}</div>
//             <p><strong>Year:</strong> ${movie.year}</p>
//         </div>
//     `).join("");
// }
function renderMovies(list, containerId) {
    let container = document.getElementById(containerId);

    if (list.length === 0) {
        container.innerHTML = "<p>No movies</p>";
        return;
    }

    container.innerHTML = list.map(movie => `
        <div class="card" onclick='openModal(${JSON.stringify(movie)})'>
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <div class="stars">${getStars(movie.rating)}</div>
            <p><strong>Year:</strong> ${movie.year}</p>
        </div>
    `).join("");
}

// ===== Recently Viewed Logic =====
function addToRecent(movie) {
    let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];

    // remove duplicate
    recent = recent.filter(m => m.name !== movie.name);

    // add to top
    recent.unshift(movie);

    // keep only last 3
    if (recent.length > 3) {
        recent.pop();
    }

    localStorage.setItem("recentMovies", JSON.stringify(recent));
    renderRecent();
}

function renderRecent() {
    let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
    renderMovies(recent, "recentMovies");
}

// ===== Search Movie =====
function searchMovie() {
    let input = document.getElementById("movieName").value.toLowerCase().trim();

    if (input === "") {
        renderMovies(movies, "movieResult");
        return;
    }

    let found = movies.find(m => m.name === input);

    if (found) {
        renderMovies([found], "movieResult");
        addToRecent(found); // ⭐ RECENT ADD
    } else {
        document.getElementById("movieResult").innerHTML = "<p>❌ Movie not found</p>";
    }
}

// ===== Page Load =====
window.onload = () => {
    renderMovies(movies, "movieResult");
    renderRecent();
};

