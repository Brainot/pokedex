
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("modalContent");


function detalhesPokemonEvent() {
    document.querySelectorAll('#pokemonList li').forEach(item => {
        item.addEventListener('click', () => {
            const pokemonId = item.getAttribute('data-id');
            pokeApi.getPokemonById(pokemonId).then((pokemon) => {
                const modalContent = document.querySelector('#modalContent'); // Obtém o elemento modalContent
                const modal = document.querySelector('#myModal'); // Obtém o modal principal
                const modalContentContainer = document.querySelector('.modal-content'); // Obtém o contêiner de conteúdo do modal

                const specie = pokeApi.getSpeciesById(pokemonId).then((specie) => {

                    // Define o HTML do modal
                    const modalHtml = `
                        <div class="modalInfo">
                            <p class="modalName">${pokemon.name}</p>
                            <p class="modalNumber">#${pokemon.number}</p>
                        </div>
                        <div class="modalTypes">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="modalImg">
                            <img src="${pokemon.sprite}" alt="${pokemon.name}">
                        </div>
                        <div class="pokemonModalContent">
                            <div class="about">
                                <h1>About</h1>
                                <p>${specie.about_text}</p>
                            </div>
                            <div class="base">
                                <h2>height</h2>
                                <h2>weight</h2>
                                <p>${pokemon.height} meters</p>
                                <p>${pokemon.weight} Kg</p>
                            </div>
                            <div class="breeding">
                                <h2>Breeding</h2>
                                <div class="gender">
                                    <p>Gender</p>
                                    <p>&male;${specie.gender_rate[0]}%</p>
                                    <p>&female;${specie.gender_rate[1]}%</p>
                                    <p>Egg groups</p>
                                    ${specie.egg_groups.map((egg_group) => `<p class="type">${egg_group.name}</p>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                    // Adiciona a classe de background ao modal-content
                    modalContentContainer.className = `modal-content ${pokemon.background_color}`;

                    // Define o conteúdo do modal
                    modalContent.innerHTML = modalHtml;

                    // Exibe o modal
                    modal.style.display = "block";

                    // Fecha o modal ao clicar no botão de fechar
                    const closeButton = modal.querySelector('.close');
                    closeButton.addEventListener('click', () => {
                        modal.style.display = "none";
                    });

                    // Fecha o modal ao clicar fora dele
                    window.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.style.display = "none";
                        }
                    });
                });
            });
        });
    });
}