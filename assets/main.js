var wins = Array(
  "Tell me your favorite position in bed",
  "Kiss your best friend on the cheek",
  "Selfie with Mirco",
  "Invitation to our house party next week. (Bring a hot friend)",
  "One free booty clap on Tobi",
  "Say who is the best looking guy in our group",
  "Share your best pick-up line",
  "Drink from your beer, if you think someone from our group is hot",
  "Drink from your beer, if you ever had a One Night Stand",
  "Show us your sexiest dance move",
  "Share your most embarrassing date story",
  "Give a shoutout to your crush in the room",
  "Swap clothes with someone of the opposite gender for the next hour",
  "Take a selfie with the person you'd most like to kiss tonight",
  "Tell us your wildest fantasy (keep it PG-13)",
  "Whisper the name of your celebrity crush to the person next to you",
  "Do an impression of your favorite movie character",
  "Reveal the most outrageous place you've ever had a kiss",
  "Confess your guilty pleasure song and sing a line for us",
  "Send a flirty text to your last saved contact",
  "Give a lap dance to the person sitting closest to you",
  "Share your most embarrassing childhood nickname",
  "Tell us about your worst pickup line attempt",
  "Show us your best seductive face"
);


function basic() {
  confetti({
    particleCount: 1000,
    spread: 360,
    origin: { y: 0.6 },
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🍆", "🍑"]
      }
    }
  });
}

function makeItRain() {
  document.getElementById("makeItRain").disabled = true;
  var end = Date.now() + (2 * 1000);

  // go Buckeyes!
  var colors = ['#bb0000', '#ffffff'];

  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
    else {
      document.getElementById("makeItRain").disabled = false;
    }
  };
  frame();
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}


var data = [
  //{ id: '', color: '#3f297e', text: 'ALL IN', ikon: 'invert_colors' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#ECB22E', text: '🎁' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#ECB22E', text: '🎁' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#ECB22E', text: '🎁' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#ECB22E', text: '🎁' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#ECB22E', text: '🎁' },
  { id: '', color: '#2EB67D', text: '🎁' },
  { id: '', color: '#FCCD48', text: '🎁' }
];

var RouletteWheel = function (el, items) {
  this.$el = $(el);
  this.items = items || [];
  this._bis = false;
  this._angle = 0;
  this._index = 0;
  this.options = {
    angleOffset: -90
  }
}

_.extend(RouletteWheel.prototype, Backbone.Events);

RouletteWheel.prototype.spin = function (_index) {

  var count = this.items.length;
  var delta = 360 / count;
  var index = !isNaN(parseInt(_index)) ? parseInt(_index) : parseInt(Math.random() * count);

  var a = index * delta + ((this._bis) ? 1440 : -1440);

  //a+=this.options.angleOffset;

  this._bis = !this._bis;
  this._angle = a;
  this._index = index;

  var $spinner = $(this.$el.find('.spinner'));

  var _onAnimationBegin = function () {
    this.$el.addClass('busy');
    this.trigger('spin:start', this);
  }

  var _onAnimationComplete = function () {
    this.$el.removeClass('busy');
    this.trigger('spin:end', this);
  }

  $spinner
    .velocity('stop')
    .velocity({
      rotateZ: a + 'deg'
    }, {
      //easing: [20, 7],
      //easing: [200, 20],
      easing: 'easeOutQuint',
      duration: 8000,
      begin: $.proxy(_onAnimationBegin, this),
      complete: $.proxy(_onAnimationComplete, this)
    });

}

RouletteWheel.prototype.render = function () {

  var $spinner = $(this.$el.find('.spinner'));
  var D = this.$el.width();
  var R = D * .5;

  var count = this.items.length;
  var delta = 360 / count;

  for (var i = 0; i < count; i++) {

    var item = this.items[i];

    var color = item.color;
    var text = item.text;
    var ikon = item.ikon;

    var html = [];
    html.push('<div class="item" ');
    html.push('data-index="' + i + '" ');
    html.push('data-type="' + item.type + '" ');
    html.push('>');
    html.push('<span class="label">');
    if (ikon)
      html.push('<i class="material-icons">' + ikon + '</i>');
    html.push('<span class="text">' + text + '</span>');
    html.push('</span>');
    html.push('</div>');

    var $item = $(html.join(''));

    var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
    var deltaInRadians = delta * Math.PI / 180;
    var borderRightWidth = D / (1 / Math.tan(deltaInRadians));

    var r = delta * (count - i) + this.options.angleOffset - delta * .5;

    $item.css({
      borderTopWidth: borderTopWidth,
      borderRightWidth: borderRightWidth,
      transform: 'scale(2) rotate(' + r + 'deg)',
      borderTopColor: color
    });

    var textHeight = parseInt(((2 * Math.PI * R) / count) * .5);

    $item.find('.label').css({
      //transform: 'translateX('+ (textHeight) +'px) translateY('+  (-1 * R) +'px) rotateZ('+ (90 + delta*.5) +'deg)',
      transform: 'translateY(' + (D * -.25) + 'px) translateX(' + (textHeight * 1.03) + 'px) rotateZ(' + (90 + delta * .5) + 'deg)',
      height: textHeight + 'px',
      lineHeight: textHeight + 'px',
      textIndent: (R * .1) + 'px'
    });

    $spinner.append($item);

  }

  $spinner.css({
    fontSize: parseInt(R * 0.06) + 'px'
  })

  //this.renderMarker();


}

RouletteWheel.prototype.renderMarker = function () {

  var $markers = $(this.$el.find('.markers'));
  var D = this.$el.width();
  var R = D * .5;

  var count = this.items.length;
  var delta = 360 / count;

  var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
  var deltaInRadians = delta * Math.PI / 180;
  var borderRightWidth = (D / (1 / Math.tan(deltaInRadians)));

  var i = 0;
  var $markerA = $('<div class="marker">');
  var $markerB = $('<div class="marker">');

  var rA = delta * (count - i - 1) - delta * .5 + this.options.angleOffset;
  var rB = delta * (count - i + 1) - delta * .5 + this.options.angleOffset;

  $markerA.css({
    borderTopWidth: borderTopWidth,
    borderRightWidth: borderRightWidth,
    transform: 'scale(2) rotate(' + rA + 'deg)',
    borderTopColor: '#FFF'
  });
  $markerB.css({
    borderTopWidth: borderTopWidth,
    borderRightWidth: borderRightWidth,
    transform: 'scale(2) rotate(' + rB + 'deg)',
    borderTopColor: '#FFF'
  })

  $markers.append($markerA);
  $markers.append($markerB);

}

RouletteWheel.prototype.bindEvents = function () {
  this.$el.find('.button').on('click', $.proxy(this.spin, this));
}

function message() {
  let response = wins[Math.floor(Math.random() * wins.length)];
  console.log(response);
  Notiflix.Confirm.show(
    '🎉You won🎉',
    response,
    'Well okay then',
  );
  // alert("🎉WE HAVE A WINNER🎉\nPrize: " + response);
}

function win(callback) {
  basic();
  setTimeout(() => {
    // Animation completed
    callback();
  }, 0);
}

var spinner;
$(window).ready(function () {

  spinner = new RouletteWheel($('.roulette'), data);
  spinner.render();
  spinner.bindEvents();

  spinner.on('spin:start', function (r) { console.log('spin start!') });
  spinner.on('spin:end', function (r) {
    console.log('spin end! -->' + r._index);
    win(message);
  });


})
