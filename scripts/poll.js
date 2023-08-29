const getCurrentDateAndTime = require('/helpers/getCurrentDateAndTime.js');

const addCandidate = function() {
  let $candidate = `<article>
            <div class="form-floating">
            <input type="text" placeholder="Candidate title" id="candidate-title" name="candidate-title" class="form-control" required>
            <label for="candidate-title">Candidate title</label>
            <div class="valid-feedback">
              Looks good!
            </div>
            <div class="invalid-feedback">
              Please enter the candidate title!
            </div>
            <div class="form-floating">
              <input type="text" placeholder="Candidate description" id="candidate-description" name="candidate-description" class="form-control">
              <label for="candidate-description">Candidate description</label>
            </div>
          </article>`
  console.log("true");
}

$(document).ready(function() {
  $("poll-end").attr({
       "value" : getCurrentDateAndTime(),
       "min" : getCurrentDateAndTime()
    });
});
