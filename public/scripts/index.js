// Client facing scripts here
$(() => {
  const $form = $('.needs-validation');
  $form.on('submit', function(event) {
    if (!this.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    // } else {
    //   event.preventDefault();
    //
    //   const formData = $form.serialize();
    //   $.ajax({
    //     method: 'POST',
    //     url: '/admins/',
    //     data: formData,
    //     success: (res) => {
    //       console.log(res);
    //     },
    //     error: (error) => {
    //       console.log("error", error);
    //     }
    //   })
    //}
    $form.addClass('was-validated');
  });
});
