const botonMenu = document.querySelector(".bi-list");
const botonCerrar = document.querySelector(".bi-x");

botonMenu.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.add("activo");
})

botonCerrar.addEventListener("click", () => {
    document.querySelector(".menuLateral").classList.remove("activo");
})