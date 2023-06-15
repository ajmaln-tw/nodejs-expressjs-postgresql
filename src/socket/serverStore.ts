const connectedUser: Map<string, any> = new Map();
let io: any = null;

export const setSocketServerInstance = (IOInstance: any) => {
    io = IOInstance
};

export const getSocketServerInstance = () => {
    return io;
};

export const addNewConnectedUser = ({ socketId, userId }: { socketId: string; userId: number }): void => {
    connectedUser.set(socketId, { userId });
};

export const removeConnectedUser = (socketId: string): void => {
    if (connectedUser.has(socketId)) {
        connectedUser.delete(socketId);
    }
};

export const getActiveConnections = (userId: any) => {
    const activeConnections: any = [];
    connectedUser.forEach((key, value: any) => {
        if (value.userId === userId) {
            activeConnections.push(key)
        }
    })
    return activeConnections;
}