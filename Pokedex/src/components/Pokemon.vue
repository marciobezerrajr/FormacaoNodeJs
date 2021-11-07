<template>
  <div id="pokemons">
    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="this.currentImg" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4" id="captalize">{{ num }} - {{ name }}</p>

            <div class="tipos">
                <p  class="subtitle is-6"> {{ pokemon.type }} </p>
                <p  class="subtitle is-6"> {{ pokemon.type2}} </p>
            </div>
            

          </div>
        </div>

        <div class="content">
          <button class="button is-medium is-fullwidth" @click="mudarSprite">
            Mudar sprite
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(this.url).then((res) => {
      this.pokemon.type = res.data.types[0].type.name;
      this.pokemon.type2 = res.data.types[1].type.name;

      this.pokemon.front = res.data.sprites.front_default;
      this.pokemon.back = res.data.sprites.back_default;
      this.currentImg = this.pokemon.front;
    });
  },
  data() {
    return {
      isFront: true,
      currentImg: "",
      pokemon: {
        id: "",
        type: "",
        type2: "",
        front: "",
        back: "",
      },
    };
  },

  props: {
    num: Number,
    name: String,
    url: String,
  },

  methods: {
    mudarSprite: function () {
      if (this.isFront) {
        this.isFront = false;
        this.currentImg = this.pokemon.back;
      } else {
        this.isFront = true;
        this.currentImg = this.pokemon.front;
      }
    },
  },
};
</script>

<style>
#captalize {
  text-transform: capitalize;
}

.tipos {
    text-transform: capitalize;
    display: flex;
    justify-content: center;
}   

.tipos p{
    padding: 5px;
}

#pokemons{
    margin-top: 5%;
}

</style>