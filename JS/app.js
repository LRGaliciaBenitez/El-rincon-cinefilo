const botonMenu = document.querySelector(".bi-list");
const botonCerrar = document.querySelector(".bi-x");
const botonBuscar = document.querySelector("#btnBuscarPeli");
const divBusqueda = document.querySelector(".containerResBusqueda");
const inputSearch = document.querySelector("#buscarPeliculas");
const btnClDivSearch = document.querySelector("#clContSearch")

botonMenu.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.add("activo");
})

botonCerrar.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.remove("activo");
})

btnClDivSearch.addEventListener("click", () => {
    const divAddPeliculas = document.querySelector(".containerResBusqueda__container--peliculas");

    divBusqueda.classList.remove("activo");
    divAddPeliculas.innerHTML = "";
})

botonBuscar.addEventListener("click", () => {
    const infoInputSearch = inputSearch.value.trim();

    if (infoInputSearch) {
        divBusqueda.classList.add("activo");
        obtenerBusqueda();
    }

})

inputSearch.addEventListener("input", () => {
    const infoInputSearch = inputSearch.value.trim();
    const divAddPeliculas = document.querySelector(".containerResBusqueda__container--peliculas");

    if (!infoInputSearch) {
        divBusqueda.classList.remove("activo");
        divAddPeliculas.innerHTML = "";
    }
})

inputSearch.addEventListener("keydown", (e) => {
    const infoInputSearch = inputSearch.value.trim();

    if (infoInputSearch) {

        if(e.keyCode === 13) {
            divBusqueda.classList.add("activo");
            obtenerBusqueda();
        }
    }
})

// function crearRuedaPorcentaje(porcentaje) {

//     porcentaje = Math.round(porcentaje * 10);

//     let color;
//     if (porcentaje >= 70) {
//         color = "#21d07a"; // verde
//     } else if (porcentaje >= 40) {
//         color = "#d2d531"; // amarillo
//     } else {
//         color = "#db2360"; // rojo
//     }

//   return `
//   <svg viewBox="0 0 36 36" class="circular-chart">
//     <path class="circle-bg"
//       d="M18 2.0845
//          a 15.9155 15.9155 0 0 1 0 31.831
//          a 15.9155 15.9155 0 0 1 0 -31.831"/>
//     <path class="circle"
//       stroke="${color}"
//       stroke-dasharray="${porcentaje}, 100"
//       d="M18 2.0845
//          a 15.9155 15.9155 0 0 1 0 31.831
//          a 15.9155 15.9155 0 0 1 0 -31.831"/>
//     <text x="18" y="20.35" class="percentage">${porcentaje}%</text>
//   </svg>`; 
// }

async function obtenerPeliculas() {

    const containerPeliculas = document.querySelector(".main__containerPeliculas--2");

    try {
        const respuesta = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, { 
            headers:{ Authorization: " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk4OGNhNGRjOTJmMDRmNjViZGRkODhlMWEzMjNiMyIsIm5iZiI6MTcyNzIxODI2Ni41NjMsInN1YiI6IjY2ZjM0MjVhOGM4YWQ0YWJmZWQzOWI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICxTcpRbly2R_murWjJ7tnNCYKumYUNn3XzgeuSPLXc"}
        });

        containerPeliculas.innerHTML = "";

        respuesta.data.results.forEach(pelicula => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("main__containerPeliculas--tarjetaPelicula");

            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
            img.alt = `Pelicula de ${pelicula.title}`;

            const titulo = document.createElement("h3");
            titulo.textContent = `${pelicula.title}`;

            // const puntaje = document.createElement("div");
            // puntaje.classList.add("circular-rating");
            // puntaje.innerHTML = crearRuedaPorcentaje(pelicula.vote_average);

            const fecha = document.createElement("p");
            fecha.id = "fecha_estreno";
            fecha.textContent = `Fecha estreno: ${pelicula.release_date}`;

            tarjeta.appendChild(img);
            // tarjeta.appendChild(puntaje);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(fecha);

            containerPeliculas.appendChild(tarjeta);
            
        });

        
    } catch(error) {
        console.log(`Hubo un error: ${error}`);
    }
}

async function obtenerTrailers() {

    try {

        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day`, {
            headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk4OGNhNGRjOTJmMDRmNjViZGRkODhlMWEzMjNiMyIsIm5iZiI6MTcyNzIxODI2Ni41NjMsInN1YiI6IjY2ZjM0MjVhOGM4YWQ0YWJmZWQzOWI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICxTcpRbly2R_murWjJ7tnNCYKumYUNn3XzgeuSPLXc`}
        });

        const containerPrincipal = document.querySelector(".main__containerTrailers");
        const containerVideos = document.querySelector(".main__containerTrailers--2");
        containerVideos.innerHTML = "";

        const primeros = data.results.slice(0, 10);

        for (const item of primeros) {
            const type = item.media_type;
            const id = item.id;

            const {data: videos} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
                headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk4OGNhNGRjOTJmMDRmNjViZGRkODhlMWEzMjNiMyIsIm5iZiI6MTcyNzIxODI2Ni41NjMsInN1YiI6IjY2ZjM0MjVhOGM4YWQ0YWJmZWQzOWI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICxTcpRbly2R_murWjJ7tnNCYKumYUNn3XzgeuSPLXc`}
            });

            const trailer = videos.results.find(
                v => v.site === "YouTube" && v.type === "Trailer"
            );

            if(trailer) {

                const tarjeta = document.createElement("div");
                tarjeta.classList.add("containerTarjetaVideo");

                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                iframe.frameBorder = 0;
                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share")

                const contenedorInfo = document.createElement("div");
                contenedorInfo.classList.add("descripcionTrailer");

                const titulo = document.createElement("h3");
                titulo.textContent = `${item.title || item.name}`;

                contenedorInfo.appendChild(titulo);
                tarjeta.appendChild(iframe);
                tarjeta.appendChild(contenedorInfo);

                const posterURL= `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
                if(item.poster_path) {
                    tarjeta.addEventListener("mouseenter", () => {
                        containerPrincipal.style.backgroundImage = "none";
                        containerPrincipal.style.backgroundImage = `url(${posterURL})`;
                    })
                }

                containerVideos.appendChild(tarjeta);
            }

        }
    } catch(error) {
        console.log(`El error es: ${error}`);
    }
}

async function obtenerBusqueda() {
    const infoInputSearch = inputSearch.value.trim();

    try {

        const divAddPeliculas = document.querySelector(".containerResBusqueda__container--peliculas");

        const {data} = await axios.get(`https://api.themoviedb.org/3/search/multi` , {
            params: { query: infoInputSearch},
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk4OGNhNGRjOTJmMDRmNjViZGRkODhlMWEzMjNiMyIsIm5iZiI6MTcyNzIxODI2Ni41NjMsInN1YiI6IjY2ZjM0MjVhOGM4YWQ0YWJmZWQzOWI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICxTcpRbly2R_murWjJ7tnNCYKumYUNn3XzgeuSPLXc"}
        });

        divAddPeliculas.innerHTML = "";

        data.results.forEach(pelicula => {
            
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("containerResBusqueda__container--tarjetaPelicula");

            const img = document.createElement("img");
            img.src = pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                : "ruta-a-placeholder.jpg";
            img.alt = pelicula.title || pelicula.name || "Sin título";

            const title = document.createElement("h3");
            title.textContent = pelicula.title || pelicula.name || "Sin título";;

            // const porcentaje = document.createElement("div");
            // porcentaje.classList.add("circular-rating");
            // porcentaje.innerHTML = crearRuedaPorcentaje(pelicula.vote_average);

            tarjeta.appendChild(img);
            // tarjeta.appendChild(porcentaje);
            tarjeta.appendChild(title);

            divAddPeliculas.appendChild(tarjeta);
        })
    } catch(error) {
        console.log(error);
    }
}

obtenerPeliculas();
obtenerTrailers();