#!/usr/bin/env node
/* eslint-disable */
/* @ts-ignore */


import { connectApp } from "./app";
import debug from "debug";
debug("express-react:server");
import http from "http";

const httpServer = connectApp().then((app) => {
  
  let server: any;
  let port: any;
  

    try {
      port = app.get('port');

/* @ts-ignore */
      function onListening() {
        const addr = server.address();
        // @ts-ignore
        const bind =
          typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log("Listening on " + bind);
      }
      /* @ts-ignore */
      function onError(error: any) {
        if (error.syscall !== "listen") {
          throw error;
        }
    
        const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    
        // handle specific listen errors with friendly messages
        switch (error.code) {
          case "EACCES":
            console.error(bind + " requires elevated privileges");
            server.close((err: any) => {
              process.exit(1);
            });
            break;
          case "EADDRINUSE":
            console.error(bind + " is already in use");
            server.close((err: any) => {
              process.exit(1);
            });
            break;
          default:
            throw error;
        }
      }
  
      server = http.createServer(app);
      server.listen(port);
      server.on("error", onError);
      server.on("listening", onListening);
    } catch (err) {
      console.error(`Global Error: ${err}`);
      server.close((err: any) => {
        process.exit(1);
      });
    }
  });
  
  export default httpServer;