const postLoan = document.getElementById('postLoan');

postLoan.addEventListener('submit', (e) => {
    e.preventDefault();
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value;
    const duration = document.getElementById('duration').value;

    const user = auth.currentUser;
    db.collection('loanDetails').add({
        loanAmount: loanAmount,
        interestRate: interestRate,
        duration: duration,
        userId: user.uid
    }).then(() => {
        alert('Loan details posted successfully!');
    }).catch(error => {
        console.error('Error posting loan details: ', error);
    });
});

// Fetch and display user queries
db.collection('queries').get().then(snapshot => {
    snapshot.forEach(doc => {
        const query = doc.data();
        const div = document.createElement('div');
        div.innerHTML = `<h3>Query from ${query.userId}</h3><p>${query.queryText}</p>`;
        document.getElementById('queriesList').appendChild(div);
    });
});
