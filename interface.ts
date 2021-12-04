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

export type BlockType = "heading_1"| "heading_2"| "heading_3"| "paragraph"| "to_do"| "toggle";

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
    id:string;
    name:string;
    color: ColorSelect;

}

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
    multi_select?: string [];
    created_time?: string;
    title?:string;
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
type HeadingTpye = 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph';



type Heading<T extends HeadingTpye> = {
    type: T;
} & {
    [K in T]: {
        text: string;
    };
};

const heading:Heading<"heading_1"> = {
    type: "heading_1",
    heading_1: {
        text: "sdlfkjl"
    }
}


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
    color: ITextColor;
}

export type ITextColor = "default";

