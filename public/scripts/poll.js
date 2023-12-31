function getCurrentDateAndTime() {
  const dateTime = new Date().toJSON().slice(0,16);
  return dateTime.toLocaleString();
}

const addCandidate = function(count) {

  let $candidate = `
    <div class="row mb-3 candidate">
      <div class="mb-3">
        <div class="form-group col-6 mx-auto">
          <label for="candidate-title-${count}">Candidate title</label>
          <input type="text" name="candidate-title-${count}" class="form-control form-control-lg" required>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Please enter the candidate title!
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="form-group col-6 mx-auto">
          <label for="candidate-description-${count}">Candidate description</label>
          <input type="text" name="candidate-description-${count}" class="form-control form-control-lg">
        </div>
      </div>

      <div class="mb-3 delete-candidate-container">
        <div class="col-3 mx-auto d-flex justify-content-center">
          <button type="button" class="btn btn-primary delete-candidate">Delete candidate</button>
        </div>
      </div>
      <hr class="col-6 mx-auto">
    </div>`;

  return $candidate;
};

$(document).ready(function() {
  let count = 1;
  $("#end").attr({
    "min" : getCurrentDateAndTime()
  });

  $("#add-candidate").on('click', function() {
    count++;
    $(".add-candidate-container").before(addCandidate(count));
  });

  $(".poll-container").on('click', '.delete-candidate', function() {
    let deleteButton = $(this);
    deleteButton.closest('.candidate').remove();
  });

  $("#form").submit(function(event) {
    console.log('submit button clicked');
    event.preventDefault();

  });

  $('.redirect').on('click', function() {
    $.ajax({
      type: "GET",
      url: "/",
      success: function() {
        console.log("redirecting to index");
        $('.modal').modal('hide');
        window.location.href = '/';
      },
      error: function() {
        console.log('ajax error');
      }
    });
  });
  // form validation
  const $form = $('.needs-validation');
  $form.on('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.checkValidity()) {
      $form.addClass('was-validated');
      $.ajax({
        type: "POST",
        url: "/poll/",
        data: $("#form").serialize(),
        success: function(data) {
          console.log("POST request successful. Showing modal.");
          $(".modal").modal('show');
        },
        error: function() {
          console.log('ajax error');
        }
      });
    } else {
      $form.addClass('was-validated');
    }
  });
});
