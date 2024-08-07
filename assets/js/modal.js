
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
                            <div class="modal-tabs">
                                <!-- Abas Principais -->
                                <button class="tab-link active" data-target="about-tab">About</button>
                                <button class="tab-link" data-target="stats-tab">Stats</button>
                                <button class="tab-link" data-target="evolution-tab">Evolution</button>
                                <button class="tab-link" data-target="moves-tab">Moves</button>
                            </div>
                            <div class="tab-content active" id="about-tab">
                                <div class="about">
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
                            <div class="tab-content" id="stats-tab">
                                <div id="hexagon-container">
                                    <svg viewBox="0 0 200 200" class="hexagon">
                                        <!-- Background Hexagon -->
                                        <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" class="hexagon-background" />

                                        <line x1="100" y1="100" x2="100" y2="20" class="center-line" />
                                        <line x1="100" y1="100" x2="170" y2="60" class="center-line" />
                                        <line x1="100" y1="100" x2="170" y2="140" class="center-line" />
                                        <line x1="100" y1="100" x2="100" y2="180" class="center-line" />
                                        <line x1="100" y1="100" x2="30" y2="140" class="center-line" />
                                        <line x1="100" y1="100" x2="30" y2="60" class="center-line" />

                                        <!-- Stat Points -->
                                        <polygon points="${pokemon.points.map(point => point.join(',')).join(' ')}" class="stat-values" />

                                        <!-- Stat Labels -->
                                        <text x="100" y="9" text-anchor="middle">HP</text>
                                        <text x="100" y="19" text-anchor="middle">${pokemon.stats[0]}</text>
                                        <text x="185" y="60" text-anchor="middle">Attack</text>
                                        <text x="185" y="70" text-anchor="middle">${pokemon.stats[1]}</text>
                                        <text x="185" y="150" text-anchor="middle">Defense</text>
                                        <text x="185" y="160" text-anchor="middle">${pokemon.stats[2]}</text>
                                        <text x="100" y="190" text-anchor="middle">Sp. Atk</text>
                                        <text x="100" y="200" text-anchor="middle">${pokemon.stats[3]}</text>
                                        <text x="15" y="150" text-anchor="middle">Sp. Def</text>
                                        <text x="15" y="160" text-anchor="middle">${pokemon.stats[4]}</text>
                                        <text x="15" y="60" text-anchor="middle">Speed</text>
                                        <text x="15" y="70" text-anchor="middle">${pokemon.stats[5]}</text>

                                    </svg>
                                </div> 
                            </div>
                            <div class="tab-content" id="evolution-tab">
                                
                            </div>
                            <div class="tab-content" id="moves-tab">
                                
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

                    const tabLinks = document.querySelectorAll(".tab-link");
                    const tabContents = document.querySelectorAll(".tab-content");

                    tabLinks.forEach(link => {
                        link.addEventListener("click", function () {
                            // Remove a classe 'active' de todas as abas e conteúdos
                            tabLinks.forEach(link => link.classList.remove("active"));
                            tabContents.forEach(content => content.classList.remove("active"));

                            // Adiciona a classe 'active' à aba e conteúdo clicados
                            const targetId = this.getAttribute("data-target");
                            this.classList.add("active");
                            document.getElementById(targetId).classList.add("active");
                        });
                    });
                });
            });
        });
    });
}
