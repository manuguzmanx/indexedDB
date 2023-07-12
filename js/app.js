let DB;

document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout(() => {
        crearCliente();
    }, 5000);
});

function crmDB() {
    //Crear BD V1.0
    let crmDB = window.indexedDB.open('crm', 1.0);

    //Si hay un error
    crmDB.onerror = function() {
        console.log('Hubo error al crear la BD');
    }

    //Si se creó bien
    crmDB.onsuccess = function() {
        console.log('BD Creada');

        DB = crmDB.result;
    }

    //Método configuracion DB
    crmDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        });

        //Definir columnas
        objectStore.createIndex('nombre', 'nombre', { unique: false });

        objectStore.createIndex('email', 'email', { unique: true });
        
        objectStore.createIndex('telefono', 'telefono', { unique: false });

        console.log('Columnas creadas');
    }

}

function crearCliente() {
    let transaction = DB.transaction(['crm'], 'readwrite');

    transaction.oncomplete = function () {
        console.log('Transacción completada');
    }

    transaction.onerror = function() {
        console.log('Hubo error en la transacción');
    }

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: 5586687559,
        nombre: 'Manu',
        email: 'luisvg18@gmail.com'
    }

    const peticion = objectStore.add(nuevoCliente);
    console.log('peticion');
}