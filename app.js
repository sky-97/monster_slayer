// new vue instance
new Vue({
  // controling the div element with id app
  el: "#app",
  // storing data in vue instance
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    // so initially game should not be runing, thats why its set to false
    gameIsRunning: false
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
        this.monsterHealth  -= this.calculateDamage(3, 10);

        if (this.checkWin()){
            return;
        }

        this.playerHealth -= this.calculateDamage(5, 12);
        thi.checkWin();

    },
    specialAttck: function() {},
    heal: function() {},
    giveUp: function() {},
    // "Math.random()"  damage value is from 0 and 1
    // "Math.random() * max" damage  value is from 0 and 9.999999
    // "Math.floor(Math.random() * max)"damage value is from 0 and 9
    // "Math.floor(Math.random() * max) + 1"damage value is from 1 and 10
    // but we need minimum damage of 3 not 1
    // "Math.max(Math.floor(Math.random() * max) + 1, min)"damage value is from 3 and 10
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("you won! New game ?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("you lost! New game ?")) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
      }
    }
  }
});
