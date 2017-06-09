 const polls = [
    {
        id: 1,
        question: 'Do you like binary code?',
        answers: ['yes', 'no'],
        votes: []
    },
    {
        id: 2,
        question: 'Are you the boss of me?',
        answers: ['yes', 'no', 'maybe', "i don't know", 'can you repeat the question?'],
        votes: []
    }
];

// Retrieval of polls list
function getAll() {
    return polls;
}

// Retrieval of a specific poll by its id
function getById(id) {
    return polls.find(p => p.id === id);
}

// Creation of a new poll
function create(question, answers) {
    const maxId = Math.max(...polls.map(p => p.id));
    const poll = {
        id: maxId + 1,
        question: question,
        answers: answers,
        votes: []
    };

    polls.push(poll);
    return poll;
}

// Poll deletion by its id
function drop(id) {
    const index = polls.findIndex(p => p.id === id);
    polls.splice(index, 1); // delete one single element from polls based on its index
}

// Vote to a poll (by its id)
function vote(id, vote) {
    const poll = polls.find(p => p.id === id);
    poll.votes.push(vote);

    return poll.votes;
}

module.exports = {
    getAll, getById, create, vote,
    delete: drop
};
