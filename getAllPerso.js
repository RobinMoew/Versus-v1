$(document).ready(() => {
  $.ajax({
    url: 'http://localhost/Versus/getAllPerso.php',
    type: 'GET',
    success: function(result) {
      result = JSON.parse(result);

      for (let i = 0; i < result.length; i++) {
        $('#fighters').append(`
          <div class="fighter" id='${result[i].id}'>
            <img src="${result[i].url}" />
            <div class="text">
              <span>${result[i].nom} - </span>
              <span>${result[i].id}</span>
            </div>
          </div>
        `);
      }

      let one_clickedFighter;
      let one_last_clicked;
      let one_idFighter;
      let one_last_idFighter;

      let second_clickedFighter;
      let second_last_clicked;
      let second_idFighter;
      let second_last_idFighter;

      let selected = false;

      $('.fighter').click((event) => {
        if (!selected) {
          one_clickedFighter = event.currentTarget;

          if (one_clickedFighter.classList.contains('one_selected')) {
            one_clickedFighter.classList.add('one_selected');
          } else {
            selected = true;
            one_clickedFighter = event.currentTarget;
            one_clickedFighter.classList.toggle('one_selected');
            one_idFighter = one_clickedFighter.getAttribute('id');
            $('#id_self').val(one_idFighter);

            if (one_last_idFighter == undefined) {
              one_last_idFighter = one_idFighter;
              one_last_clicked = one_clickedFighter;
            } else if (one_idFighter != one_last_idFighter) {
              one_last_clicked.classList.toggle('one_selected');
              one_last_idFighter = one_idFighter;
              one_last_clicked = one_clickedFighter;
            }
          }
        } else {
          second_clickedFighter = event.currentTarget;

          if (second_clickedFighter.classList.contains('second_selected')) {
            second_clickedFighter.classList.add('second_selected');
          } else {
            selected = false;
            second_clickedFighter = event.currentTarget;
            second_clickedFighter.classList.toggle('second_selected');
            second_idFighter = second_clickedFighter.getAttribute('id');
            $('#id_versus').val(second_idFighter);

            if (second_last_idFighter == undefined) {
              second_last_idFighter = second_idFighter;
              second_last_clicked = second_clickedFighter;
            } else if (second_idFighter != second_last_idFighter) {
              second_last_clicked.classList.toggle('second_selected');
              second_last_idFighter = second_idFighter;
              second_last_clicked = second_clickedFighter;
            }
          }
        }
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
});
