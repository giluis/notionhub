const METADATA_HEADER = "-#::";

export enum META_HEADER  {
     BLOCK_ID = ":%id/:",
     CREATED_TIME = ":%created_time/:",
     LAST_EDITED_TIME = ":%last_edited_time/:",
     HAS_CHILDREN = ":%has_children/:",
     ARCHIVED = ":%id/:",
     PAGE_TITLE_HEADER = ":%page_title/:",
}

export  abstract class Block {
    blockProps: BlockProps;
    constructor(blockJson: IBlock){
        this.blockProps = new BlockProps (blockJson);
    }

    toNotionMark():string{
        return `${METADATA_HEADER}${this.blockProps.id}`
    }
}

export type BlockType = 'heading_1' | 'heading_2' | 'heading_3' | "paragraph"| "to_do"| "toggle";

export function isHeading(b:IBlock):b is IHeading{
    return b.type === "heading_1" || b.type === "heading_2"  || b.type === "heading_3" ;
}

export function isParagraph(b:IBlock):b is IParagraph{
    return b.type === "paragraph";
}

export function isToDo(b:IBlock):b is IToDo{
    return b.type === "to_do";
}

export function isToggle(b:IBlock):b is IToggle{
    return b.type === "toggle";
}

export class BlockProps   {
    id: string;
    created_time: string;
    last_edited_time: string;
    has_children: boolean;
    archived: boolean;
    type: BlockType;

    constructor({  id, type, created_time, last_edited_time, has_children, archived }: IBlock){
        this.archived=archived
        this.has_children=has_children
        this.last_edited_time=last_edited_time
        this.created_time=created_time
        this.id=id
        this.type = type;
    }

}

export type ColorSelect = "blue" | "red";

export interface SingleSelect extends IPageProperty {
    type: IPagePropertyType.SINGLE_SELECT;
    select: {id:string,  name:string, color: IColor}
}

export interface ICreatedTime extends IPageProperty {
    type: IPagePropertyType.CREATED_TIME
    created_time: IDateTime;
}

//TODO
export type IDateTime = string;

export interface IPage extends IBlock{
    cover: null | string;
    icon: null | string;
    parent : {
        type: string;
        database_id: string;
    }
    properties: {
        [key:string]: IPageProperty
    };
    url: string;
}

export interface IMultiSelect extends IPageProperty {
    type: IPagePropertyType.MULTI_SELECT;
    multi_select: {id:string, name:string, color: IColor}[]
}

export enum IPagePropertyType {
    MULTI_SELECT = "multi_select",
    CREATED_TIME = "created_time",
    TITLE = "title",
    SINGLE_SELECT = "single_select",
}


/**
* We must enforce that whatever the type value is, it is also an attribute in the object;
* */
export interface IPageProperty   {
    id: string;
    type: IPagePropertyType;
}

export interface IPagePayload {
    title:string;
    results: IBlock[];
}

export interface IBlock {
    object: "block",
    id: string,
    created_time: string,
    last_edited_time: string,
    has_children: boolean;
    archived: boolean,
    type: BlockType,
}


export interface IToDo extends IBlock {
    type: "to_do";
    to_do: {
        text: IText[];
        checked: boolean;
    }

}

export interface IToggle extends IBlock {
    type: "toggle";
    toggle: {
        text: IText[];
        content: IBlock[],
    }
}

export interface IParagraph extends IBlock {
    type: "paragraph";
    paragraph: {
        text: IText[];
    }
}

// Using generics
type HeadingType = 'heading_1' | 'heading_2' | 'heading_3';

export interface  IHeading1  extends IBlock{
    type: "heading_1";
    heading_1: {
        text:IText[];
    }
}

export interface IHeading2  extends IBlock{
    type: "heading_2";
    heading_2: {
        text:IText[];
    }
}

export interface IHeading3  extends IBlock{
    type: "heading_3";
    heading_3: {
        text:IText[];
    }
}

export type IHeading = IHeading1 | IHeading2 | IHeading3;

export interface IText {
    type:"text",
    text: {
        content: string;
        link: string | null;
    },
    annotations: ITextAnnotations;
    plain_text: string;
    href:null;
}

export interface ITextAnnotations {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: IColor;
}

export type IColor = "default";

