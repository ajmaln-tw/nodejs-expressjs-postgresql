const connectedUser: Map<string, any> = new Map();

export const addNewConnectedUser = ({ socketId, userId }: { socketId: string; userId: number }): void => {
    connectedUser.set(socketId, { userId });
};

export const removeConnectedUser = (socketId: string): void => {
    if (connectedUser.has(socketId)) {
        connectedUser.delete(socketId);
    }
};