
# syntax=docker/dockerfile:1

FROM nginx:1.27-alpine AS runtime
COPY starful.net/ /usr/share/nginx/html
RUN sed -i 's/listen[[:space:]]\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
