const BACKEND_HOST: string = `https://${process.env.BACKEND_HOST}` || '';

export const BACKEND_URL = {
    GetRoom: `${BACKEND_HOST}/room`,
    CreateRoom: `${BACKEND_HOST}/create-room`,
    GetAllRooms: `${BACKEND_HOST}/rooms`,
    CreateUser: `${BACKEND_HOST}/create-user`,
}