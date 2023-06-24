import _ from "lodash";
import { addNewConnectedUser, getActiveConnections } from "../serverStore";

export const newConnectionHandler = async (socket: any, io: any) => {
    const user = _.cloneDeep(socket.user)
    const userDetails = _.omit(user, ["iat", "exp"]);

    addNewConnectedUser({
        socketId: socket.id,
        user: userDetails
    })
    const activeConnections = getActiveConnections(socket.user.id);
    console.log("ajmal newSocketHandler", activeConnections)
    io.to('online_users').emit('new_user', activeConnections);
    console.log("here exit")
}