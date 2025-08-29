#!/bin/sh

npx prisma migrate deploy

exec node dist/server.js || { echo "[ENTRYPOINT] Node falhou; iniciando fallback"; tail -f /dev/null; }
