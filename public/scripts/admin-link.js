$(() => {
  const $copy = $('.copy');
  $copy.on('click', function(){
    const textToCopy = $('.link').val();
    console.log(textToCopy);
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      $('.copy-message').html("<p class='copy-message'>Text copied successfully!</p>");
    }).catch((err) => {
      $('.copy-message').html("<p class='copy-message'>Unable to copy selected text!</p>");
    });
  })
});

document.addEventListener('DOMContentLoaded', function () {
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
  console.log(labels);
  console.log(values);
  console.log(colors);


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
