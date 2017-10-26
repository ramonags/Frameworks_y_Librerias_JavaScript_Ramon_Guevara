var cambioColor = true;
$(function (){

//cambio de color texto del titulo//
  setInterval(function () {
    cambioColor ? $(".main-titulo").css('color','white') : $('.main-titulo').css('color','yellow');
    cambioColor =!cambioColor;
  },500);
});

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
    $('#countdonwntimer').countdonwntimer({
      minutes: 0, seconds: 0
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

            $(".panel-tablero").animate({
                height: "0",
                width: "0"
            }, 4100, function () {
                $(".panel-tablero").css('display', 'none');
            });

            $('.panel-score').animate({
                width: anchoPanelTablero
            }, 3000);

            $('.time').animate({
                opacity: 0.0
            }, 2000);

            $('.btn-reinicio').text('Iniciar');

            $('.main-titulo-juego-terminado').css("display", "block")
        }
    });

    intervalMove = setInterval(realizarMovimientos, 1500);
}
function numerodeMovimientoNew() {
    movimientos += 1;

    $('#movimientos-text').text(movimientos);
}
