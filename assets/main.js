var single_participants = Array(
  "Timo",
  "Christian",
  "Tobi"
)

var taken_participants = Array(
  "Malte",
  "Sven",
  "Ferdinand"
)

var wins = Array(
  "Wann hattest du das letzte Mal Sex?",
  "Bist du rasiert?",
  "Glück gehabt - du hast ein freilos",
  "Tausch mit jemandem am Tisch einen Eiswürfel aus",
  "Wie kommst du am besten?",
  "Was hast du für sexuelle Vorlieben?",
  "Von wem hast du das letzte Mal geträumt?",
  "Mit wem könntest du dir hier am ehesten was vorstellen?",
  "Der ausgefallenste Ort an dem du je Sex hattest?",
  "hattest du schonmal einen dreier? wenn nein, ex dein glas",
  "Such Dir jemanden, dem Du einen Zungenkuss gibst",
  "Verrate deine Lieblingsposition im Bett",
  "Küsse deinen Freund auf die Wange",
  "Sag, wer der bestaussehende Typ in unserer Gruppe ist oder schmeiß eine Runde",
  "Trink einen Schluck, wenn du jemals einen One-Night-Stand hattest",
  "Zeig uns deinen sexiesten Tanzmove oder trinke",
  "Zeig dein bestes Flirt-Gesicht",
  "Enthülle den verrücktesten Ort, an dem du jemals Sex hattest oder zieh ein Kleidungsstück aus (Socke zählt nicht)",
  "Schicke eine flirtende Nachricht an deinen letzten Chat",
  "Trink einen Schluck, wenn du schon jemanden auf dieser Party geküsst hast",
  "Mach ein Selfie mit dir und {name}",
  "Gib {name} ein unvergessliches Kompliment",
  "Fordere jemanden zu einem Daumenkrieg heraus, Verlierer trinkt",
  "Nimm einen Shot, wenn du jemals nackt baden warst",
  "Zeige dein bestes Duckface",
  "Benutze deinen besten Anmachspruch bei {name}",
  "Gib {name} einen Klaps auf den Arsch",
  "Verteil 3 Schlücke",
  "Vergib 3 Schlücke",
  "Lass {name} einen Schluck trinken",
  "Zeig deine Brüste oder nimm einen Schluck (gilt such für Männers)",
  "Ranke den Bodycount deiner Freundinnen. Trinke wenn du falsch liegst.",
  "Wem traust du zu, heute noch am Strand Sex zu haben.",
  "Gib deiner Freundin einen Klaps auf den Arsch.",
  "Gib {name} einen Kuss auf die Wange",
  "Geh zu dem heißesten Typen oder Girl & frag nach der Nummer",
  "Gratuliere Sven zum 18ten Geburtstag (er kommt nicht damit klar, dass er jetzt alt ist)",
);

// Keep track of available wins (copy of original wins array)
var availableWins = [...wins];

// Default fallback message when all wins are used
var defaultWin = "Alle Aufgaben wurden bereits gespielt! Zeit für eine neue Runde oder eigene Ideen! 🎉";

function basic(partCount) {
  confetti({
    particleCount: partCount,
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
  { id: '', color: '#FF0000', text: '🎁' }, // Red
  { id: '', color: '#FF4000', text: '🎁' }, // Orange-Red
  { id: '', color: '#FF8000', text: '🎁' }, // Orange
  { id: '', color: '#FFBF00', text: '🎁' }, // Golden Yellow
  { id: '', color: '#FFFF00', text: '🎁' }, // Yellow
  { id: '', color: '#BFFF00', text: '🎁' }, // Lime Green
  { id: '', color: '#80FF00', text: '🎁' }, // Yellow-Green
  { id: '', color: '#40FF00', text: '🎁' }, // Green
  { id: '', color: '#00FF00', text: '🎁' }, // Bright Green
  { id: '', color: '#00FF80', text: '🎁' }, // Spring Green
  { id: '', color: '#00FFBF', text: '🎁' }, // Turquoise
  { id: '', color: '#00FFFF', text: '🎁' }, // Cyan
  { id: '', color: '#00BFFF', text: '🎁' }, // Deep Sky Blue
  { id: '', color: '#0080FF', text: '🎁' }, // Dodger Blue
  { id: '', color: '#0040FF', text: '🎁' }, // Royal Blue
  { id: '', color: '#0000FF', text: '🎁' }  // Blue
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
      duration: 6000,
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

function checkResponseForNameAndSubstitute(win){
  if (win.includes("{name}")) {
    let randomName = participants[Math.floor(Math.random() * participants.length)];
    let resultString = win.replace("{name}", randomName);
    return resultString;
  }
  // If no {name} tag is found, return the inputString unchanged
  return win;
}

function message() {
  let response;
  
  // Check if there are still available wins
  if (availableWins.length > 0) {
    // Get random index from available wins
    let randomIndex = Math.floor(Math.random() * availableWins.length);
    // Get the response
    response = availableWins[randomIndex];
    // Remove the used response from available wins
    availableWins.splice(randomIndex, 1);
  } else {
    // All wins have been used, use default fallback
    response = defaultWin;
  }
  
  response = checkResponseForNameAndSubstitute(response);
  
  console.log(response);
  Notiflix.Confirm.show(
    '🎉DU HAST GEWONNEN🎉',
    response,
    'Gib das Handy an die nächste Person weiter',
  );
  // alert("🎉WE HAVE A WINNER🎉\nPrize: " + response);
}

function win(callback) {
  basic(1000);
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
