import { addNewConnectedUser } from "../serverStore";

export const newConnectionHandler = async (socket: any, io: any) => {
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.id
    })

}