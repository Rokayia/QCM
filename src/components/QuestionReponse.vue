/* eslint-disable */
/* eslint-disable eol-last */
<template>
  <div>
    <p>joueur {{ compteurUt }} X {{ compteurComputeur }}Computeur</p>
    <h1>{{ title }}</h1>

  
    <section @change="radioGeneralEvent">
      <input type="radio"  v-model="this.responseValue" v-bind:value="0"  />{{reponse1}}
      <br>
      <input type="radio" v-model="this.responseValue" v-bind:value="1"  />
      <label for="reponse2">{{reponse2}}</label>
      <br>
      <input type="radio" v-model="this.responseValue" v-bind:value="2"  />
      <label for="reponse3">{{reponse3}}</label>
      <br>
      <input type="radio"
      v-model="this.responseValue" v-bind:value="3"  />
{{reponse4}}
      <br>
      <!-- <span>value: {{this.responseValue}}</span> -->
    </section>
    <br>
 
    <button @click="methGeneralEvent">Envoyer</button>
  </div>
</template>
<script>
export default {
  name: 'QuestionReponse',
  data(){
        return{
          responseValue:"",
        }
    },

  props: {
    compteurUt: Number,
    compteurComputeur:Number,
    title: String,
    reponse1: String,
    reponse2: String,
    reponse3: String,
    reponse4: String,
  

  },
  methods: {
    methGeneralEvent () {
      // Event personnalisé
      // Déclarer un alias pour appeler l'evenment sur le composant parent
      this.$emit('generalEventBtn');
    },
    radioGeneralEvent () {
      // Event personnalisé
      // Déclarer un alias pour appeler l'evenment sur le composant parent
      this.$emit('radiochecked',this.responseValue);
    }
  }


};
</script>
