const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs').promises;

// Middleware để phục vụ file tĩnh
app.use(express.static(path.join(__dirname))); // Để phục vụ các tệp tĩnh từ thư mục gốc


app.use((req, res, next) => {
    // Kiểm tra nếu yêu cầu là GET
    if (req.method === 'GET') {
        // Lấy đường dẫn và query string từ yêu cầu
        const originalUrl = req.originalUrl;  // Lấy URL gốc từ request
        const pathname = req.path;           // Lấy phần đường dẫn (path)
        const query = req.query;             // Lấy query string từ URL

        // In ra URL gốc để xem giống y yêu cầu từ người dùng
        // console.log(`Original URL: ${originalUrl}`);
        // console.log(`Pathname: ${pathname}`);
        // console.log(`Query parameters: ${JSON.stringify(query)}`);



        // Giả sử bạn muốn xử lý route '/loadImage'
        if (pathname === '/loadImage') {
            let filename = originalUrl.substring(originalUrl.indexOf('filename=') + 9,originalUrl.length); // Lấy tên file từ query string

            console.log(`original filename: ${filename}`);
        
            // =============== lab1's protect module
            function checkFileName(filename) {
                let newfilename = '';
                for (let i = 0; i < filename.length; i++) {   
                    if (filename[i] == '.' && filename[i+1]=='.' && filename[i+2]=='/') {     
                        i += 2;
                    }          
                    newfilename += filename[i];  
                }
                return newfilename;
            }
            filename = checkFileName(filename);

            // ========== lab2's protect module
            function checkFileName(filename) {
                let newfilename = '';
                for (let i = 0; i < filename.length; i++) {   
                    if (filename[i] == '.' && filename[i+1]=='.' && filename[i+2]=='/') {     
                        i += 2;
                    }          
                    newfilename += filename[i];  
                }
                return newfilename;
            }
            filename = checkFileName(filename);

            // ========== lab3's protect module
            function checkFileName(filename) {
                let x = 
                while ()
                for (let i = 0; i < filename.length; i++) {   
                    if (filename[i] == '.' && filename[i+1]=='.' && filename[i+2]=='/') {     
                        i += 2;
                    }          
                    newfilename += filename[i];  
                }
                return newfilename;
            }
            filename = checkFileName(filename);
            
            console.log(`filename: ${filename}`);
            // Xác định đường dẫn đầy đủ đến file hình ảnh trong thư mục 'images'
            const filepath = path.join(__dirname, 'images', filename);
            
            
            console.log(`filepath: ${filepath}`);
                    
            res.sendFile(filepath, (err) => {
                if (err) {
                    console.error(err); // Ghi lỗi ra console
                    res.status(404).send('File not found'); // Trả về lỗi nếu không tìm thấy file
                }
            });
                } else {
            // Nếu không phải đường dẫn '/loadImage', tiếp tục xử lý các route khác
            next();
        }
    } else {
        // Nếu không phải phương thức GET, tiếp tục với các middleware khác
        next();
    }
});

// Route để phục vụ hình ảnh
app.get('/loadImage', (req, res) => {

});

// Route chính phục vụ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
