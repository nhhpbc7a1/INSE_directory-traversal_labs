const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs').promises;

// Middleware để phục vụ file tĩnh
app.use(express.static(path.join(__dirname))); // Để phục vụ các tệp tĩnh từ thư mục gốc

const safeBaseDir = path.join(__dirname, 'images'); // Thư mục an toàn

function checkFileName_case1(filename) {
    return filename.replaceAll('../', '');
}

function checkFileName_case2(filename) {
    while (filename.includes('../')) {
        filename = filename.replaceAll('../', '');
    }
    return filename;
}


app.use((req, res, next) => {
    // Kiểm tra nếu yêu cầu là GET
    if (req.method === 'GET') {
        // Lấy đường dẫn và query string từ yêu cầu
        const pathname = req.path;           // Lấy phần đường dẫn (path)

        // Giả sử bạn muốn xử lý route '/loadImage'

        if (pathname === '/loadImage') {
            let filename = req.query.filename;

            
            // filename = decodeURIComponent(filename); // ================ case 3 's protect module

            // filename = checkFileName_case1(filename); // =============== case 1's protect module

            // filename = checkFileName_case2(filename); // =============== case 2's protect module

            filename = decodeURIComponent(filename);

            // Xác định đường dẫn đầy đủ đến file hình ảnh trong thư mục 'images'
            const filepath = path.join(__dirname, 'images', filename);
            
            console.log(`filepath before take end send: ${filepath}`);
                    
            res.sendFile(filepath, (err) => {
                if (err) {
                    console.error(err); // Ghi lỗi ra console
                    res.status(404).send('File not found'); // Trả về lỗi nếu không tìm thấy file
                }
            });
        } 
        else {
            // Nếu không phải phương thức GET, tiếp tục với các middleware khác
            next();
        }
    }
});

// Route chính phục vụ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

