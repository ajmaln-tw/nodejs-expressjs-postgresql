const connectedUser: Map<string, any> = new Map();
let io: any = null;

export const setSocketServerInstance = (IOInstance: any) => {
    io = IOInstance
};

export const getSocketServerInstance = () => {
    return io;
};

export const addNewConnectedUser = ({ socketId, user }: { socketId: string; user: object }): void => {
    connectedUser.set(socketId, user);
};

export const removeConnectedUser = (socketId: string): void => {
    if (connectedUser.has(socketId)) {
        connectedUser.delete(socketId);
    }
};

export const getActiveConnections = (userId: any) => {
    const activeConnections: any = [];
    connectedUser.forEach((key, value: any) => {
        if (value.id !== userId) {
            activeConnections.push({ socketId: value, ...key })
        }
    })
    return activeConnections;
}