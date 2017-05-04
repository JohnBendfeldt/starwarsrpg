$(document).ready(function() {

var yourCharacter = false;
	yourEnemies = false;
	yourDefender = false;
	playersArray = [];
	enemyDefeatedCount = 0;
	audioWin = new Audio('assets/audio/victory.mp3');
    audioLoss = new Audio('assets/audio/imperial_march.mp3');
    clash = new Audio('assets/audio/fight.wav');
    slay = new Audio('assets/audio/slay.wav');
    death = new Audio('assets/audio/death.wav');
	// creating characters and stats and assigning them to an array 
	var firstPlayer = {
		name: 'Obi-Wan Kenobi',
		healthPoints: 150,
		attackPower: 15,
		counterAttackPower: 25,
		numberOfAttacks: 1
	}

	var secondPlayer = {
		name: 'Darth Maul',
		healthPoints: 120,
		attackPower: 25,
		counterAttackPower: 20,
		numberOfAttacks: 1
	}

	var thirdPlayer = {
		name: 'Jar Jar Binks',
		healthPoints: 200,
		attackPower: 20,
		counterAttackPower: 35,
		numberOfAttacks: 1
	}

	var fourthPlayer = {
		name: 'Padme',
		healthPoints: 150,
		attackPower: 20,
		counterAttackPower: 25,
		numberOfAttacks: 1
	}

	playersArray.push(firstPlayer);
	playersArray.push(secondPlayer);
	playersArray.push(thirdPlayer);
	playersArray.push(fourthPlayer);



	// Sets game state

	function startGame() {
		yourCharacter = false;
		yourEnemies = false;
		yourDefender = false;
	};
	// appending players as your hero, enemies and defender
	function selectOpponents(event) {
		event.preventDefault();
		$('#instructions').hide();
		var $this = $(this);
		if (yourCharacter === false) {
            
			$('.player').after($this);
			yourCharacter = playersArray[$this.data('player') - 1];
			yourCharacter.element = $this;
			$this.addClass('selectedHero');
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


	// Sets uf the fight between characters

	function fight(x, y) {

		// if enemy not selected 
		if (yourDefender === false) {
			$('.status').html('<h1>' + 'Players not selected' + '<h1>');
			return;
		}

		// damage logic
		var attacksIncrement = yourCharacter.numberOfAttacks++;
		var attackPowerIncrement = attacksIncrement * x.attackPower
		y.healthPoints -= attackPowerIncrement;
		y.element.find('.score').html(y.healthPoints);


		if (y.healthPoints <= 0) {
			y.element.hide();
			yourDefender = false;
			$('.status').html('<h2>' + y.name + ' is defeated' + '</h2>');
			slay.play();
			enemyDefeatedCount++;

			// check if all enemies are defeated
			if (enemyDefeatedCount === 3) {
				$('.attack').hide();
				audioWin.play();
				$('.playerAttacks').hide();
				$('.defenderAttacks').hide();
				$('.won').html('<h1>' + 'You Won! Hit ' + '<button>' + '<h2>' + 'Restart' + '</h2>' + '</button>' + ' if you want to play again!' + '</h1>');
			}

		} else {
			x.healthPoints -= y.counterAttackPower;
			x.element.find('.score').html(x.healthPoints);
			clash.play();
		}

		if (x.healthPoints <= 0) {
			x.element.hide();
 			$('.attack').hide();
 			death.play();
 			audioLoss.play();
 			$('.playerAttacks').hide();
			$('.defenderAttacks').hide();
			$('.lost').html('<h1>' + 'You Lost, hit ' + '<button>' + '<h2>' + 'Restart' + '</h2>' + '</button>' + ' to try again!' + '</h1>');
		}

		$('.playerAttacks').html('You attacked ' + y.name + ' for ' + attackPowerIncrement + ' damage.');
		$('.defenderAttacks').html(y.name + ' attacked you for ' + y.counterAttackPower + ' damage.');
	};

	// setting function names
	$('.character').on('click', selectOpponents);
	$('.attack').on('click', function() {
		fight(yourCharacter, yourDefender);
	});
});
