$(document).ready(() => {
  let self = [
    localStorage.getItem('self_name'),
    localStorage.getItem('self_pv'),
    localStorage.getItem('self_pa'),
    localStorage.getItem('self_url')
  ];

  let self_name = self[0];
  let self_pv = parseInt(self[1]);
  let self_pa = parseInt(self[2]);
  let self_url = self[3];

  let versus = [
    localStorage.getItem('versus_name'),
    localStorage.getItem('versus_pv'),
    localStorage.getItem('versus_pa'),
    localStorage.getItem('versus_url')
  ];

  let versus_name = versus[0];
  let versus_pv = parseInt(versus[1]);
  let versus_pa = parseInt(versus[2]);
  let versus_url = versus[3];

  $('#main').append(`
    <div id="title">
      <h1 id="left">
        ${self_name}
        <progress id="self_bar" value="${self_pv}" max="${self_pv}"></progress>
      </h1>
      <span>VS</span>
      <h1 id="right">
        ${versus_name}
        <progress id="versus_bar" value="${versus_pv}" max="${versus_pv}"></progress>
      </h1>
    </div>
    <div id="images">
      <img src="${self_url}" alt="${self_name}" id="self_img" />
      <img src="${versus_url}" alt="${versus_name}" id="versus_img" />
    </div>
  `);

  let self_current_pv;
  let self_max_pv;
  let self_current_precentage;
  let versus_current_pv;
  let versus_max_pv;
  let versus_current_precentage;
  let attack = false;

  let fight = setInterval(() => {
    self_current_pv = $('#self_bar').attr('value');
    self_max_pv = $('#self_bar').attr('max');
    self_current_precentage = (self_current_pv * 100) / self_max_pv;

    versus_current_pv = $('#versus_bar').attr('value');
    versus_max_pv = $('#versus_bar').attr('max');
    versus_current_precentage = (versus_current_pv * 100) / versus_max_pv;

    console.log(self_current_pv, self_max_pv);

    $('#self_img').removeClass('rotateIn');
    $('#self_img').removeClass('self_attack');
    $('#versus_img').removeClass('rotateIn');
    $('#versus_img').removeClass('versus_attack');

    let rand = Math.ceil(Math.random() * 6);
    let rand_self_attack = Math.ceil(Math.random() * self_pa);
    let rand_versus_attack = Math.ceil(Math.random() * versus_pa);

    if (attack == false) {
      if (rand % 2 == 1) {
        attack = true;
        $('#self_img').addClass('rotateIn');
      } else {
        attack = true;
        $('#self_img').addClass('self_attack');

        versus_pv -= rand_self_attack;
        $('#versus_bar').attr('value', versus_pv);
      }
    } else {
      if (rand % 2 == 1) {
        attack = false;
        $('#versus_img').addClass('rotateIn');
      } else {
        attack = false;
        $('#versus_img').addClass('versus_attack');

        self_pv -= rand_versus_attack;
        $('#self_bar').attr('value', self_pv);
      }
    }

    if (self_current_precentage <= 50) {
      $('#self_bar').addClass('orange');
    }
    if (self_current_precentage <= 25) {
      $('#self_bar').removeClass('orange');
      $('#self_bar').addClass('red');
    }

    if (versus_current_precentage <= 50) {
      $('#versus_bar').addClass('orange');
    }
    if (versus_current_precentage <= 25) {
      $('#versus_bar').removeClass('orange');
      $('#versus_bar').addClass('red');
    }

    if (self_pv <= 0 || versus_pv <= 0) {
      if (versus_pv <= 0) {
        $('#versus_img').hide();
      } else {
        $('#self_img').hide();
      }
      clearInterval(fight);
      $('#main').append(`
        <div id="buttons">
          <a href='../index.html'>Retour</a>
          <button id='reload'>Re-FIGHT</button>
        </div>
      `);

      $('#reload').click(() => {
        location.reload();
      });
    }
  }, 1500);
});
