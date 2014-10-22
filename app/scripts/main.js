// (function () {


// CONSTRUCTORS

  // User
  var Goody = function (options) {
    var options = options || {};
    this.name = options.name;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    this.attack = function(x) {
      x.currentHealth = x.currentHealth - (_.random(10,50)); // x is the enemy i.e. hercules
      if(x.currentHealth <= 0) {
        console.log("WINNER");

      } else {
        console.log(x.currentHealth);
        this.currentHealth = this.currentHealth - (_.random(10,50));
      }
    }
  };


  // Computer
  var Baddy = function(options) {
    var options = options || {};
    this.name = options.name;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = options.healthMax;
    this.attack = function(x) { // NO NEED FOR ATTACK FUNCTION IF INCLUDE BADDY ATTACK CODE IN GOODY CONSTRUCTOR
      x.currentHealth = x.currentHealth - (_.random(10,50)); // x is the goody (whoever you type in that baddy is atttakcing) i.e. brusuts
      if(x.currentHealth <= 0) {
        console.log("WINNER");

      } else {
        console.log(x.currentHealth);
        this.currentHealth = this.currentHealth - (_.random(10,50));
      }
    }
  };


  // INSTANCES

  // User
  var brutus = new Goody ({
    name: 'Brutus'

  });

  var titus = new Goody ({
    name: 'Titus',
    healthMax: 200

  });


  var zuchius = new Goody ({
    name: 'Zuchius',
    healthMax: 300

  });


  // Computer
  var zeus = new Baddy ({
    name: 'Zeus'

  });

  var hercules = new Baddy ({
    name: 'Hercules',
    healthMax: 500

  });

  var maximus = new Baddy ({
    name: 'Maximus',
    healthMax: 1000

  });
