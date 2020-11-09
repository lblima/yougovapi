import { createServer } from "./server";

createServer()
  .then((server) => {
    server.listen(3000, () => {
      // tslint:disable-next-line: no-console
      console.info(`Listening on http://localhost:3000`);
    });
  })
  .catch((err) => {
    // tslint:disable-next-line: no-console
    console.error(`Error: ${err}`);
  });
