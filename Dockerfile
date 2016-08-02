FROM node:4.4.4

# npm global dependencies
RUN npm install -g npm && \
    npm config set progress false && \
    npm install -g gulp

# main dir
WORKDIR /opt/chubaca

# project dependencies
COPY package.json /opt/chubaca/package.json

ENTRYPOINT ["./entrypoint.sh"]

CMD ["gulp", "eslint"]
