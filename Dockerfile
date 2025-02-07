# 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 复制前端文件到 Nginx 目录
COPY . /usr/share/nginx/html

# 暴露端口 80
EXPOSE 8080

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
