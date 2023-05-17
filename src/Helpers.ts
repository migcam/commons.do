import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export function GetAxiosCookieJarWrapper(){
    let jar = new CookieJar();
    return wrapper(axios.create({ jar }));
}