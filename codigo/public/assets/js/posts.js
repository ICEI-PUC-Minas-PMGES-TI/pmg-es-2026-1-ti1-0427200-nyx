const form = document.getElementById("postForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const legenda =
        document.getElementById("legenda").value;

    const arquivo =
        document.getElementById("arquivo").files[0];

    const reader = new FileReader();

    reader.onload = function(event){

        const post = {

            id: Date.now(),

            titulo: titulo,

            legenda: legenda,

            tipo: arquivo.type.startsWith("image")
                ? "foto"
                : "video",

            arquivo: event.target.result,

            data: new Date()
        };

        let posts =
            JSON.parse(localStorage.getItem("posts"))
            || [];

        posts.push(post);

        localStorage.setItem(
            "posts",
            JSON.stringify(posts)
        );

        alert("Post enviado!");

        form.reset();
    };

    reader.readAsDataURL(arquivo);
});const form = document.getElementById("postForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const legenda =
        document.getElementById("legenda").value;

    const arquivo =
        document.getElementById("arquivo").files[0];

    const reader = new FileReader();

    reader.onload = function(event){

        const post = {

            id: Date.now(),

            titulo: titulo,

            legenda: legenda,

            tipo: arquivo.type.startsWith("image")
                ? "foto"
                : "video",

            arquivo: event.target.result,

            data: new Date()
        };

        let posts =
            JSON.parse(localStorage.getItem("posts"))
            || [];

        posts.push(post);

        localStorage.setItem(
            "posts",
            JSON.stringify(posts)
        );

        alert("Post enviado!");

        form.reset();
    };

    reader.readAsDataURL(arquivo);
});