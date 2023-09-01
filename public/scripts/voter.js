$(document).ready(function() {
  const rank = [];

  let lastFocusValue = '';
  let thisIndex;
  let focusState = 0;

  $('select').each(function() {
    rank.push($(this).val());
  });

  const changeWithRepeats = function(index, newestValue) {
    if (rank.includes(newestValue)) {
      const index2 = rank.indexOf(newestValue);
      rank[index2] = lastFocusValue;
      const max = $("select").eq(index2).children('option').last().val();
      if (max < lastFocusValue) {
        for (let i = Number(max); i < lastFocusValue; i++) {
          $("select").eq(index2).append($('<option>', {
            value: i + 1,
            text: '' + (Number(i) + 1)
          }));
        }
        for (let i = lastFocusValue; i > max; i--) {
          $("select").eq(index).children('option').last().remove();
        }
      }
    }
    rank[index] = newestValue;
    let i = 0;
    $('select').each(function() {
      $(this).val(rank[i++]);
    });
  };

  $('select').click(function() {
    if (focusState == 1) {
      focusState = 2; return;
    } else if (focusState == 2) $(this).blur();
  }).focus(function(e) {
    focusState = 1;
    lastFocusValue = $(this).val();
    for (let i = 1; i <= rank.length + 1; i++) {
      if (rank.includes('' + i) && lastFocusValue != i) {
        if ($(this).find('option[value="' + (i + 1) + '"]').length < 1) {
          $(this).append($('<option>', {
            value: i + 1,
            text: '' + (i + 1)
          }));
        }
      } else {
        break;
      }
    }
  }).blur(function() {
    focusState = 0;
  }).change(function() {
    thisIndex = $("select").index($(this));
    changeWithRepeats(thisIndex, $(this).val());
  });

});
