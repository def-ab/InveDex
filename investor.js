const postProposal = document.getElementById('postProposal');

postProposal.addEventListener('submit', (e) => {
    e.preventDefault();
    const sector = document.getElementById('sector').value;
    const budget = document.getElementById('budget').value;
    const description = document.getElementById('description').value;

    const user = auth.currentUser;
    db.collection('investorProposals').add({
        sector: sector,
        budget: budget,
        description: description,
        userId: user.uid
    }).then(() => {
        alert('Proposal posted successfully!');
    }).catch(error => {
        console.error('Error posting proposal: ', error);
    });
});

// Fetch and display business proposals
db.collection('businessIdeas').get().then(snapshot => {
    snapshot.forEach(doc => {
        const idea = doc.data();
        const div = document.createElement('div');
        div.innerHTML = `<h3>${idea.sector}</h3><p>${idea.description}</p><p>Funding Required: ${idea.fundingRequired}</p>`;
        document.getElementById('businessList').appendChild(div);
    });
});
