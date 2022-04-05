# ifp-organizer
# docker build --build-arg NPM_TOKEN=${NPM_TOKEN} -t ifp-organizer:0.0.1 .
# docker save -o ifp-organizer-0.0.1.tar ifp-organizer:0.0.1

FROM node:14.16-slim as builder
RUN npm install -g pkg@4.4.9 \
  && mkdir -p /tmp/noop \
  && cd /tmp/noop \
  && touch noop.js \
  && pkg noop.js --targets linux --output noop \
  && rm -rf /tmp/noop

FROM ubuntu:18.04 as runtime
COPY --from=builder /tmp/app/server /root/
CMD ["/root/server"]
