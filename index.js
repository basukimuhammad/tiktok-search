const path = require('path');
const Fastify = require('fastify');
const { tiktoks } = require('./api/tiktok'); // Menggunakan fungsi `tiktoks` dari file TikTok API

const app = Fastify({ logger: true });

// Endpoint utama
app.get('/', async (req, res) => {
    res.send('Selamat datang di API TikTok Downloader! Gunakan /tiktok?query={kata_kunci}');
});

// Endpoint TikTok downloader
app.get('/tiktok', async (req, res) => {
    const query = req.query.query; // Mendapatkan parameter query

    if (!query) {
        return res.status(400).send({
            status: 'error',
            message: 'Parameter query tidak ditemukan! Gunakan ?query={kata_kunci}',
        });
    }

    try {
        const result = await tiktoks(query); // Memanggil fungsi Tikwm API
        res.send({
            status: 'success',
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Gagal mendapatkan video TikTok. Coba lagi nanti.',
            error: error.message,
        });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server berjalan di: http://localhost:${port}`);
});
