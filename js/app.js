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

    }
  }
})
