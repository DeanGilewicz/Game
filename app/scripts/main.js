// (function () {

// CONSTRUCTORS

  // User
  var Goody = function (options) {
    var options = options || {};
    this.name = options.name;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    this.energyMax = options.eneryMax || 50;
    this.attack = function(inst) {
      inst.currentHealth = inst.currentHealth - (_.random(10,50)); // inst - is the enemy i.e. hercules (instance)
      if(inst.currentHealth <= 0) {
        console.log("WINNER");

      } else {
        console.log(inst.currentHealth);
        this.currentHealth = this.currentHealth - (_.random(10,50));
      }
    }
    // this.use = function(inst) {
    //   inst.currentHealth = inst.currentHealth - (_.random(10,20));
    // }

    this.healthBoost = Boost;
    this.take = function(inst) {
      inst.currentHealth = inst.currentHealth + inst.healthBoost;
    }
  };

  // Computer
  var Baddy = function(options) {
    var options = options || {};
    this.name = options.name;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = options.healthMax;
    this.energyMax = options.eneryMax || 50;
    this.attack = function(inst) { // NO NEED FOR ATTACK FUNCTION IF INCLUDE BADDY ATTACK CODE IN GOODY CONSTRUCTOR UNLESS OPTION FOR USER TO PLAY AS GOODY OR BADDY
      inst.currentHealth = inst.currentHealth - (_.random(10,50)); // x is the goody (whoever you type in that baddy is attakcing) i.e. brutus
      if(inst.currentHealth <= 0) {
        console.log("WINNER");

      } else {
        console.log(inst.currentHealth);
        this.currentHealth = this.currentHealth - (_.random(10,50));
      }
    }
    // this.use = function(inst) {
    //   inst.currentHealth = inst.currentHealth - (_.random(10,20));
    // }
    this.take = function(inst) {
      inst.currentHealth = inst.currentHealth + juice;
    }
  };





  // Weapons - extra damaage to health or shield
  var Weapon = function (options) {
    var options = options || {};
    this.name = options.name;
  };



  // Boost - health or energy
  var Boost = function (options) {
    var options = options || {};
    this.name = options.name;
    this.healthBoost = options.healthBoost || (_.random(20,30));
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


  // Weapons
  var spear = new Weapon ({
    name: 'Spear',

  });

  var axe = new Weapon ({
    name: 'Spear',

  });

  var sword = new Weapon ({
    name: 'Spear',

  });


  // Boost
  var juice = new Boost ({
    name: 'Juice',

  });

  var powder = new Boost ({
    name: 'Powder',

  });

  var herbal = new Boost ({
    name: 'herbal',

  });
