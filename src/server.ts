import express from "express";
import { getPayloadClient } from "./get-payload-client";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

async function start() {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })
  app.use((request, response) => nextHandler(request, response));
  nextApp.prepare().then((response) => {
    // payload.logger.info("Next.js started");
    app.listen(PORT, async () => {});
    // payload.logger.info(`Next.js App URL :${process.env.NEXT_PUBLIC_SERVER_URL}`);
  });
}

start();
