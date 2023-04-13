export interface BlogsInt{
    cid:number,
    authorId:number,
    allowComment:string,
    commentsNum:number,
    created:string,
    modified:string,
    status:string,
    text:string,
    title:string,
    url:string,
    views:number
}
export interface PageVoInt{
    pageNumber:number,
    size:number,
    param:string,
    enableLike:boolean,
    count:number
}
export interface SelectDataInt{
    title:string
}
export class InitData{
    list:BlogsInt[]=[]
    query:SelectDataInt={
        title:""
    }
    pageVo:PageVoInt={
        pageNumber:1,
        size:3,
        count:0,
        param:localStorage.getItem("uid") as string|"0",
        enableLike:true
    }
}