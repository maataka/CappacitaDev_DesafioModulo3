const sequence = {
    _id: 1,
    get id() {return this._id++}
}

const pokemons = []

function salvarPokemons(pokemon) {
    if(!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
    return pokemon
}

function mostrarPokemon(id) {
    return pokemons[id] || {}
}

function mostrarPokemons() {
    return Object.values(pokemons)
}

function atualizarPokemon(id, pokemon){
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id,1)

    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
          pokemon.id = pokemon.id - 1  
        }
    })

    return pokemonDeletado
}

function batalhaPokemon(id1, id2){

    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2 != 0){
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        }else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
        }else{
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2 != 0){
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        }else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
        }else{
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if(pokemon1.hp < 0)  pokemon1.hp = 0
    if(pokemon2.hp < 0)  pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}


function curaPokemon(id) {
    const pokemon = pokemons[id]
    const  hpInicial = pokemon.hp
    const pocao = 20

    if(pokemon.hp >= 0 && pokemon.hp <=80) {
        pokemon.hp = pokemon.hp + pocao
        resultadoCura = `O pokemon ${pokemon.nome} tinha ${hpInicial} de hp, reccebeu uma dose da poção de cura e agora tem  ${pokemon.hp} de hp!`
    }else if(pokemon.hp == 90){
        pokemon.hp =  pokemon.hp + pocao/2
        resultadoCura = `O pokemon ${pokemon.nome} ainda tinha ${hpInicial} de hp e reccebeu apenas meia-dose da poção de cura!`
        }else{
        resultadoCura = `O pokemon ${pokemon.nome} tem  ${hpInicial} de hp e não pode receber mais nenhuma dose da poção de cura!`
        }
    
    return `O Centro de Cura informa:  ${resultadoCura}`   
}

function deletarPokemons(){
    pokemons.splice(0,pokemons.length)
    return {}
}


module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, curaPokemon,deletarPokemons}
