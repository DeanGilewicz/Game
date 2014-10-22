(function () {


// CONSTRUCTORS

  // User
  var Person = function (options) {
    var options = options || {};
    this.heatlh = options.health;
    this.attack = function() {
      // change health of baddy
    }
  };


  // Computer
  var Baddy = function(options) {
    var options = options || {};
    this.heatlh = options.health;
    this.attack = function () {
      // change health of Player
    }
  };


  // INSTANCES

  // User
  var Brutus = new Person ({
    health: 100

  });

  var Titus = new Person ({
    health: 100

  });


  var Zuchius = new Person ({
    health: 100

  });


  // Computer
  var Zues = new Baddy ({
    health: 100

  });

  var Herculus = new Baddy ({
    health: 500

  });

  var Maximus = new Baddy ({
    health: 1000

  });



}());
