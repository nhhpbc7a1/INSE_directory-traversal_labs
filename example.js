const safeBaseDir = path.join(__dirname, 'images'); // Thư mục an toàn

app.get('/loadImage', (req, res) => {
    let encodedFilename = req.query.filename;
    let decodedFilename = decodeURIComponent(encodedFilename);

    // Chuẩn hóa đường dẫn
    let filepath = path.join(safeBaseDir, decodedFilename);
    let normalizedPath = path.normalize(filepath);

    // Kiểm tra xem đường dẫn đã chuẩn hóa có nằm trong thư mục an toàn không
    if (!normalizedPath.startsWith(safeBaseDir)) {
        return res.status(403).send('Access denied');
    }

    res.sendFile(normalizedPath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        }
    });
});
