
/**
 *******************************************
 * Busca de cidades via ajax
 * Baseado no tutorial  https://www.youtube.com/watch?v=mZOpvhywT_E
 */

$(document).ready(function () {
  var API_PMAIS = (typeof API_PMAIS !== 'undefined') ?API_PMAIS:'//api.pontomais.com.br';

  var search_value = $('#address_city_id').val();
  if (search_value.length > 0) {
      console.log('Carregando cidade pelo id');
      $.ajaxSetup({ cache: true });
      $('#result_cities').html('');
      $('#state').val('');
      var searchField = search_value;
      var expression = new RegExp(searchField, "i");
      $.getJSON(API_PMAIS+'/public_api/cities', function (data) {
          $('#result_cities').html('');
          $.each(data.cities, function (key, value) {
              if (value.id.toString().search(expression) != -1) {
                  $('#search_city').val(value.name);
              }
          });
      });
  }


  $.ajaxSetup({ cache: true });
  $('#search_city').keyup(function () {
      var search_value = $(this).val();
      if (search_value.length < 4) {
          return false;
      }
      $('#result_cities').html('');
      $('#state').val('');
      var searchField = $('#search_city').val();
      var expression = new RegExp(searchField, "i");
      $.getJSON(API_PMAIS+'/public_api/cities?attributes=id,name,state&name=' + $('#search_city').val(), function (data) {
          $('#result_cities').html('');
          $('#result_cities').append('<span class="list-group-item link-class" id="close_result_cities">Fechar [x]</span>')
          $.each(data.cities, function (key, value) {
              if (value.name.toString().search(expression) != -1 || value.state.toString().search(expression) != -1 || value.id.toString().search(expression) != -1) {
                  $('#result_cities').append('<li class="list-group-item link-class" city_name="' + value.name + '" city_id="' + value.id + '" >' + value.name + ' | <span class="text-muted">' + value.state + '</span> | <span class="text-muted">' + value.id + '</span></li>');
              }
          });
      });
  });

  $('#result_cities').on('click', 'li', function () {
      var city_id = $(this).attr('city_id');
      var city_name = $(this).attr('city_name');
      console.log('address_city_id: '+city_id)
      $('#address_city_id').val(city_id);
      $('#search_city').val(city_name);
      $('#result_cities').html('');
  });

  $('#result_cities').on('click', 'span#close_result_cities', function () {
    $('#result_cities').html('');
  });

});

/**
 *******************************************
 */

