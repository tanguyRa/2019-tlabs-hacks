FROM node:8.9

WORKDIR /home/composer

# composer dependencies
RUN yarn global add composer-cli@0.20 composer-rest-server@0.20 generator-hyperledger-composer@0.20 yo composer-playground@0.20
RUN mkdir -p /root/.config/insight-nodejs && \
    chmod g+rwx /root /root/.config /root/.config/insight-nodejs /root/.config/configstore /home/composer

ENV COMPOSER_CARD=admin@seed
ENV COMPOSER_NAMESPACES=never
ENV COMPOSER_AUTHENTICATION=false
ENV COMPOSER_MULTIUSER=false
ENV COMPOSER_TLS=false
ENV COMPOSER_WEBSOCKETS=true

CMD [ "echo", "TO BE OVERRIDEN" ]
