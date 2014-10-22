(function () {


// CONSTRUCTORS

  // User
  var Goody = function (options) {
    var options = options || {};
    this.name = options.name;
    this.heatlh = options.health;
    this.attack = function() {
      // change health of baddy
    }
  };


  // Computer
  var Baddy = function(options) {
    var options = options || {};
    this.name = options.name;
    this.heatlh = options.health;
    this.attack = function () {
      // change health of Player
    }
  };


  // INSTANCES

  // User
  var Brutus = new Goody ({
    name: 'Brutus',
    health: 100

  });

  console.log(Brutus);

  var Titus = new Goody ({
    name: 'Titus',
    health: 100

  });


  var Zuchius = new Goody ({
    name: 'Zuchius',
    health: 100

  });


  // Computer
  var Zues = new Baddy ({
    name: 'Zues',
    health: 100

  });

  var Herculus = new Baddy ({
    name: 'Herculus',
    health: 500

  });

  var Maximus = new Baddy ({
    name: 'Maximus',
    health: 1000

  });


}());
