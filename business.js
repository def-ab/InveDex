const postIdea = document.getElementById('postIdea');

postIdea.addEventListener('submit', (e) => {
    e.preventDefault();
    const businessSector = document.getElementById('businessSector').value;
    const fundingRequired = document.getElementById('fundingRequired').value;
    const ideaDescription = document.getElementById('ideaDescription').value;

    const user = auth.currentUser;
    db.collection('businessIdeas').add({
        sector: businessSector,
        fundingRequired: fundingRequired,
        description: ideaDescription,
        userId: user.uid
    }).then(() => {
        alert('Business idea posted successfully!');
    }).catch(error => {
        console.error('Error posting business idea: ', error);
    });
});

// Fetch and display investor proposals
db.collection('investorProposals').get().then(snapshot => {
    snapshot.forEach(doc => {
        const proposal = doc.data();
        const div = document.createElement('div');
        div.innerHTML = `<h3>${proposal.sector}</h3><p>${proposal.description}</p><p>Investment Amount: ${proposal.budget}</p>`;
        document.getElementById('investorList').appendChild(div);
    });
});
