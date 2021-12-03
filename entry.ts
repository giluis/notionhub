
export const API_KEY = 'secret_6DrmOAjVAEzEti9FBCO4EbfER4LxSh1ZEXgqfTw8EOa';
export const BASE_URL ="https://api.notion.com/v1";
export const BASE_HEADERS = {
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version':'2021-08-16',
        }
import { IBlock,IToggle, IPagePayload }  from "./interface.ts";

export async function getDatabase(databaseId:string):Promise<any>{
    return fetch(`${ BASE_URL }/databases/${databaseId}/query`,{
        method: 'post',
        headers: new Headers({
            ...BASE_HEADERS
        }),
    })
    .then(payload=> payload.json())
}

export async function getPage(pageId:string){
    const info = await getPageInfo(pageId);
}

export async function getPageInfo(pageId: string):Promise<IPage>{
    return fetch(`${ BASE_URL }/pages/${pageId}/`,{
        method: 'get',
        headers: new Headers({
            ...BASE_HEADERS
        }),
    })
    .then(payload=> payload.json())
    .then(r=>r.properties.Name.title.text.content);
}

export async function getPageContent(pageId:string):Promise<IPagePayload>{
    return fetch(`${ BASE_URL }/blocks/${pageId}/children`,{
        method: 'get',
        headers: new Headers({
            ...BASE_HEADERS
        }),
    })
    .then(payload=> payload.json())
    .then(completeAllToggles)
    .then(completePageTitle)
}

export async function completeAllToggles(json: IPagePayload):Promise<IPagePayload>{
    const toggles =  await Promise.all(json.results.map(completeToggle))
    for (const t of toggles){
        let i = json.results.findIndex(o=>o.id === t.id)
        json.results[i] = t;
    }
    return json;
}

export async function completeToggle(json: IBlock,index:number, arr: IBlock[]):Promise<IBlock>{
    if(json?.type === "toggle"){
        const asToggle = json  as IToggle;
        const content = (await getPageContent(asToggle.id)).results;
        asToggle.toggle.content = content;
        return asToggle;
    } else {
        return json;
    }
}

function InconsistentAPIError(msg:string){
    return new Error (msg);
}

