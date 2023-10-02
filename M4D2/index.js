//const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem";

//fetch(url)
  //.then((abc) => abc.json())
  //.then((result) => {
    //const array = result.data;
    //console.log(array);
  //})
  //.catch((error) => console.log(error));


  function search(query, targetId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta API');
        }
        return response.json();
      })
      .then((data) => {
        const targetDiv = document.getElementById(targetId);
        if (!targetDiv) {
          throw new Error(`Elemento con ID "${targetId}" non trovato`);
        }
  
        const resultsHtml = data.data
          .map((item) => {
            return `
              <div class="col">
                <div class="card">
                  <img src="${item.album.cover}" class="card-img-top" alt="${item.title}" />
                  <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.artist.name}</p>
                  </div>
                </div>
              </div>
            `;
          })
          .join('');
  
        targetDiv.innerHTML = resultsHtml;
        targetDiv.classList.remove('d-none');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    search('eminem', 'eminemSection');
    search('metallica', 'metallicaSection');
    search('queen', 'queenSection');
  });
  