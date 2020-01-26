// new vue instance
new Vue({
  // controling the div element with id app
  el: "#app",
  // storing data in vue instance
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    // so initially game should not be runing, thats why its set to false
    gameIsRunning: false,
    // storing logs 
    turns : []
  },
  methods: {
    startGame: function() {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns= [];
    },
    attack: function() {
        var damage = this.calculateDamage(3, 10);
        this.monsterHealth  -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: "Player hits Monster for" + damage
        });
        if (this.checkWin()) {
            return;
        }

       this.monsterAttacks();

    },
    specialAttack: function() {
        var damage = this.calculateDamage(10, 20);
        this.monsterHealth  -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: "Player hits Monster Special Attack for" + damage
        })
        if (this.checkWin()) {
            return;
        }
       
        this.monsterAttacks();

    },
    heal: function() {
        if(this.playerHealth <= 90){
            this.playerHealth += 10;
           
        } else {
            this.playerHealth = 100;
        }
        this.turns.unshift({
            isPlayer: true,
            text: "Player heals for 10"
        })
        this.monsterAttacks();
        
    },
    giveUp: function() {

        this.gameIsRunning = false;
    },
    monsterAttacks : function() {
        var damage = this.calculateDamage(5, 12);
        this.playerHealth -= damage;
        this.checkWin();
        this.turns.unshift({
            isPlayer: false,
            text: "Monster hits player for" + damage
        });
    },
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
      return false;
    }
  }
});
