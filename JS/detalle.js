const botonMenu = document.querySelector(".bi-list");
const botonCerrar = document.querySelector(".bi-x");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const idiomas = {
    es: "Español",
    en: "Inglés",
    fr: "Frances",
}

const acceso = {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk4OGNhNGRjOTJmMDRmNjViZGRkODhlMWEzMjNiMyIsIm5iZiI6MTcyNzIxODI2Ni41NjMsInN1YiI6IjY2ZjM0MjVhOGM4YWQ0YWJmZWQzOWI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICxTcpRbly2R_murWjJ7tnNCYKumYUNn3XzgeuSPLXc"};

botonMenu.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.add("activo");
})

botonCerrar.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.remove("activo");
})

function crearRuedaPorcentaje(voteAverage) {

    let porcentaje = Math.round((voteAverage|| 0) * 10);
    let dashArray = `${porcentaje}, 100`;

    let color;
    if (porcentaje >= 70) {
        color = "#21d07a"; // verde
    } else if (porcentaje >= 40) {
        color = "#d2d531"; // amarillo
    } else {
        color = "#db2360"; // rojo
    }

  return `
  <svg viewBox="0 0 36 36" class="circular-chart">
    <path class="circle-bg"
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"/>
    <path class="circle"
      stroke="${color}"
      stroke-dasharray="${dashArray}"
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"/>
    <text x="18" y="20.35" class="percentage">${porcentaje}%</text>
  </svg>`; 
}

async function cargarDetallesPeliculas() {
    
    const containerMain = document.querySelector(".main");

    try {

        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {language: "es-MX"},
            headers: acceso
        });

        const respuestaCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: {language: "es-MX"},
            headers: acceso
        })

        const respuestaCast = respuestaCredits.data.cast;
        const respuestaCastMain = respuestaCast.slice(0, 10);
        const respuestaCrew = respuestaCredits.data.crew;

        const director = respuestaCrew.find(persona => persona.job === "Director");

        const respaldo = "IMG/imagen_respaldo.png";

        const backdropURL = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : respaldo;

        const posterURL = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : respaldo;

        containerMain.innerHTML = `
            <div class="main__containerPosterPelicula">
                <img src="${backdropURL}" alt="${data.title}" id="posterPelicula">
            </div>

            <div class="main__containerInfoPelicula">

                <div class="main__containerInfoPelicula--imagen-title">

                    <img src="${posterURL}" alt="${data.title}">

                    <div class="tit_clasif_punt">

                        <h2>${data.title}</h2>

                        <div>
                            <p id="genero">${data.genres.map(g => g.name).join(", ")}</p>
                            <p id="duracion">Duración: ${data.runtime} minutos</p>
                        </div>

                        <div class="circular-rating">
                            ${crearRuedaPorcentaje(data.vote_average)}
                        </div>
                            
                    </div>

                </div>

                <div class="main__containerInfoPelicula--descripcion">

                    <div class="resumen-pelicula">
                        <h3>Resumen</h3>
                        <p>${data.overview}</p>
                    </div>

                    <div class="container-infoMas">

                        <div class="container-info+1 contInf">
                            <h3>Director</h3>
                            <p>${director ? director.name : "No disponible"}</p>
                        </div>

                        <div class="container-info+2 contInf">
                            <h3>Idioma original</h3>
                            <p>${idiomas[data.original_language] || data.original_language}</p>
                        </div>

                    </div>

                </div>

            </div>
            `
            
        const containerActores = document.createElement("div");
        containerActores.classList.add("main__containerInfoActores");

        const title = document.createElement("h2");
        title.textContent = "Actores";
            
        const containerSecond = document.createElement("div");
        containerSecond.classList.add("main__containerInfoActores--container");

        containerActores.appendChild(title);
        containerActores.appendChild(containerSecond);
        containerMain.appendChild(containerActores);

        respuestaCastMain.forEach(info => {

            const tarjetaActor = document.createElement("div");
            tarjetaActor.classList.add("actor");

            const img = document.createElement("img");
            img.src = info.profile_path
                ? `https://image.tmdb.org/t/p/w500${info.profile_path}`
                : respaldo;
            img.alt = info.name;

            const nombreActor = document.createElement("h3");
            nombreActor.textContent = info.name

            const personajeActor = document.createElement("p");
            personajeActor.textContent = info.character;

            tarjetaActor.appendChild(img);
            tarjetaActor.appendChild(nombreActor);
            tarjetaActor.appendChild(personajeActor);

            containerSecond.appendChild(tarjetaActor);
        });
    } catch(error) {
        console.log(error);
    }
}

cargarDetallesPeliculas();