FROM nikolaik/python-nodejs:latest

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
RUN pip install -r requirements.txt

CMD ["python", "main.py"]