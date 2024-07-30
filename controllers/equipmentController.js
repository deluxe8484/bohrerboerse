const BASE_URL = 'http://localhost:3000/equipment';

const getAllEquipment = async  (req, res) => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Ausrüstungsgegenstände');
        }
        const equipmentList = await response.json();
        
        // Equipment-Listenansicht mit dynamischen Daten rendern
        res.render('equipment', { equipment: equipmentList });
    } catch (error) {
        console.error('Fehler beim Abrufen der Ausrüstungsgegenstände:', error.message);
        res.status(500).send('Fehler beim Abrufen der Ausrüstungsgegenstände.');
    }
};

const addEquipment = async (req, res) => {
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
            throw new Error('Fehler beim Hinzufügen eines Ausrüstungsgegenstands');
        }

        // Erfolgreiche Hinzufügung und Weiterleitung zur Equipment-Übersicht
        res.redirect('/equipment');
    } catch (error) {
        console.error('Fehler beim Hinzufügen eines Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Hinzufügen eines Ausrüstungsgegenstands.');
    }
};



const getEquipment = async (req, res) => {
    const { id } = req.params; // ID des angeforderten Equipments aus den Parametern abrufen
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Ausrüstungsgegenstand nicht gefunden');
        }
        const equipmentItem = await response.json();
        
        // Einzelansicht für das Equipment rendern
        res.render('equipmentDetail', { equipment: equipmentItem });
    } catch (error) {
        console.error('Fehler beim Abrufen des Ausrüstungsgegenstands:', error.message);
        res.status(404).send('Ausrüstungsgegenstand nicht gefunden.');
    }
};

const updateEquipment = async (req, res) => {
    const { id } = req.params; // ID des zu aktualisierenden Equipments
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
            throw new Error('Fehler beim Aktualisieren des Ausrüstungsgegenstands');
        }

        // Erfolgreiches Update und Weiterleitung zur Einzelansicht
        res.redirect(`/equipment/${id}`);
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Aktualisieren des Ausrüstungsgegenstands.');
    }

};

const deleteEquipment = async (req, res) => {
    const { id } = req.params; // ID des zu löschenden Equipments

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Löschen des Ausrüstungsgegenstands');
        }

        // Erfolgreiches Löschen und Weiterleitung zur Equipment-Übersicht
        res.redirect('/equipment');
    } catch (error) {
        console.error('Fehler beim Löschen des Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Löschen des Ausrüstungsgegenstands.');
    }

};

module.exports = {
    getAllEquipment, addEquipment, getEquipment, updateEquipment, deleteEquipment
};