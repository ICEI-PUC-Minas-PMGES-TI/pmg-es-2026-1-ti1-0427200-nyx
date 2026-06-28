const form = document.getElementById("preferencesForm");
const output = document.getElementById("jsonOutput");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const jogos = [];
    const musicas = [];
    const hobbies = [];

    document.querySelectorAll('input[name="jogos"]:checked')
    .forEach(item => jogos.push(item.value));

    document.querySelectorAll('input[name="musicas"]:checked')
    .forEach(item => musicas.push(item.value));

    document.querySelectorAll('input[name="hobbies"]:checked')
    .forEach(item => hobbies.push(item.value));

    const preferencias = {
        jogosFavoritos: jogos,
        estilosMusicais: musicas,
        hobbies: hobbies
    };


    // Salva os dados
    localStorage.setItem(
        "preferenciasUsuario",
        JSON.stringify(preferencias)
    );

    alert("Preferências salvas com sucesso!");
});