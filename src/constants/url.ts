const BACKEND_HOST: string = process.env.RAILWAY_PUBLIC_DOMAIN || '';

export const BACKEND_URL = {
    GetRoom: `${BACKEND_HOST}/room`,
    CreateRoom: `${BACKEND_HOST}/create-room`,
}