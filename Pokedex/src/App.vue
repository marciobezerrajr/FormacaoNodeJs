<template>
  <div id="app">
    

    <div class="column is-half is-offset-one-quarter">
      
    <h1 class="title">Pokedex</h1>
    <input class="input is-rounded" type="text" placeholder="Pesquisar Pokemon" v-model="busca">
    <button class="button is-fullwidth is-success" id="buscaBtn" @click="buscar">Buscar</button>
      <div v-for="(poke, index) in filteredPokemons" :key="poke.url">
        <Pokemon :name="poke.name" :url="poke.url" :num="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/Pokemon.vue";

export default {
  name: "App",

  data(){
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: ''
    };
  },

  created: function(){
    //1118
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0").then((res) => {
        console.log(res.data.results);
        this.pokemons = res.data.results;
        this.filteredPokemons = res.data.results
      })
      .catch((err) => {
        console.error(err);
      });
  },
  
  components: {
    Pokemon,
  },

  methods: {
    buscar: function(){
      this.filteredPokemons = this.pokemons
      if(this.busca == '' || this.busca == ' '){
          this.filteredPokemons = this.pokemons
      } else {
          // this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca)
          this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.busca.toLowerCase()))
       }
    }
  },

  

  // computed: {
  //   resBusca: function(){
  //     if(this.busca == '' || this.busca == ' '){
  //       return this.pokemons
  //     } else {
  //       return this.pokemons.filter(pokemon => pokemon.name == this.busca)
  //     }
  //   }
  // }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#buscaBtn {
  margin-top: 2%;
}

.title{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  
}

</style>

