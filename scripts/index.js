const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
        let characters = JSON.parse(xhr.response);

        let searchButton = document.getElementById('botao__busca');
        let searchInput = document.getElementById('caixa__busca');
        let resultsDiv = document.getElementById('resultado');

        searchButton.addEventListener('click', function() {
            let searchTerm = searchInput.value.trim().toLowerCase();

            let filteredCharacters = characters.filter(character =>
                character.name.toLowerCase().includes(searchTerm)
            );

            resultsDiv.innerHTML = '';

            filteredCharacters.forEach(character => {
                let characterDiv = document.createElement('div');
                characterDiv.className = 'character';
                characterDiv.innerHTML = `
                    <h2>${character.name}</h2>
                    <p><strong>House:</strong> ${character.house}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Actor:</strong> ${character.actor}</p>
                    <img src="${character.image}" alt="${character.name}">
                `;

                resultsDiv.appendChild(characterDiv);
            });
        });
    } else {
        console.log(xhr.status);
    }
};