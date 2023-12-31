$(() => {
  const $copy = $('.copy');
  $copy.on('click', function() {
    const textToCopy = $('.link').val();
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        $('.copy-message').html("<p class='copy-message'>Text copied successfully!</p>");
      }).catch((err) => {
        $('.copy-message').html("<p class='copy-message'>Unable to copy selected text!</p>");
      });
  });

  $('.end-button').on('click', function() {
    const $button = $(this);
    const urlParts = window.location.pathname.split('/');
    const identifier = urlParts[urlParts.length - 1];
    $.ajax({
      type: "POST",
      url: `/admin/${identifier}`,
      success: function() {
        $button.text('Poll Ended');
        $button.prop('disabled', true);
      },
      error: function() {
        console.log('ajax error');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let labels = [];
  let values = [];
  let colors = [];

  function generateColor() {
    const hex = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  for (const result of results) {
    labels.push(result['title']);
    values.push(result['sum']);
  }

  for (let i = 0; i < labels.length; i++) {
    colors.push(generateColor());
  }

  new Chart('barChart', {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Points Received',
        data: values,
        backgroundColor: colors
      }]
    },
    options: {
      legend: {
        labels: {
          fontSize: 16
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
});
