$('#valid_perso').click(function() {
  let url = $('#url');
  let nom = $('#nom');
  let pv = $('#pv');
  let pa = $('#pa');

  if (url.val() == '' || nom.val() == '' || pv.val() == '' || pa.val() == '') {
    $('#error').show();
    $('#error').html('Formulaire incomplet');
    setTimeout(function showMessage() {
      $('#error').hide();
    }, 2500);
  } else {
    $.ajax({
      url: 'http://localhost/Versus/addPerso.php',
      type: 'POST',
      data: {
        url: url.val(),
        nom: nom.val(),
        pv: pv.val(),
        pa: pa.val()
      },
      success: function success(result) {
        $('#success').show();
        $('#success').html('Perso ajouté !');
        setTimeout(function showMessage() {
          $('#success').hide();
        }, 2500);
        url.val('');
        nom.val('');
        pv.val('');
        pa.val('');
      },
      error: function erreur(error) {
        $('#error').show();
        $('#error').html(error);
      }
    });
  }
});
