
let pagina = 1;

const btnAnterior = document.getElementById('btnPagAnterior');
const btnSiguiente = document.getElementById('btnPagSiguiente');

btnSiguiente.addEventListener('click', () =>{
    
    if(pagina < 1000){
    pagina+=1;
    consumirPeliculas();
    }
})

btnAnterior.addEventListener('click', () =>{

    if(pagina > 1){
        pagina-=1;
        consumirPeliculas();
        }
})

const consumirPeliculas = async() => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
       

        // si la respuesta es exitosa de 200 OK 
        if(respuesta.status = 200){

            const datos = await respuesta.json();

            console.log(datos);

            let peliculas = '';

            datos.results.forEach(pelicula => {
                
                peliculas+=`
                <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <br>
                        <h5 class="overview">${pelicula.overview}</h5>
                        <br>
                        <h4 class="info">Popularidad: </h4><h5 class="popularity">${pelicula.popularity}</h5>
                        <h4 class="info">Fecha Estreno: </h4> <h5 class="release_date">${pelicula.release_date}</h5>
                        <h4 class="info">Promedio de voto: </h4><h5 class="vote_average">${pelicula.vote_average}</h5>
                        <h4 class="info">Votos: </h4> <h5 class="vote_count">${pelicula.vote_count}</h5>
                    </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status == 401){

            console.log('API KEY INVALIDA');

        }else if(respuesta.status == 404){

            console.log('The resource you request could not be found');

        }else{

            console.log('Error desconosido');
        }

    } catch (error) {

        console.log(error);

    }
}

consumirPeliculas();

/*OVERVIEW
POPULARITY
RELEASE_DATE
VOTE_AVERAGE
VOTE_COUNT
*/ 

