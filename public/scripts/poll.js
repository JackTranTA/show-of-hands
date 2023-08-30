function getCurrentDateAndTime() {
  const dateTime = new Date();
  return dateTime.toLocaleString();
}

const generateRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < 6; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
};

const addCandidate = function() {
  let $candidate = `<article>
          <div class="form-floating">
            <input type="text" placeholder="Candidate title" name="candidate-title" class="form-control" required>
            <label for="candidate-title">Candidate title</label>
            <div class="valid-feedback">
              Looks good!
            </div>
            <div class="invalid-feedback">
              Please enter the candidate title!
            </div>
          </div>
          <div class="form-floating">
            <input type="text" placeholder="Candidate description" name="candidate-description" class="form-control">
            <label for="candidate-description">Candidate description</label>
          </div>
        </article>`
  return $candidate;
}

$(document).ready(function() {
  console.log(getCurrentDateAndTime());
  $("#poll-end").attr({
    "min" : getCurrentDateAndTime()
  });

  $("#add-candidate").click(function(){
    $("article").last().append(addCandidate());
  })
});
