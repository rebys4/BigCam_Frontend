const express = require("express");
const cors = require("cors");
const multer = require("multer");
const EasyYandexS3 = require("easy-yandex-s3").default;
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 8080;

app.use(cors({ origin: "*" }));
app.options("*", cors({ origin: "*" }));

app.use(multer().any());

const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: "YCAJEM1mnDng6kt-XF4OTO0td",
        secretAccessKey: "YCPfhdcWXy_xACsCYcZC5rk7zR-I1KqbdD_6zKmf",
    },
    Bucket: "avatar-bucket",
    debug: false,
});

app.post("/upload-avatar", async (req, res) => {
    if (!req.files || !req.files[0]) {
        return res.status(400).json({ error: "Файл не был прикреплён или пуст." });
    }

    try {
        const fileBuffer = req.files[0].buffer;
        const avatar_id = uuidv4();
        const fileName = `avatar-${avatar_id}.jpeg`;

        const uploadResult = await s3.Upload(
            { buffer: fileBuffer, name: fileName },
            "/avatars/"
        );

        if (!uploadResult) {
            return res.status(500).json({ error: "Ошибка загрузки файла в S3" });
        }

        res.json({ 
            avatarUrl: uploadResult.url, 
            avatar_id: avatar_id,
        });
    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        res.status(500).json({ error: "Ошибка загрузки файла" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
