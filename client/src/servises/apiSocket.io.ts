import { io } from 'socket.io-client';

const socketURL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_DEV_BACK_WS}`
    : `${process.env.NEXT_PUBLIC_PROD_BACK_WS}`;

console.log('socketURL: ', socketURL);

export const socket = io(socketURL);
