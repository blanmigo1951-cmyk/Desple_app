const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.json());

// Endpoint para empaquetar una web en APK
app.post('/compilar', (req, res) => {
    const { urlApp, nombreApp } = req.body;

    // Comando para generar un envoltorio nativo rápida mediante Bubblewrap/Cordova
    const comando = `npx @bubblewrap/cli build --manifest=${urlApp}/manifest.json`;

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: "Error durante la compilación nativa." });
        }
        
        // Deplaza el archivo generado y retorna la URL pública de descarga
        const downloadUrl = `https://tu-servidor.com/descargas/${nombreApp}.apk`;
        res.json({ status: "Éxito", url_descarga: downloadUrl });
    });
});

app.listen(3000, () => console.log('Servidor de compilación corriendo en puerto 3000'));
