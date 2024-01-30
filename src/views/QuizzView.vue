/* eslint-disable */ /* eslint-disable eol-last */
<template>
  <div>
    <QuestionReponse
      :compteurUt="compteurBonneReponseUtilisateur"
:compteurComputeur="compteurBonneReponseComputeur"
      :title="title_quizz"
      :reponse1="tabAfficheReponseRandom[0]"
      :reponse2="tabAfficheReponseRandom[1]"
      :reponse3="tabAfficheReponseRandom[2]"
      :reponse4="tabAfficheReponseRandom[3]"
      @radiochecked="radioCheckedQuizz"
      @generalEventBtn="nextQuestion"
    />
  </div>
</template>
<script>
import QuestionReponse from "@/components/QuestionReponse.vue";
export default {
  data() {
    return {
      title_quizz: "",
      listQuestions: [],
      tabAfficheReponseRandom: [],
      reponsecorrect_quizz: "",
      reponse2_quizz: "",
      reponse3_quizz: "",
      reponse4_quizz: "",
      indexAffichageBonneReponse: 0,
      compteurQuestion: 0,
      compteurBonneReponseUtilisateur: 0,
      compteurBonneReponseComputeur: 0,
      responseChoisiUtilisateur: 0,
    };
  },

  components: {
    QuestionReponse,
  },
  methods: {
    randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    shuffleArray(inputArray) {
      inputArray.sort(() => Math.random() - 0.5);
    },

    afficherQuestions() {
      if (this.compteurQuestion === this.listQuestions.length - 1) {
        this.compteurQuestion = 0;
      } else {
        this.compteurQuestion++;
      }

      this.title_quizz = this.listQuestions[this.compteurQuestion].question;
      this.reponsecorrect_quizz =
        this.listQuestions[this.compteurQuestion].correct_answer +
        " reponse correcte";
      this.reponse2_quizz =
        this.listQuestions[this.compteurQuestion].incorrect_answers[0];
      this.reponse3_quizz =
        this.listQuestions[this.compteurQuestion].incorrect_answers[1];
      this.reponse4_quizz =
        this.listQuestions[this.compteurQuestion].incorrect_answers[2];

      this.tabAfficheReponseRandom = [
        this.reponsecorrect_quizz,
        this.reponse2_quizz,
        this.reponse3_quizz,
        this.reponse4_quizz,
      ];

      this.shuffleArray(this.tabAfficheReponseRandom);

      for (let i = 0; i < this.tabAfficheReponseRandom.length; i++) {
        if (this.tabAfficheReponseRandom[i] === this.reponsecorrect_quizz) {
          this.indexAffichageBonneReponse = i;
        }
      }
    },
    radioCheckedQuizz(responseValue) {
      this.responseChoisiUtilisateur = responseValue;
      console.log("reponse est " + responseValue);
    },
    nextQuestion() {
      let rep = localStorage.getItem('responseChoisiUtilisateur');

      console.log("radiocheck" + rep)
      console.log("index bonne rep " + this.indexAffichageBonneReponse);
      if(this.responseChoisiUtilisateur=== this.indexAffichageBonneReponse){
        alert("bonne réponse !");
        this.compteurBonneReponseUtilisateur++;
        localStorage.setItem("compteurBonneReponseUtilisateur", this.compteurBonneReponseUtilisateur)


      }
      else{
        alert("Mauvaise réponse !");
        this.compteurBonneReponseComputeur++;
        localStorage.setItem("compteurBonneReponseComputeur", this.compteurBonneReponseComputeur)
      }
      this.afficherQuestions();

    },
  },
  created() {
    this.axios
      .get(
        "https://opentdb.com/api.php?amount=3&category=21&difficulty=easy&type=multiple"
      )
      .then((response) => {
        this.listQuestions = response.data.results;
        
        this.compteurBonneReponseComputeur= localStorage.getItem("compteurBonneReponseComputeur");
        this.compteurBonneReponseUtilisateur= localStorage.getItem("compteurBonneReponseUtilisateur");
        this.afficherQuestions();
      });
  },
};
</script>
