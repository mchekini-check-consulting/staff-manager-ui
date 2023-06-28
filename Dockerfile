FROM nginx
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY dist/staff-manager-ui /usr/share/nginx/html
