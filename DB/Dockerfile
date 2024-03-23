FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Admin123!

WORKDIR /usr/src/sql

COPY ./your_sql_scripts/*.sql /usr/src/sql/

EXPOSE 1433

CMD /opt/mssql/bin/sqlservr & sleep 20 && /opt/mssql-tools/bin/sqlcmd -U sa -P Admin123! -i /usr/src/sql/BooksTable.sql & sleep infinity