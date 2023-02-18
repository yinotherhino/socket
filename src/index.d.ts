import { Socket } from 'socket.io';

declare module 'socket.io' {
  export interface Socket {
    userid: string | number;
    // add any other custom properties you need
  }
}