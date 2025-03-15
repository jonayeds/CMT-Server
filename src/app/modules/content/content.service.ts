import { IContent } from "./content.interface";
import { Content } from "./content.model";


const createContent = async(payload:IContent)=>{
    const result = await Content.create(payload)
    return result
}

export const ContentService = {
    createContent,
}