## User Story - acceptance criteria

### As an administrator...
- I want to make a poll to get some participants to give their opinion on a subject.
  * Admin can create a poll and set the poll title.
  * Admin can let participants vote on the poll by providing the submission link that they receive when creating the poll.
- I want to make it so that the poll can only be voted on for a set amount of time.
  * The admin can set the date and time the voting period ends or the amount of time the poll will be open to submissions.
  * The submission form does not accept submissions after the end of the polling period.
  * The page instead shows a message to notify participants of the end of the voting period.
- I want to have control over the poll candidates and be able to provide a description of the candidate for the participants to read.
  * Admin can create candidates for the poll and optionally provide descriptions of each candidate.
- I want to rank poll results to capture participants' preferences more accurately.
  * The poll results are ranked using the modified Borda count rule.
- I want to receive poll results via email to archive the outcomes for future reference.
  * Admin receives an administrative link where they can view the results of the poll after poll creation.
- I want to have access to real-time poll data, such as the remaining time for the poll, current results, and the number of submissions, enabling me to make proactive arrangements.
  * The administrative link shows statistics relating to the vote, which is updated everytime the page is accessed. 
- I want to ensure that only users with administrative roles can view the poll's statistics before the poll ends, to prevent strategic voting.
  * The administrative page can not be accessed by users other than the admin.
#### Stretch
- I want to guarantee that each voter can participate only once, ensuring the fairness and integrity of the poll.
  * Admin can generate unique submission links.
  * The submission page can not be accessed again after submission.
  * The page instead shows a message to notify the participant that they have already made a submission using this link.
- I want to receive feedback from the participants about the poll so that I can better understand their choices and thoughts about the subject of the poll.
  * The feedback can be viewed in the administrative page.
- I want to be able to end the poll early if the data is required before the polling period ends.
  * The administrative page includes a button that the admin can use to end the poll immediately.
  * The admin will be asked to confirm if they wanted to end the poll.
  * The poll's end time will be set to the time when the button was pressed.
### As a participant...s
- I want to be able to provide my opinion on a subject by participating in this poll.
  * The participant can vote on the poll through the submission link provided by the admin.
  * The participant can rank the candidates of the poll by ordering them on the submission page.
- I want to be able to only vote for a certain number of candidates.
  * The participant can choose to only rank a portion of all candidates.
  * The unranked candidates will receive a score of zero according to the modified Borda count rule.
- I want the ability to vote anonymously to protect my privacy.
  * The participant can choose to leave the name field empty on the submission page to stay anonymous.
#### Stretch
- I want to receive the poll results through email once the poll concludes, allowing me to keep track of the outcomes.
  * The participant can choose to leave their email in the submission page to receive poll results at the end of the poll period.
- I want to provide feedback on the poll and give clarification on my vote.
  * The submission page includes a text field for participants to provide feedback.
