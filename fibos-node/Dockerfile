FROM ubuntu:16.04
LABEL Maintainer="William Fouvy <fouvey@gmail.com>"

STOPSIGNAL SIGINT

RUN apt-get update -y \
  && apt-get install -y curl \
  && apt-get install -y sudo \
  && apt-get install -y openssl \
  && curl -s https://fibos.io/download/installer.sh | sh

CMD ["fibos", "/fibos/start.js"]

EXPOSE 9870 8870
