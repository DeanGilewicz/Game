// (function () {

// CONSTRUCTORS

  // User
  var Goody = function (options) {
    var reg_att, special_att;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    // this.healthBoost = options.healthBoost || (_.random(10,30));
    switch (this.type) {
      case "g1":
        reg_att = _.random(3,8);
        special_att = _.random(9,12);
      break;
      case "g2":
        reg_att = _.random(4,9);
        special_att = _.random(13,16);
      break;
      case "g3":
        reg_att = _.random(5,10);
        special_att = _.random(17,20);
      break;
    };
    this.attack = function(attackee) {
      return attackee.currentHealth = attackee.currentHealth - reg_att; // attackee - is the enemy - Baddy (instance)
    };
    this.special = function (attackee) {
      return attackee.currentHealth = attackee.currentHealth - special_att;
    };
    // this.take = function(attackee) {
    //   attackee.currentHealth = attackee.currentHealth + attackee.healthBoost;
    // };

  };

  // Computer
  var Baddy = function(options) {
    var reg_att, special_att;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
    switch (this.type) {
      case "b1":
        reg_att = _.random(3,8);
        special_att = _.random(9,12);
      break;
      case "b2":
        reg_att = _.random(4,9);
        special_att = _.random(13,16);
      break;
      case "b3":
        reg_att = _.random(5,10);
        special_att = _.random(17,20);
      break;
    };
    this.attack = function(attackee) {
      return attackee.currentHealth = attackee.currentHealth - reg_att; // attackee - is the enemy - Goody (instance)
    };
    this.special = function (attackee) {
      return attackee.currentHealth = attackee.currentHealth - special_att;
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





  // Weapons
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
  // //
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

  // });

  // INTRO SCREEN - story and start game button when clicked goes to pick character
  $('.intro button').on('click', function(event) {
    event.preventDefault();

    console.log("button clicked");

    $('.intro').fadeOut(500);
    $('.mainCon').fadeIn(2000);

  });


  // STARTING THE GAME - pick character
  var user, computer;

  $('.player_select button').on('click', function(event) {
    event.preventDefault();

    var char_name = $(this).text(),
        char_type = $(this).attr('name');

    // Create instance of goody
    user = new Goody ({
      name: char_name,
      type: char_type
    });

    // shinobi = new Goody ({ name: 'Shinobi'});
    // haku = new Goody ({ name: 'Haku', healthMax: 200});
    // ryu = new Goody ({ name: 'Ryu', healthMax: 300});
  });

  $('.opponent_select button').on('click', function(event) {
    event.preventDefault();

    var char_name = $(this).text(),
        char_type = $(this).attr('name');

    // Create instance of baddy
    computer = new Baddy ({
      name: char_name,
      type: char_type
    });

    // akemi = new Goody ({ name: 'Akemi'});
    // yoshiro = new Baddy ({ name: 'Yoshiro', healthMax: 500});
    // takashi = new Baddy ({ name: 'Takashi', healthMax: 1000});
  });


  // GET READY TO FIGHT - make sure 1 character and 1 opponent is selected
  $('.start').on('click', function(event) {
    event.preventDefault();
    console.log(user.name);
    console.log(user.type);
    console.log(computer.name);
    console.log(computer.type);
    if(user.name === user.name && computer.name === computer.name) {

      $('.welcome').fadeOut(500, function () {
        $('.ggName').prepend(user.name).find('.ggHealth').text(user.currentHealth);
        $('.bgName').prepend(computer.name).find('.bgHealth').text(computer.currentHealth);

        $('.fight_scene').fadeIn();
      });
    } else if (user.name === false || computer.name === false ) {// else if (computer.chosen === true && user === undefined){
        alert("You Must Select A Character And An Opponent");
    }

  });


// FIGHT SEQUENCE - fight scene. Click attack button to fight

  $('#fightBtn').on('click', function (event) {
    event.preventDefault();

    var attack_type = _.random(1, 3);

    if (attack_type === 1) {
        user.attack(computer);
        console.log("reguler attack");
    } else if (attack_type === 2) {
        user.special(computer);
        console.log("special attack");
    } else {
        console.log("Miss");
    };

    if (computer.currentHealth > 0) {
        $('.bgHealth').text(computer.currentHealth);
    } else {
        $('.bgHealth').text('0');
        $('.bgName').css('text-decoration', 'line-through').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.win_fight').delay(1000).slideDown(4000);
    };

    if (computer.currentHealth >= 30 & computer.currentHealth <= 60) {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'orange');
    } else if (computer.currentHealth >= 0 & computer.currentHealth <= 29) {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'red');
    } else {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'green');
    };


    if (attack_type === 1) {
        computer.attack(user);
        console.log("reguler attack baddy");
    } else if (attack_type === 2) {
        computer.special(user)
        console.log("special attack baddy");;
    } else {
        console.log("Miss by Baddy");
    };

    if (user.currentHealth > 0) {
        $('.ggHealth').text(user.currentHealth);
    } else {
        $('.ggHealth').text('0');
        $('.ggName').css('text-decoration', 'line-through').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.lose_fight').delay(1000).slideDown(4000);

    };


    if (user.currentHealth >= 30 & user.currentHealth <= 60) {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'orange');
    } else if (user.currentHealth >= 0 & user.currentHealth <= 29) {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'red');
    } else {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'green');
    };


  });
