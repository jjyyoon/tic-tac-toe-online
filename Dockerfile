FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine

COPY ./frontend/config /app/frontend/config
COPY ./frontend/public /app/frontend/public
COPY ./frontend/scripts /app/frontend/scripts
COPY ./frontend/src /app/frontend/src
COPY ./frontend/package.json /app/frontend/

WORKDIR /app/frontend/

RUN npm upgrade
RUN npm install
RUN npm run build

COPY ./backend/config /app/backend/config
COPY ./backend/models /app/backend/models
COPY ./backend/*.py /app/backend/
COPY ./backend/requirements.txt /app/backend/

WORKDIR /app/backend/
RUN apk upgrade --update
RUN apk add --update --no-cache libffi-dev bash postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev
RUN pip install -r requirements.txt
RUN apk del .tmp-build-deps

CMD ["sh", "-c", "python create_tables.py && python main.py"]