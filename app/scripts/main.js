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
      this.currentHealth = this.currentHealth + inst.healthBoost; // instance of Goody.currentHealth = instance of Goody.currentHealth + instance of Boost.healthBoost
    }
  };

  console.log(inst.healthBoost);



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
  var shinobi = new Goody ({
    name: 'Shinobi'

  });

  var haku = new Goody ({
    name: 'Haku',
    healthMax: 200

  });


  var ryu = new Goody ({
    name: 'Ryu',
    healthMax: 300

  });


  // Computer
  var akemi = new Baddy ({
    name: 'Akemi'

  });

  var yoshiro = new Baddy ({
    name: 'Yoshiro',
    healthMax: 500

  });

  var takashi = new Baddy ({
    name: 'Takashi',
    healthMax: 1000

  });


  // Weapons
  var knife = new Weapon ({
    name: 'Knife'

  });

  var nunchucks = new Weapon ({
    name: 'Nunchucks'

  });

  var magic = new Weapon ({
    name: 'Magic'

  });


  // Boost
  var juice = new Boost ({
    name: 'Juice',
    healthBoost: 50

  });

  var powder = new Boost ({
    name: 'Powder'

  });

  var herbal = new Boost ({
    name: 'herbal'

  });
