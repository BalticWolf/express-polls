This API allows to:

Retrieve a poll in particular (/polls/:id):
- method: GET
- data: none
- answer: 200, {
    id: 1,
    question: 'a question',
    answers: ['answer1', 'answer2', ...],
    votes: [a1, a2, a2, a1, ...]
}

Create a poll, by providing a question and possible answers:
- method: POST
- data: question 'my question' (string), answers: ['answer1', 'answer2', ...]
- answer: 201, {
    id: automatic,
    question: 'my question',
    answers: ['answer1', 'answer2', ...],
    votes: [ ]
}

Delete a poll (/polls/:id):
- method: DELETE
- data: none
- answer: 204 if deleted, 404 if poll not found

Vote to a specific poll (/polls/:id/votes):
- method: POST
- data: answer (integer): index of answers[ ] corresponding to the answer
- answer: 200, {
    id: id,
    question: 'a question',
    answers: ['answer1', 'answer2', ...],
    votes: [..., answer, ...]
}