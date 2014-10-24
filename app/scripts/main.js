// (function () {

// CONSTRUCTORS

  // User
  var Goody = function (options) {
    var attack_pt, special_pt;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    // this.healthBoost = options.healthBoost || (_.random(10,30));
    switch (this.type) {
      case 1:
        attack_pt = _.random(5,20);
        special_pt = _.random(20,50);
      break;
      case 2:
        attack_pt = _.random(10,30);
        special_pt = _.random(30,60);
      break;
      case 3:
        attack_pt = _.random(15,40);
        special_pt = _.random(40,70);
      break;
    };
    this.attack = function(attackee) {
      return attackee.currentHealth = attackee.currentHealth - attack_pt; // attackee - is the enemy - Baddy (instance)
    };
    this.special = function (attackee) {
      return attackee.health = attackee.health - special_pt;
    };
    // this.take = function(attackee) {
    //   attackee.currentHealth = attackee.currentHealth + attackee.healthBoost;
    // };

  };

  // Computer
  var Baddy = function(options) {
    var attack_pt, special_pt;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    switch (this.type) {
      case 4:
        attack_pt = _.random(5,20);
        special_pt = _.random(20,50);
      break;
      case 5:
        attack_pt = _.random(10,30);
        special_pt = _.random(30,60);
      break;
      case 6:
        attack_pt = _.random(15,40);
        special_pt = _.random(40,70);
      break;
    };
    this.attack = function(attackee) {
      return attackee.currentHealth = attackee.currentHealth - attack_pt; // attackee - is the enemy - Goody (instance)
    };
    this.special = function (attackee) {
      return attackee.health = attackee.health - special_pt;
    };

  };


  // // Weapons - extra damaage to health or shield
  // var Weapon = function (options) {
  //   var options = options || {};
  //   this.name = options.name;
  // };
  //
  // // Boost - health or energy
  // var Boost = function (options) {
  //   var options = options || {};
  //   this.name = options.name;
  //   this.healthBoost = options.healthBoost || (_.random(20,30));
  // };



// STARTING THE GAME

  // // Weapons
  // var knife = new Weapon ({
  //   name: 'Knife'
  //
  // });
  //
  // var nunchucks = new Weapon ({
  //   name: 'Nunchucks'
  //
  // });
  //
  // var magic = new Weapon ({
  //   name: 'Magic'
  //
  // });
  //
  //
  // // Boost
  // var juice = new Boost ({
  //   name: 'Juice',
  //   healthBoost: 50
  //
  // });
  //
  // var powder = new Boost ({
  //   name: 'Powder'
  //
  // });
  //
  // var herbal = new Boost ({
  //   name: 'herbal'
  //
  // });

var shinobi,
    haku,
    ryu,
    akemi,
    yoshiro,
    takashi;


  $('.welcome button').on('click', function (event) {
    event.preventDefault();

    // User Instances
    shinobi = new Goody ({ name: 'Shinobi', type: 1 });
    // haku = new Goody ({ name: 'Haku', healthMax: 200});
    // ryu = new Goody ({ name: 'Ryu', healthMax: 300});

    // Computer Instances
    akemi = new Baddy ({ name: 'Akemi', type: 4 });
    // yoshiro = new Baddy ({ name: 'Yoshiro', healthMax: 500});
    // takashi = new Baddy ({ name: 'Takashi', healthMax: 1000});



// Get ready to fight
    $('.welcome').fadeOut(500, function () {
      $('.ggName').prepend(shinobi.name).find('.ggHealth').text(shinobi.currentHealth);
      $('.bgName').prepend(akemi.name).find('.bgHealth').text(akemi.currentHealth);
      $('.fight').fadeIn();
    });

  });


// FIGHT SEQUENCE

  $('#fight').on('click', function (event) {
    event.preventDefault();

  var attack_type = _.random(1, 4);

  if (attack_type === 1) {
    shinobi.attack(akemi);
    console.log("regular attack");
  } else {
    shinobi.special(akemi);
    console.log("special attack");
  };

  if (akemi.currentHealth > 0) {
    $('.bgHealth').text(akemi.currentHealth);
  } else {
    $('.bgHealth').text('0');
    $('.bgName').css('text-decoration', 'line-through').css('color', 'red');
  };

  if (attack_type === 1) {
    akemi.attack(shinobi);
    console.log("regular attack");
  } else {
    akemi.special(shinobi);
    console.log("special attack");
  };

  if (shinobi.currentHealth > 0) {
    $('.ggHealth').text(shinobi.currentHealth);
  } else {
    $('.ggHealth').text('0');
    $('.ggName').css('text-decoration', 'line-through').css('color', 'red');
  };

    // $('#fight').fadeOut();

console.log(attack_type);

});
