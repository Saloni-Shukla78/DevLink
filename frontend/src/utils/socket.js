import io from "socket.io-client";
import { Base_url } from "./constants";

export const createSocketConnection=()=>{
    return io(Base_url);
}