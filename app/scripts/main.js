// (function () {

  // Constructor - User
  var Goody = function (options) {
    var reg_att, special_att;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.image = options.image;
    this.healthMax = options.healthMax;
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
        attackee.currentHealth = attackee.currentHealth - reg_att;
        return reg_att; // attackee - is the enemy - Baddy (instance)
    };
    this.special = function (attackee) {
        attackee.currentHealth = attackee.currentHealth - special_att;
        return special_att;
    };

  };

  // Constructor - Computer
  var Baddy = function(options) {
    var reg_att, special_att;
    var options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.image = options.image;
    this.healthMax = options.healthMax;
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
        attackee.currentHealth = attackee.currentHealth - reg_att;
        return reg_att; // attackee - is the enemy - Goody (instance)
    };
    this.special = function (attackee) {
        attackee.currentHealth = attackee.currentHealth - special_att;
        return special_att;
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

  // when start game button is clicked then intro box fades out, and pick character screen fades in
  $('.intro button').on('click', function(event) {
    event.preventDefault();
    $('.intro').fadeOut(500);
    $('.mainCon').fadeIn(2000);
  });


  // STARTING THE GAME - pick character
  var user, computer;

  // instance created before button is clicked to ensure user picks a player
  user = new Goody ({
    name: "not selected player"
  });

  // instance created before button is clicked to ensure user picks an opponent
  computer = new Baddy ({
    name: "not selected opponent"
  });

  // a new instance (player) is created based on the button that is clicked
  $('.player_select button').on('click', function(event) {
    event.preventDefault();

    // Player name and type set by player_select button that is clicked
    var char_name = $(this).data('name');
        char_type = $(this).data('type');
        char_image = $(this).data('img');
        char_healthMax = $(this).data('health');

    // Create instance of goody
    user = new Goody ({
      name: char_name,
      type: char_type,
      image: char_image,
      healthMax: char_healthMax
    });

    // player_select button that is clicked is highlighted
    $('.player_select button').removeClass("char_select");
    $(this).addClass('char_select');

  });

  // a new instance (opponent) is created based on the button that is clicked
  $('.opponent_select button').on('click', function(event) {
    event.preventDefault();

    // Opponent name and type set by opponent_select button that is clicked
    var char_name = $(this).data('name');
        char_type = $(this).data('type');
        char_image = $(this).data('img');
        char_healthMax = $(this).data('health');

    // Create instance of baddy
    computer = new Baddy ({
      name: char_name,
      type: char_type,
      image: char_image,
      healthMax: char_healthMax
    });

    // opponent_select button that is clicked is highlighted
    $('.opponent_select button').removeClass("char_select");
    $(this).addClass('char_select');

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
        // when both a player and opponent is selected then fade out current screen and fade in fight screen
        $('.welcome').fadeOut(500, function () {

          // set ggName and bgName to be the name and current health of the player/opponent selected
          $('.ggName').prepend(user.name).find('.ggHealth').text(user.currentHealth);
          $('.ggImg').attr("src", user.image);
          $('.bgName').prepend(computer.name).find('.bgHealth').text(computer.currentHealth);
          $('.bgImg').attr("src", computer.image);

          $('.fight_scene').fadeIn(500);
          $('.modal').addClass('animated zoomOut').one('webkitAnimationEnd', function(){
            $(this).remove();
          });

          $('.goodyBox').show().addClass('animated fadeInLeft');
          $('.baddyBox').show().addClass('animated fadeInRight');
          $('.ggHealth').text(user.currentHealth);
          $('.bgHealth').text(computer.currentHealth);
          $('.action').show().addClass('animated zoomIn');

        });

    }

  });


// FIGHT SEQUENCE - fight scene. Click attack button to fight

  $('#fightBtn').on('click', function (event) {
    event.preventDefault();

    var attack_type = _.random(1, 3);

    // user attacks computer. Type of attack determined by number generated by attack_type
    if (attack_type === 1) {

        $('.p_att_msg').text("Regular Attack!" + " " + user.attack(computer) + "pts");

    } else if (attack_type === 2) {

        $('.p_att_msg').text("Special Attack!" + " " + user.special(computer) + "pts");

    } else {

        $('.p_att_msg').text("You Missed");
    };

    // if computer is still alive then display computer health
    if (computer.currentHealth > 0) {

        $('.bgHealth').text(computer.currentHealth);

    } else if(computer.currentHealth <= 0 && user.currentHealth > 0) {

        // if computer health is depleated then display 0, name in red, go to final screen
        $('.bgHealth').text('0');
        $('.bgName').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.win_fight').delay(1000).slideDown(4000);

    } else {

        // if both characters die at the same time then display different ending message
        $('.ggHealth').text('0');
        $('.bgHealth').text('0');
        $('.ggName').css('color', 'red');
        $('.bgName').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.dead_fight').delay(1000).slideDown(4000);

    };

    // health bar for user
    if (computer.currentHealth >= computer.healthMax * 0.3 && computer.currentHealth <= computer.healthMax * 0.6) {

        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'orange');

    } else if (computer.currentHealth >= 0 && computer.currentHealth <= computer.healthMax * 0.29) {

        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'red');

    } else {

        $('.healthBar2').css('width', computer.currentHealth + "%").css('background-color', 'green');
    };


    // attack type for computer so not always the same
    var attack_type2 = _.random(1, 3);

    // computer attacks user. Type of attack determined by number generated by attack_type
    if (attack_type2 === 1) {

        $('.o_att_msg').text("Hit By A Regular Attack!" + " " + computer.attack(user) + "pts");

    } else if (attack_type2 === 2) {

        $('.o_att_msg').text("Hit By A Special Attack!" + " " + computer.special(user) + "pts");

    } else {

        $('.o_att_msg').text("You Dodged An Attack");
    };

    // if user is still alive then display user health
    if (user.currentHealth > 0) {

        $('.ggHealth').text(user.currentHealth);

    } else if(user.currentHealth <= 0 && computer.currentHealth > 0) {

        // if user health is depleated then display 0, name in red, go to final screen
        $('.ggHealth').text('0');
        $('.ggName').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.lose_fight').delay(1000).slideDown(4000);

    } else {

        // if both characters die at the same time then display different ending message
        $('.ggHealth').text('0');
        $('.bgHealth').text('0');
        $('.ggName').css('color', 'red');
        $('.bgName').css('color', 'red');
        $('#fightBtn').hide();
        $('.fight_scene').fadeOut(1000);
        $('.win_fight').hide();
        $('.dead_fight').delay(1000).slideDown(4000);

    };


    // health bar for user
    if (user.currentHealth >= user.healthMax * 0.3 && user.currentHealth <= user.healthMax * 0.6) {

        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'orange');

    } else if (user.currentHealth >= 0 && user.currentHealth <= user.healthMax * 0.29) {

        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'red');

    } else {

        $('.healthBar').css('width', user.currentHealth + "%").css('background-color', 'green');
    };


  });
