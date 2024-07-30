const BASE_URL = 'http://localhost:3000/users';

const getAllUsers = async (req, res) => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Nutzerdaten');
        }
        const usersList = await response.json();
        
        // Equipment-Listenansicht mit dynamischen Daten rendern
        res.render('users', { equipment: usersList });
    } catch (error) {
        console.error('Fehler beim Abrufen der Nutzer:', error.message);
        res.status(500).send('Fehler beim Abrufen der Nutzer.');
    }
}

const addUser = async (req, res) => {
    const { name, type, available } = req.body; // Daten aus dem Anfragekörper abrufen
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, type, available }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Hinzufügen eines Nutzers');
        }

        // Weiterleitung auf users Seite wenn Erstellen des Nutzers erfolgreich
        res.redirect('/users');
    } catch (error) {
        console.error('Fehler beim Hinzufügen eines Nutzers:', error.message);
        res.status(500).send('Fehler beim Hinzufügen eines Nutzers.');
    }
}

const getUser = async (req, res) => {
    const { id } = req.params; // ID des angeforderten Users aus den Parametern abrufen
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('User nicht gefunden');
        }
        const user = await response.json();
        
        // Einzelansicht für einen User rendern
        res.render('userDetail', { user : user });
    } catch (error) {
        console.error('Fehler beim Abrufen des Users:', error.message);
        res.status(404).send('User nicht gefunden.');
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params; // ID des zu aktualisierenden Users
    const { name, type, available } = req.body; // Neue Daten aus dem Anfragekörper

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, type, available }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Users');
        }

        // Erfolgreiches Update und Weiterleitung zur Einzelansicht
        res.redirect(`/users/${id}`);
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Users:', error.message);
        res.status(500).send('Fehler beim Aktualisieren des Users.');
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params; // ID des zu löschenden Users

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Löschen des Users');
        }

        // Erfolgreiches Löschen und Weiterleitung zur User-Übersicht
        res.redirect('/users');
    } catch (error) {
        console.error('Fehler beim Löschen des Users:', error.message);
        res.status(500).send('Fehler beim Löschen des Users.');
    }
}

const filterByName = async (req, res) => {
    const nameQuery = req.query.username;

    if (!nameQuery) {
        return res.status(400).json({ error: 'Query parameter "username" is required' });
    }

    try {
        const response = await fetch(BASE_URL);
        const users = await response.json();

        // Filtern der Userdaten nach dem Query-Parameter "username"
        const filteredUsers = users.filter(user => user.username.toLowerCase().includes(nameQuery.toLowerCase()));

        res.json(filteredUsers);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
}

module.exports = {
    getAllUsers, addUser, getUser, updateUser, deleteUser, filterByName
}