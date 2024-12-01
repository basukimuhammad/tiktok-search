const axios = require("axios");

function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: new URLSearchParams({
          keywords: query,
          count: 50,
          cursor: 0,
          HD: 1
        }).toString()
      });

      const { data } = response;
      if (!data.data || !data.data.videos || data.data.videos.length === 0) {
        return reject("Tidak ada video ditemukan.");
      }

      const videos = data.data.videos;
      const randomIndex = Math.floor(Math.random() * videos.length);
      const selectedVideo = videos[randomIndex];

      const result = {
        title: selectedVideo.title || null,
        cover: selectedVideo.cover || null,
        origin_cover: selectedVideo.origin_cover || null,
        no_watermark: selectedVideo.play || null,
        watermark: selectedVideo.wmplay || null,
        music: selectedVideo.music || null
      };

      resolve(result);
    } catch (error) {
      reject(`Error: ${error.message || "Gagal memproses permintaan."}`);
    }
  });
}

module.exports = {
  tiktoks
};
