const express = require("express")
const app = express()

const database = require("./database.js")
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}))



//app.get("/", (req, res) =>{
    app.get("/saudacao", (req, res) =>{
//res.send("Oi tudo bem, do endpoint '/'")
    res.send("Oi tudo bem, do endpoint '/saudacao'")
})

//MOstra todos os pokemons
app.get("/pokemons",(req, res)=>{
    res.send(database.mostrarPokemons())
})

//Mostra um pokemon
app.get("/pokemons/:id",(req, res)=>{
    res.send(database.mostrarPokemon(req.params.id))
})

//Salva novo pokemon
app.post("/pokemons",(req, res)=>{
    const pokemon = database.salvarPokemons({
    nome: req.body.nome,
    tipo: req.body.tipo,
    fraqueza: req.body.fraqueza,
    resistencia: req.body.resistencia,
    hp: 100
    })
    res.send(pokemon)    
})

//Atualiza um pokemon
app.put("/pokemons/:id",(req, res)=>{
    const pokemon = database.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)
})

//Remove um pokemon   
app.delete("/pokemons/:id",(req, res)=>{
    res.send(database.deletarPokemon(req.params.id))
    //return pokemonDeletado
})

//Remove todos os pokemons
app.delete("/removeTodosPokemons",(req,res)=>{
    res.send(database.deletarPokemons())
})

//Batalha entre dois pokemons
app.post("/batalha",(req, res)=>{
    res.send(database.batalhaPokemon(req.body.id1, req.body.id2))    
})

//Cura pokemon
app.post("/cura",(req, res)=>{
    res.send(database.curaPokemon(req.body.id))
})

app.listen(3003)