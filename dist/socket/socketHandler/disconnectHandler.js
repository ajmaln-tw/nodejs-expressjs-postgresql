"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectHandler = void 0;
const serverStore_1 = require("../serverStore");
const disconnectHandler = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("params 1", socket.id);
    (0, serverStore_1.removeConnectedUser)(socket.id);
});
exports.disconnectHandler = disconnectHandler;
