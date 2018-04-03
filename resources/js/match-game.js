var MatchGame = {};

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var sequentialValues = [];

  for (i = 1;i <= 8; i++) {
    sequentialValues.push(i);
    sequentialValues.push(i);
  }

  var cardValues = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1);
    cardValues.push(randomValue);
  }

  return cardValues;
};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColors = [
    'hsl(24,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (i=0;i<cardValues.length;i++) {
    var value = cardValues[i];
    var color = cardColors[value -1];
    var data = {
      value: value,
      color: color,
      flipped: false
    }

    var $cardElement = $('<div class="card col-xs-3"></div>');
    $cardElement.data(data);
    $game.append($cardElement);
  };

  $('.card').click(function() {
    console.log('card clicked');
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  };

  $card.css('background-color', $card.data('color'))
    .text($card.data('value'))
    .data('flipped', true);

  var flippedCards = $game.data('flippedCards')
  flippedCards.push($card);

  if (flippedCards.length > 1) {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      var card1Val = parseInt(card1.data('value'));
      var card2Val = parseInt(card2.data('value'));


      if (card1Val === card2Val) {
        console.log('match');
        var matchCss = {
          backgroundColor: 'rgb(153, 153, 153)',
          color: 'rgb(204, 204, 204)'
        };
        card1.css(matchCss);
        card2.css(matchCss);
      } else {
        window.setTimeout(function() {
        var resetCss = {
          backgroundColor: 'rgb(32,64,86)'
        }
        card1.css(resetCss)
          .text('')
          .data('flipped', false);
        card2.css(resetCss)
          .text('')
          .data('flipped', false);
        }, 350);
      };

      $game.data('flippedCards', []);
  };
};
