const botaoMenu = document.getElementById('btn-menu');
const barraLateral = document.querySelector('.barra-lateral');
    
botaoMenu.addEventListener('click', function() {
    barraLateral.classList.toggle('fechada');
});
function iniciarCarrosselNoticias() {
    
    const gridNoticias = document.querySelector('.grid-noticias');
    
    
    setInterval(function() {
        
        
        const cartao = gridNoticias.querySelector('.card-noticia');
        
        
        if (!cartao) return; 
        const tamanhoDoPulo = cartao.offsetWidth + 20; 
        if (gridNoticias.scrollLeft + gridNoticias.clientWidth >= gridNoticias.scrollWidth - 10) {
            gridNoticias.scrollTo({ left: 0, behavior: 'smooth' });
            
        } else {
            
            
            gridNoticias.scrollBy({ left: tamanhoDoPulo, behavior: 'smooth' });
            
        }
        
    }, 5000);
}


iniciarCarrosselNoticias();

const barraPesquisa = document.querySelector('.barra-pesquisa');
const cartoesNoticia = document.querySelectorAll('.card-noticia');


barraPesquisa.addEventListener('input', function() {
    
    
    const termoDigitado = barraPesquisa.value.toLowerCase();

    
    cartoesNoticia.forEach(function(cartao) {
        
        
        const textoCartao = cartao.innerText.toLowerCase();

        
        if (textoCartao.includes(termoDigitado)) {
            cartao.style.display = ''; 
        } else {
            cartao.style.display = 'none'; 
        }
    });
});