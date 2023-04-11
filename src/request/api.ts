import service from "./index";
import {LoginFromInt} from "../type/login";
import {PageVo} from "../type/pagevo";
export function login(data:LoginFromInt){
    return service.post("/user/login",data)
}
export function listBlogContent(data:PageVo){
    return service.post("/blog/listBlogContent",data)
}
