"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketWrapper = void 0;
const events_1 = require("events");
const node_dtls_client_1 = require("node-dtls-client");
const Hostname_1 = require("./Hostname");
class SocketWrapper extends events_1.EventEmitter {
    constructor(socket) {
        super();
        this.socket = socket;
        this.isDtls = (socket instanceof node_dtls_client_1.dtls.Socket);
        socket
            .on("message", (message, rinfo) => {
            this.emit("message", message, rinfo);
        })
            .on("error", (err) => {
            this.emit("error", err);
        })
            .on("close", () => {
            this.emit("close");
        });
    }
    send(msg, origin) {
        if (this.isClosed)
            return;
        if (this.isDtls) {
            this.socket.send(msg);
        }
        else {
            this.socket.send(msg, origin.port, (0, Hostname_1.getSocketAddressFromURLSafeHostnameWithoutLookup)(origin.hostname));
        }
    }
    close() {
        if (this.isClosed)
            return;
        this.isClosed = true;
        if (this.isDtls) {
            this.socket.close();
        }
        else {
            this.socket.close();
        }
    }
}
exports.SocketWrapper = SocketWrapper;
