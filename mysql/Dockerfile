FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD="root"
ENV MYSQL_PASSWORD=""
ENV MYSQL_DATABASE="pkrim-art-gallery"

COPY init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]