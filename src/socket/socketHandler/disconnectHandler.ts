import { getActiveConnections, removeConnectedUser } from "../serverStore";

export const disconnectHandler = async (socket: any, io: any) => {
    console.log("disconnectHandler", socket.id)
    removeConnectedUser(socket.id)


    const activeConnections = getActiveConnections(socket.user.id);
    io.to('online_users').emit('new_user', activeConnections);
}