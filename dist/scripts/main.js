/* Lettering.JS 0.6.1 by Dave Rupert  - http://daverupert.com */
(function($){function injector(t,splitter,klass,after){var a=t.text().split(splitter),inject='';if(a.length){$(a).each(function(i,item){inject+='<span class="'+klass+(i+1)+'">'+item+'</span>'+after});t.empty().append(inject)}}var methods={init:function(){return this.each(function(){injector($(this),'','char','')})},words:function(){return this.each(function(){injector($(this),' ','word',' ')})},lines:function(){return this.each(function(){var r="eefec303079ad17405c889e092e105b0";injector($(this).children("br").replaceWith(r).end(),r,'line','')})}};$.fn.lettering=function(method){if(method&&methods[method]){return methods[method].apply(this,[].slice.call(arguments,1))}else if(method==='letters'||!method){return methods.init.apply(this,[].slice.call(arguments,0))}$.error('Method '+method+' does not exist on jQuery.lettering');return this}})(jQuery);

/*
 * textillate.js
 * http://jschr.github.com/textillate
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Jordan Schroter
 */

(function ($) {
  "use strict";

  function isInEffect (effect) {
    return /In/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0;
  };

  function isOutEffect (effect) {
    return /Out/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0;
  };


  function stringToBoolean(str) {
    if (str !== "true" && str !== "false") return str;
    return (str === "true");
  };

  // custom get data api method
  function getData (node) {
    var attrs = node.attributes || []
      , data = {};

    if (!attrs.length) return data;

    $.each(attrs, function (i, attr) {
      var nodeName = attr.nodeName.replace(/delayscale/, 'delayScale');
      if (/^data-in-*/.test(nodeName)) {
        data.in = data.in || {};
        data.in[nodeName.replace(/data-in-/, '')] = stringToBoolean(attr.nodeValue);
      } else if (/^data-out-*/.test(nodeName)) {
        data.out = data.out || {};
        data.out[nodeName.replace(/data-out-/, '')] =stringToBoolean(attr.nodeValue);
      } else if (/^data-*/.test(nodeName)) {
        data[nodeName.replace(/data-/, '')] = stringToBoolean(attr.nodeValue);
      }
    })

    return data;
  }

  function shuffle (o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function animate ($c, effect, cb) {
    $c.addClass('animated ' + effect)
      .css('visibility', 'visible')
      .show();

    $c.one('animationend webkitAnimationEnd oAnimationEnd', function () {
        $c.removeClass('animated ' + effect);
        cb && cb();
    });
  }

  function animateChars ($chars, options, cb) {
    var that = this
      , count = $chars.length;

    if (!count) {
      cb && cb();
      return;
    }

    if (options.shuffle) $chars = shuffle($chars);
    if (options.reverse) $chars = $chars.toArray().reverse();

    $.each($chars, function (i, c) {
      var $char = $(c);

      function complete () {
        if (isInEffect(options.effect)) {
          $char.css('visibility', 'visible');
        } else if (isOutEffect(options.effect)) {
          $char.css('visibility', 'hidden');
        }
        count -= 1;
        if (!count && cb) cb();
      }

      var delay = options.sync ? options.delay : options.delay * i * options.delayScale;

      $char.text() ?
        setTimeout(function () { animate($char, options.effect, complete) }, delay) :
        complete();
    });
  };

  var Textillate = function (element, options) {
    var base = this
      , $element = $(element);

    base.init = function () {
      base.$texts = $element.find(options.selector);

      if (!base.$texts.length) {
        base.$texts = $('<ul class="texts"><li>' + $element.html() + '</li></ul>');
        $element.html(base.$texts);
      }

      base.$texts.hide();

      base.$current = $('<span>')
        .text(base.$texts.find(':first-child').html())
        .prependTo($element);

      if (isInEffect(options.in.effect)) {
        base.$current.css('visibility', 'hidden');
      } else if (isOutEffect(options.out.effect)) {
        base.$current.css('visibility', 'visible');
      }

      base.setOptions(options);

      base.timeoutRun = null;

      setTimeout(function () {
        base.options.autoStart && base.start();
      }, base.options.initialDelay)
    };

    base.setOptions = function (options) {
      base.options = options;
    };

    base.triggerEvent = function (name) {
      var e = $.Event(name + '.tlt');
      $element.trigger(e, base);
      return e;
    };

    base.in = function (index, cb) {
      index = index || 0;

      var $elem = base.$texts.find(':nth-child(' + (index + 1) + ')')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})
        , $chars;

      $elem.addClass('current');

      base.triggerEvent('inAnimationBegin');

      base.$current
        .text($elem.html())
        .lettering('words');

      base.$current.find('[class^="word"]')
          .css({
            'display': 'inline-block',
            // fix for poor ios performance
            '-webkit-transform': 'translate3d(0,0,0)',
               '-moz-transform': 'translate3d(0,0,0)',
                 '-o-transform': 'translate3d(0,0,0)',
                    'transform': 'translate3d(0,0,0)'
          })
          .each(function () { $(this).lettering() });

      $chars = base.$current
        .find('[class^="char"]')
        .css('display', 'inline-block');

      if (isInEffect(options.in.effect)) {
        $chars.css('visibility', 'hidden');
      } else if (isOutEffect(options.in.effect)) {
        $chars.css('visibility', 'visible');
      }

      base.currentIndex = index;

      animateChars($chars, options.in, function () {
        base.triggerEvent('inAnimationEnd');
        if (options.in.callback) options.in.callback();
        if (cb) cb(base);
      });
    };

    base.out = function (cb) {
      var $elem = base.$texts.find(':nth-child(' + (base.currentIndex + 1) + ')')
        , $chars = base.$current.find('[class^="char"]')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})

      base.triggerEvent('outAnimationBegin');

      animateChars($chars, options.out, function () {
        $elem.removeClass('current');
        base.triggerEvent('outAnimationEnd');
        if (options.out.callback) options.out.callback();
        if (cb) cb(base);
      });
    };

    base.start = function (index) {
      base.triggerEvent('start');

      (function run (index) {
        base.in(index, function () {
          var length = base.$texts.children().length;

          index += 1;

          if (!base.options.loop && index >= length) {
            if (base.options.callback) base.options.callback();
            base.triggerEvent('end');
          } else {
            index = index % length;

            base.timeoutRun = setTimeout(function () {
              base.out(function () {
                run(index)
              });
            }, base.options.minDisplayTime);
          }
        });
      }(index || 0));
    };

    base.stop = function () {
      if (base.timeoutRun) {
        clearInterval(base.timeoutRun);
        base.timeoutRun = null;
      }
    };

    base.init();
  }

  $.fn.textillate = function (settings, args) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('textillate')
        , options = $.extend(true, {}, $.fn.textillate.defaults, getData(this), typeof settings == 'object' && settings);

      if (!data) {
        $this.data('textillate', (data = new Textillate(this, options)));
      } else if (typeof settings == 'string') {
        data[settings].apply(data, [].concat(args));
      } else {
        data.setOptions.call(data, options);
      }
    })
  };

  $.fn.textillate.defaults = {
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    in: {
      effect: 'fadeInLeftBig',
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    out: {
      effect: 'hinge',
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    autoStart: true,
    inEffects: [],
    outEffects: [ 'hinge' ],
    callback: function () {}
  };

}(jQuery));

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
          $('.bgName').prepend(computer.name).find('.bgHealth').text(computer.currentHealth);

          $('.fight_scene').fadeIn(500);
          $('.modal').addClass('animated zoomOut');

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

        user.attack(computer);
        $('.p_att_msg').text("Regular Attack!");

    } else if (attack_type === 2) {

        user.special(computer);
        $('.p_att_msg').text("Special Attack!");

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

        computer.attack(user);
        $('.o_att_msg').text("Hit By A Regular Attack!");

    } else if (attack_type2 === 2) {

        computer.special(user)
        $('.o_att_msg').text("Hit By A Special Attack!");

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
