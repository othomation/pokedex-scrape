const url = "https://www.pokebip.com/pokedex/pokedex_5G_liste_des_pokemon.html";
const page = document.createElement("div");
const body = document.getElementsByTagName("body")[0];

class PokedexScrape {
	async recupererPokedex() {
		const data = await axios.get(url);
		return data.data;
	}
}
const html = new PokedexScrape();

html.recupererPokedex().then((res) => {
	page.innerHTML = res;
	const pokemons = page.querySelectorAll("tbody > .liste_poke");
	pokelist = [];
	for (let p of pokemons) {
		let lienDuPokemon = p.querySelector("td:nth-child(3) > b > a");
		let phref = lienDuPokemon.href;
		lienDuPokemon.href = "https://www.pokebip.com/pokedex/" + phref.substr(22, phref.length);
		pokelist.push(lienDuPokemon);
	}
	body.append(...pokelist);
});
