// public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    // Fetch and display user profile
    const profileInfo = document.getElementById('profileInfo');
    const profileSection = document.getElementById('profileSection');

    if (profileInfo) {
        fetch('/api/users/profile', {
            headers: { 'Authorization': token }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                profileInfo.textContent = data.message;
            } else {
                profileInfo.innerHTML = `
                    <strong>Name:</strong> ${data.name}<br>
                    <strong>Email:</strong> ${data.email}<br>
                    <strong>Role:</strong> ${data.role}<br>
                    <!-- Add more profile details as needed -->
                `;
            }
        })
        .catch(err => {
            profileInfo.textContent = 'Error fetching profile';
        });
    }

    // Fetch and display matches
    const matchesDiv = document.getElementById('matches');
    if (matchesDiv) {
        fetch('/api/users/match', {
            headers: { 'Authorization': token }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                matchesDiv.textContent = data.message;
            } else {
                // Display matched roommates
                const roommates = data.roommates;
                const apartments = data.apartments;

                let html = '<h3>Matched Roommates:</h3>';
                roommates.forEach(user => {
                    html += `
                        <div class="apartment">
                            <h4>${user.name} (${user.email})</h4>
                            <!-- Add more user details as needed -->
                        </div>
                    `;
                });

                html += '<h3>Matched Apartments:</h3>';
                apartments.forEach(apartment => {
                    html += `
                        <div class="apartment">
                            <h4>${apartment.title}</h4>
                            <p>${apartment.description}</p>
                            <p><strong>Location:</strong> ${apartment.location}</p>
                            <p><strong>Price:</strong> $${apartment.price}</p>
                            <p><strong>Available Rooms:</strong> ${apartment.availableRooms}</p>
                            <!-- Add more apartment details as needed -->
                        </div>
                    `;
                });

                matchesDiv.innerHTML = html;
            }
        })
        .catch(err => {
            matchesDiv.textContent = 'Error fetching matches';
        });
    }

    // Handle listing a new apartment
    const listApartmentForm = document.getElementById('listApartmentForm');
    if (listApartmentForm) {
        listApartmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const location = document.getElementById('location').value;
            const price = document.getElementById('price').value;
            const availableRooms = document.getElementById('availableRooms').value;
            const amenities = document.getElementById('amenities').value.split(',').map(a => a.trim());

            const response = await fetch('/api/apartments', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ title, description, location, price, availableRooms, amenities })
            });

            const data = await response.json();
            const message = document.getElementById('listApartmentMessage');

            if (response.ok) {
                message.textContent = 'Apartment listed successfully!';
                message.style.color = 'green';
                listApartmentForm.reset();
            } else {
                message.textContent = data.message;
                message.style.color = 'red';
            }
        });
    }

    // Fetch and display all apartments on apartments.html
    const apartmentsList = document.getElementById('apartmentsList');
    if (apartmentsList) {
        fetch('/api/apartments')
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                apartmentsList.textContent = data.message;
            } else {
                let html = '';
                data.forEach(apartment => {
                    html += `
                        <div class="apartment">
                            <h3>${apartment.title}</h3>
                            <p>${apartment.description}</p>
                            <p><strong>Location:</strong> ${apartment.location}</p>
                            <p><strong>Price:</strong> $${apartment.price}</p>
                            <p><strong>Available Rooms:</strong> ${apartment.availableRooms}</p>
                            <p><strong>Listed By:</strong> ${apartment.listedBy.name} (${apartment.listedBy.role})</p>
                            <!-- Add more apartment details as needed -->
                        </div>
                    `;
                });
                apartmentsList.innerHTML = html;
            }
        })
        .catch(err => {
            apartmentsList.textContent = 'Error fetching apartments';
        });
    }

    // Logout functionality
    const logoutLinks = document.querySelectorAll('#logout');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    });
});
