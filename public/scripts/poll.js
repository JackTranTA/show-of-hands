function getCurrentDateAndTime() {
  const dateTime = new Date().toJSON().slice(0,16);
  return dateTime.toLocaleString();
}

const addCandidate = function(count) {
  let $candidate = `<article>
          <div class="form-floating">
            <input type="text" placeholder="Candidate title" name="candidate-title-${count}" class="form-control" required>
            <label for="candidate-title-${count}">Candidate title</label>
            <div class="valid-feedback">
              Looks good!
            </div>
            <div class="invalid-feedback">
              Please enter the candidate title!
            </div>
          </div>
          <div class="form-floating">
            <input type="text" placeholder="Candidate description" name="candidate-description-${count}" class="form-control">
            <label for="candidate-description-${count}">Candidate description</label>
          </div>
        </article>`
  return $candidate;
}

$(document).ready(function() {
  let count = 0;
  $("#end").attr({
    "min" : getCurrentDateAndTime()
  });

  $("#add-candidate").click(function(){
    count++;
    $("article").last().append(addCandidate(count));
  })
});
