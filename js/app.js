var cambioColor = true;
var intervalMove;
var  move;
var continuar;
var Puntuacion;

$(function (){

//cambio de color texto del titulo//
  setInterval(function () {
    cambioColor ? $(".main-titulo").css('color','white') : $('.main-titulo').css('color','yellow');
    cambioColor =!cambioColor;
  },500);


$('.col-1').droppable({accept:".col-2"});
$('.col-2').droppable({accept:".col-1, .col-3"});
$('.col-3').droppable({accept:".col-2, .col-4"});
$('.col-4').droppable({accept:".col-3, col-5"});
$('.col-5').droppable({accept:".col-4, col-6"});
$('.col-6').droppable({accept:".col-5, col-7",
drop: function (event, ui) { console.log($(this).attr("src"));}
  });
$('.col-7').droppable({accept:".col-6"});

$('.btn-reinicio').click(function(){
  if ($('.btn-reinicio').text() === 'Iniciar') {
    if ($(".panel-tablero").css('display') === 'none') {
        $(".panel-tablero").css('display','flex');
        $(".panel-tablero").css('height','700px');
        $(".panel-tablero").css('whidth','70%');
        $(".panel-score").css('display','flex');
        $(".panel-score").css('width', '25%');
        $(".panel-score").css('height', '700px');
        $(".time").css('display', 'block');
        $(".time").css('width', '100%');
        $(".time").css('height', '23%');
        $(".time").css('opacity', '1.0');

    }
    borrarElement();
    CompletarTablero();
    Puntuacion=0;
    move=0;
    comenzarjuego();
    $(this).text('Reiniciar');
  }
  else {
    clearInterval(intervalMove);
    $('#countdowntimer').countdowntimer({
      minutes: 0, seconds: 0,
    });
    $(this).text('Iniciar');
    $('#score-text').text('0');
  }
});

function borrarElement() {
    for (var col = 1; col <= 7; ++col) {
        $('.col-' + col).empty();
    }
}
function CompletarTablero() {
    for (var col = 1; col <= 7; ++col) {
        for (var fila = 1; fila <= 7; ++fila) {
            var nuevaImagen = $('<img>',
                {"src": "image/" + (1 + Math.floor(Math.random() * 4)) + ".png", "class": "elemento"}
            );
            $(nuevaImagen).draggable();
            $('.col-' + col).append(nuevaImagen);
        }
    }
}
});

function comenzarjuego() {
    continuar = true;

    droppableDraggable();

    $('#countdowntimer').countdowntimer({
        minutes: 2,
        seconds: 0,
        timeUp: function () {
              continuar = false;
              clearInterval(realizarMovimientos());

              var anchoPanelTablero = $('.panel-tablero').css('width');

          $(".panel-tablero").hide("slide", {direction: "left"}, "slow", function () {
                  $(".panel-tablero").css('display', 'none');
              });

             $(".panel-score").animate({width: "390%"}, 1000);

               $(".time").hide("slide", {direction: "left"});

              $('.btn-reinicio').text('Iniciar');

              $('.main-titulo-juego-terminado').css("display", "block")
          }
      });

    intervalMove = setInterval(realizarMovimientos, 1500);
}
function numerodeMovimientoNew() {
    move += 1;

    $('#movimientos-text').text(move);
}

function cambiarelement(elm1, elm2) {
    var parent1, next1,
        parent2, next2;

    parent1 = elm1.parentNode;
    next1 = elm1.nextSibling;
    parent2 = elm2.parentNode;
    next2 = elm2.nextSibling;

    parent1.insertBefore(elm2, next1);
    parent2.insertBefore(elm1, next2);
}
function realizarMovimientos() {

    var contador;
    var nombreImagen;
    var nombreImagenSgte;
    var figurasMarcadas = inicializarFigurasMarcadas();
    var huboCambios = false;

      for (var row = 0; row < 7; ++row) {
        for (var col = 0; col < 7; ++col) {
            if ((7 - col) > 2) {
              nombreImagen = $('.col-' + (col + 1)).children()[row];
              nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);
                contador = 1;
                while ((7 - col) >= 3 && contador < (7 - col)) {
                    nombreImagenSgte = $('.col-' + (col + contador + 1)).children()[row];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

              if (nombreImagen !== nombreImagenSgte) {
                        break;
                  } ++contador; }
              if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row][col + i] = true;
                    }
                }
            }

            if ((7 - row) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - row) >= 3 && contador < (7 - row)) {
                    nombreImagenSgte = $('.col-' + (col + 1)).children()[row + contador];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row + i][col] = true;
                    }
                }
            }
        }
    }

    if (huboCambios) {
        actualizarTablero(figurasMarcadas);
    } else {
        clearInterval(intervalMove);
    }
}
// se inicializan las figuras que se estan marcando//
function inicializarFigurasMarcadas() {
    var figurasMarcadas = [];

    for (var row = 0; row < 7; ++row) {
        figurasMarcadas[row] = new Array(7);
        for (var col = 0; col < 7; ++col) {
            figurasMarcadas[row][col] = false;
        }
    }

    return figurasMarcadas;
}

// funcion para actualizacion del tablero//

function actualizarTablero(figurasMarcadas) {
    var Puntuacion = 0;
    for (var col = 0; col < 7; ++col) {
        for (var fila = 0; fila < 7; ++fila) {
            if (figurasMarcadas[fila][col]) {
                $($('.col-' + (col + 1)).children()[fila]).addClass('remover');
                Puntuacion += 10;
            }
        }
    }

    if ($('.remover').length > 0) {
        $('.remover').fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(300, function () {
            $(this).remove();

            actualizarPuntaje(Puntuacion);
            crearDulces();
        });
    }
}

// funcion para crear los dulces a azar//

function crearDulces() {
    for (var col = 0; col < 7; ++col) {
        if ($('.col-' + (col + 1)).children().length < 7) {
            var numeroDulces = 7 - $('.col-' + (col + 1)).children().length;

            for (var i = 1; i <= numeroDulces; ++i) {
                var nuevoDulce = $('<img>',
                    {"src": "image/" + (1 + Math.floor(Math.random() * 4)) + ".png", "class": "elemento"});
                $('.col-' + (col + 1)).prepend(nuevoDulce);
            }
        }
    }

    droppableDraggable();
}

// funcion para actualizar Puntuacion//
function actualizarPuntaje(masPuntaje) {
    Puntuacion += masPuntaje;

    $('#score-text').text(Puntuacion);
}

function droppableDraggable() {
    $(".elemento").draggable({
        disabled: false,
        cursor: "move",
        containment: ".panel-tablero",
        revert: true,
        revertDuration: 500,
        snap: ".elemento",
        snapMode: "inner",
        snapTolerance: 40,
        stop: function (event, ui) {

             numerodeMovimientoNew();
        }
    });
    $(".elemento").droppable({
        drop: function (event, ui) {
            if (intervalMove !== 0) {
                var dropped = ui.draggable;
                var droppedOn = this;

                var colDropped = Number($($(dropped).parent()).attr("class").substring(4, 5));
                var colDroppedOn = Number($($(droppedOn).parent()).attr("class").substring(4, 5));

                if ((Math.abs(colDropped - colDroppedOn) === 1) || colDroppedOn === colDropped) {
                    cambiarelement(dropped[0], droppedOn);
                    intervalMove = setInterval(realizarMovimientos, 1500);
                }
            }
        }
    });
}
