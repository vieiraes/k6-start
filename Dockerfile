# Build Step
FROM bitcapital/node-base:12

# Prepare SSH private key
RUN mkdir -p /root/.ssh/ && bash -c 'echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa'
RUN chmod 400 /root/.ssh/id_rsa
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN ssh-keyscan git.btcore.app >> /root/.ssh/known_hosts

# Create base monorepo directory and dependencies
WORKDIR /usr/src/bitcapital/
COPY ./package.json ./yarn.lock ./lerna.json ./tsconfig.json /usr/src/bitcapital/
RUN yarn install --ignore-engines --production=false

# Create app directory and bootstrap dependencies
COPY . /usr/src/bitcapital/
RUN yarn bootstrap && rm -rf /root/.ssh && yarn cache clean && rm -fr /usr/local/share/.cache/yarn;

ENTRYPOINT ["/bin/bash", "-l", "-c"]