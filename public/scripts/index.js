// Client facing scripts here
$(() => {
  const $form = $('.needs-validation');
  $form.on('submit', function(event) {
    if (!this.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    $form.addClass('was-validated');
  });
});
