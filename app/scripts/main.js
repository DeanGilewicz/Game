// (function () {

  // Constructor - User
  var Goody = function (options) {
    var reg_att, special_att;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.healthMax = options.healthMax || 100;
    this.currentHealth = this.healthMax;
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

  };

  // Constructor - Computer
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

  // Constructor - Items
  // Weapons and healthboost
  // var Items = function (options) {
  //   var weapon_att
  //   var options = options || {};
  //   this.name = options.name;
  //   this.healthBoost = options.healthBoost || (_.random(20,30));
  //   this.weapons = options.weapons;
  //   switch (this.weapons) {
  //     case "knife":
  //       weapon_att = _.random(3,8);
  //     break;
  //     case "nunchucks":
  //       weapon_att = _.random(13,16);
  //     break;
  //     case "magic":
  //       weapon_att = _.random(17,20);
  //     break;
  //   };
  // };


  // INTRO SCREEN - story and start game button when clicked goes to pick character
  $('.the').addClass('animated bounceInLeft');
  $('.arena').addClass('animated bounceInRight');
  $('.foot').addClass('animated fadeInUp');

  $(function () {
    $('.tlt').textillate( { initialDelay: 4500, in: {
      effect: 'fadeInUpBig',
      delayScale: 2,
      callback: function () {
      $('.begin').fadeIn(2000).css('display', 'block');
    }}});
  });

  // when start game button is clicked then intro box fades out, and mainCon fades in
  $('.intro button').on('click', function(event) {
    event.preventDefault();

    $('.intro').fadeOut(500);
    $('.mainCon').fadeIn(2000);

  });


  // STARTING THE GAME - pick character
  var user, computer;

  user = new Goody ({
    name: "not selected player"
  });

  computer = new Baddy ({
    name: "not selected opponent"
  });


  $('.player_select button').on('click', function(event) {
    event.preventDefault();
    console.log("button clicked");

    var char_name = $(this).text(),
        char_type = $(this).attr('name');
    console.log(char_name);
    console.log(char_type);

    // Create instance of goody
    user = new Goody ({
      name: char_name,
      type: char_type
    });
    console.log(user.name);
    console.log(user.type);

    $('.player_select button').removeClass("char_select");
    $(this).addClass('char_select');

    // shinobi = new Goody ({ name: 'Shinobi'});
    // haku = new Goody ({ name: 'Haku', healthMax: 200});
    // ryu = new Goody ({ name: 'Ryu', healthMax: 300});
  });

  $('.opponent_select button').on('click', function(event) {
    event.preventDefault();

    var char_name = $(this).text(),
        char_type = $(this).attr('name');
        console.log(char_name);
        console.log(char_type);

    // Create instance of baddy
    computer = new Baddy ({
      name: char_name,
      type: char_type
    });
    console.log(computer.name);
    console.log(computer.type);

    $('.opponent_select button').removeClass("char_select");
    $(this).addClass('char_select');

    // akemi = new Goody ({ name: 'Akemi'});
    // yoshiro = new Baddy ({ name: 'Yoshiro', healthMax: 500});
    // takashi = new Baddy ({ name: 'Takashi', healthMax: 1000});
  });


  // GET READY TO FIGHT
  $('.start').on('click', function(event) {
    event.preventDefault();

    // check to make sure 1 character and 1 opponent is selected
    if(user.name == "not selected player" && computer.name == "not selected opponent") {

      alert("You Must Select A Player And An Opponent");


    } else if(user.name == "not selected player") {

        alert("You Must Select A Player");

    } else if(computer.name == "not selected opponent") {

        alert("You Must Select An Opponent");
    } else {
        console.log("both charcters selected");
        $('.welcome').fadeOut(500, function () {
          $('.ggName').prepend(user.name).find('.ggHealth').text(user.currentHealth);
          $('.bgName').prepend(computer.name).find('.bgHealth').text(computer.currentHealth);

          $('.fight_scene').fadeIn(500);
          $('.modal').addClass('animated zoomOut');

          $('.goodyBox').show().addClass('animated fadeInLeft');
          $('.baddyBox').show().addClass('animated fadeInRight');
          $('.ggHealth').text(user.currentHealth);
          $('.bgHealth').text(computer.currentHealth);

      });
    }
  });



// FIGHT SEQUENCE - fight scene. Click attack button to fight

  $('#fightBtn').on('click', function (event) {
    event.preventDefault();

    var attack_type = _.random(1, 3);

    // user attacks computer. Type of attack determined by number generated by attack_type
    if (attack_type === 1) {
        user.attack(computer);
        console.log("reguler attack");
    } else if (attack_type === 2) {
        user.special(computer);
        console.log("special attack");
    } else {
        console.log("Miss");
    };

    // if computer is still alive then display computer health otherwise show 0 and...
    if (computer.currentHealth > 0) {
        $('.bgHealth').text(computer.currentHealth);
    } else {
        $('.bgHealth').text('0');
        $('.bgName').css('text-decoration', 'line-through').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.win_fight').delay(1000).slideDown(4000);
    };

    // health bar for user
    if (computer.currentHealth >= 30 & computer.currentHealth <= 60) {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'orange');
    } else if (computer.currentHealth >= 0 & computer.currentHealth <= 29) {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'red');
    } else {
        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'green');
    };

    // computer attacks user. Type of attack determined by number generated by attack_type
    if (attack_type === 1) {
        computer.attack(user);
        console.log("reguler attack baddy");
    } else if (attack_type === 2) {
        computer.special(user)
        console.log("special attack baddy");;
    } else {
        console.log("Miss by Baddy");
    };

    // if user is still alive then display user health otherwise show 0 and...
    if (user.currentHealth > 0) {
        $('.ggHealth').text(user.currentHealth);
    } else {
        $('.ggHealth').text('0');
        $('.ggName').css('text-decoration', 'line-through').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.lose_fight').delay(1000).slideDown(4000);

    };


    // health bar for user
    if (user.currentHealth >= 30 & user.currentHealth <= 60) {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'orange');
    } else if (user.currentHealth >= 0 & user.currentHealth <= 29) {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'red');
    } else {
        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'green');
    };


    // if both characters die at the same time then display different ending message
    if (user.currentHealth <= 0 && computer.currentHealth <= 0) {

    }

  });
