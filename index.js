const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                role: role
            }).then(() => {
                if (role === 'investor') {
                    window.location.href = 'investor.html';
                } else if (role === 'business') {
                    window.location.href = 'business.html';
                } else {
                    window.location.href = 'banker.html';
                }
            });
        })
        .catch(error => {
            console.error('Error registering: ', error);
        });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            db.collection('users').doc(user.uid).get().then(doc => {
                const role = doc.data().role;
                if (role === 'investor') {
                    window.location.href = 'investor.html';
                } else if (role === 'business') {
                    window.location.href = 'business.html';
                } else {
                    window.location.href = 'banker.html';
                }
            });
        })
        .catch(error => {
            console.error('Error logging in: ', error);
        });
});
