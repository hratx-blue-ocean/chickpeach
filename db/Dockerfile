FROM mysql:latest

ENV MYSQL_DATABASE chickpeach
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_USER root
ENV MYSQL_PASSWORD password
ENV DATABASE_HOST db

EXPOSE 3306

ADD schema.sql /docker-entrypoint-initdb.d
