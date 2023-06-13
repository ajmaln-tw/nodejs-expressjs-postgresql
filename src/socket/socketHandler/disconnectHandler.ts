import { removeConnectedUser } from "../serverStore";

export const disconnectHandler = async (socket: any) => {
    console.log("params 1", socket.id)
    removeConnectedUser(socket.id)
}