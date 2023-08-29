$(() => {
  const $copy = $('.copy');
  $copy.on('click', function(){
    const textToCopy = $('.link').val();
    console.log(textToCopy);
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      $(this).after("<p class='copy-message'>Text copied successfully!</p>");
    }).catch((err) => {
      $(this).after("<p class='copy-message'>Unable to copy selected text!</p>");
    });
  })
})
