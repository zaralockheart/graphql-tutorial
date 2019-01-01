import { getConnection } from "typeorm";

export const getConnectionManagerInstance = () => getConnection().manager
