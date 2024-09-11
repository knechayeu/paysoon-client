const BACKEND_HOST: string = process.env.BACKEND_HOST || '';

export const BACKEND_URL = {
    GetRoom: `${BACKEND_HOST}/room`,
    CreateRoom: `${BACKEND_HOST}/create-room`,
}