const BASE_URL = 'http://localhost:3000/borrows';

// Abrufen aller Ausleihen
const getAllBorrows = async (req, res) => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Ausleihen');
        }
        const borrowList = await response.json();
        
        // Ansicht für ausgeliehene Gegenstände
        res.render('borrows', { borrows: borrowList });
    } catch (error) {
        console.error('Fehler beim Laden der Ausleihen:', error.message);
        res.status(500).send('Fehler beim Laden der Ausleihen.');
    }
};

// Hinzufügen einer neuen Ausleihe
const addBorrow = async (req, res) => {
    const { userid, equipmentids, start, end } = req.body; // Abrufen der Daten aus dem Anfragekörper
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, equipmentids, start, end }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Erstellen einer Ausleihe');
        }

        // Weiterleitung zur Liste der Ausleihen 
        res.redirect('/borrows');
    } catch (error) {
        console.error('Fehler beim Erstellen einer Ausleihe:', error.message);
        res.status(500).send('Fehler beim Erstellen einer Ausleihe.');
    }
};

// Abrufen einer spezifischen Ausleihe
const getBorrow = async (req, res) => {
    const { id } = req.params; // Auslesen der ID aus den Parametern
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Ausleihe nicht gefunden');
        }
        const borrowItem = await response.json();
        
        // Detailansicht für eine spezifische Ausleihe
        res.render('borrowsDetail', { borrows: borrowItem });
    } catch (error) {
        console.error('Fehler beim Laden der Ausleihe:', error.message);
        res.status(404).send('Ausleihe nicht gefunden.');
    }
};

// Aktualisieren einer vorhandenen Ausleihe
const updateBorrow = async (req, res) => {
    const { id } = req.params; // ID der zu aktualisierenden Ausleihe
    const { userid, equipmentids, start, end } = req.body; // Neue Daten aus dem Anfragekörper

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, equipmentids, start, end }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren der Ausleihe');
        }

        // Weiterleitung zur Detailansicht
        res.redirect(`/borrows/${id}`);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Ausleihe:', error.message);
        res.status(500).send('Fehler beim Aktualisieren der Ausleihe.');
    }
};

// Löschen einer Ausleihe
const deleteBorrow = async (req, res) => {
    const { id } = req.params; // ID der zu löschenden Ausleihe

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Entfernen der Ausleihe');
        }

        // Weiterleitung zur Liste der Ausleihen
        res.redirect('/borrows');
    } catch (error) {
        console.error('Fehler beim Entfernen der Ausleihe:', error.message);
        res.status(500).send('Fehler beim Entfernen der Ausleihe.');
    }
};

module.exports = {
    getAllBorrows, addBorrow, getBorrow, updateBorrow, deleteBorrow
};
