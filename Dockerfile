# Sử dụng Node.js phiên bản LTS làm image gốc
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc trong container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy (thường là 3000 cho Node.js)
EXPOSE 3000

# Thiết lập biến môi trường NODE_ENV thành production (tùy chọn)
ENV NODE_ENV=production

# Command để chạy server Node.js khi container khởi động
CMD ["node", "server.js"]
