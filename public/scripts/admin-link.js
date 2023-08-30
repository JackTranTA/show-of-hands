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
})
