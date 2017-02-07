FROM node:onbuild
RUN mkdir -p usr/src/app
COPY package.json /usr/src/app/
RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]

