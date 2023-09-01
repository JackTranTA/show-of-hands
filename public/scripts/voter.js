$(document).ready(function() {
  const rank = [];

  let lastFocusValue = '';
  let thisIndex;
  let focusState = 0;

  $('select').each(function() {
    rank.push($( this ).val());
  });
  console.log(rank);

  const changeWithRepeats = function (index, newestValue) {
    if (rank.includes(newestValue)) {
      console.log(rank.indexOf(newestValue));
      rank[rank.indexOf(newestValue)] = lastFocusValue;
    }
    console.log(index);
    rank[index] = newestValue;
    console.log(rank);
    let i = 0;
    $('select').each(function() {
      const max = $(this).children('option').last().val();
      console.log(max);
      if (max > rank[i]) {
        for (let j = max; j > rank[i]; j--) {
          $(this).children('option').last().remove();
        }
      } else if (max < rank[i]) {
        for (let j = max; j < rank[i]; j++) {
          $(this).append($('<option>', {
              value: j,
              text: '' + j
          }));
        }
      }
      $( this ).val(rank[i++]);
    });
  };

  $('select').click(function () {
    if (focusState == 1) { focusState = 2; return; }
    else if (focusState == 2) $(this).blur();
  }).focus(function (e) {
    focusState = 1;
    lastFocusValue = $(this).val();
    for (let i = 1; i < rank.length ; i++) {
      if (rank.includes('' + i)) {
        if($(this).find('option[value="' + (i) + '"]').length < 1) {
          $(this).append($('<option>', {
              value: i,
              text: '' + (i)
          }));
        }
      } else {
        break;
      }
    }
  }).blur(function () {
    focusState = 0;
  }).change (function () {
    thisIndex = $("select").index($(this));
    console.log(thisIndex);
    changeWithRepeats(thisIndex, $(this).val());
  });


});
