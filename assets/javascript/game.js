$(document).ready(function() {

    // variables
    var yourCharacter = false;
    var yourEnemies = false;
    var yourDefender = false;
    var playersArray = [];
    var enemyDefeatedCount = 0;


    // creating objects and assigning them to an array 

    var firstPlayer = {
        name: "Obi-Wan Kenobi",
		healthPoints: 150,
		attackPower: 35,
		counterAttackPower: 30,
        numberOfAttacks: .25

    }

    var secondPlayer = {
        name: "Darth Maul",
		healthPoints: 120,
		attackPower: 30,
		counterAttackPower: 25,
        numberOfAttacks: .25
    }

    var thirdPlayer = {
        name: "Jar Jar Binks",
		healthPoints: 200,
		attackPower: 55,
		counterAttackPower: 50,
        numberOfAttacks: .25
    }

    var fourthPlayer = {
        name: "Padme",
		healthPoints: 150,
		attackPower: 45,
		counterAttackPower: 40,
        numberOfAttacks: .25
    }

    playersArray.push(firstPlayer);
    playersArray.push(secondPlayer);
    playersArray.push(thirdPlayer);
    playersArray.push(fourthPlayer);



    // reset function

    function startGame() {
        yourCharacter = false;
        yourEnemies = false;
        yourDefender = false;
    };

    // appending players as your character, enemies and defendent
    function selectOpponents(event) {
        event.preventDefault();
        var $this = $(this);
        if($this.hasClass('selected')) {
            return;
        } else {
            $this.addClass('selected');
        }

        if (yourCharacter === false) {
            
            $('.player').after($this);
            yourCharacter = playersArray[$this.data('player') - 1];
            yourCharacter.element = $this;
            $this.addClass('selectedOpponent');
            $this.removeClass('')

            if (yourCharacter) {
                $('.enemies').after($('.inactive .character'));
            }

        } else if (yourDefender === false) {
            $('.defender').after($this);
            yourDefender = playersArray[$this.data('player') - 1];
            yourDefender.element = $this;
            $this.addClass('selectedDefender')
            $('.lost').html('');
        }
    };


    // function for the fight between two players

    function fight(x, y) {

        // if enemy not selected send an alert

        if (yourDefender === false) {
            alert("Players not selected");
            return;
        }

        // logic for healthpoint deduction

        var attacksIncrement = yourCharacter.numberOfAttacks++;
        var attackPowerIncrement = attacksIncrement * x.attackPower
        y.healthPoints -= attackPowerIncrement;
        y.element.find('.score').html(y.healthPoints);


        if (y.healthPoints <= 0) {
            y.element.hide();
            yourDefender = false;
            $('.lost').html(y.name + ' is defeated');
            enemyDefeatedCount++;

            // check if all enemies are defeated
            if (enemyDefeatedCount === 3) {
                $('.won').html('<h1>' + 'You Won' + '</h1>')
            }

        } else {
            x.healthPoints -= y.counterAttackPower;
            x.element.find('.score').html(x.healthPoints);
        }

        if (x.healthPoints <= 0) {
            x.element.hide();
            $('.attack').hide();
            alert('You Lost, please refresh')
            return;
        }

        $('.playerAttacks').html('You attacked ' + y.name + ' for ' + attackPowerIncrement);
        $('.defenderAttacks').html(y.name + ' attacked you for ' + y.counterAttackPower);
    };

    // changing function names

    $('.character').on('click', selectOpponents);
    $('.attack').on('click', function() {
        fight(yourCharacter, yourDefender);
    });
});
