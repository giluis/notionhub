import { IParagraph ,IHeading,IText} from "./interface.ts";
function fn(a:number){
    return a*2;
}

function paragraph(p:IParagraph):string{
    const texts =  p.paragraph.text.map(text);
    return '\n' + texts.join("");
}

function heading(h:IHeading):string{
    return '\n' + h[h.type]
}

function text(t: IText):string{
    let result = t.plain_text;
    const {bold,italic, strikethrough,underline,code,color} = t.annotations;
    if(bold)
        result = "**" + result + "**";
    if(italic)
        result = "*" + result + "*";
    if(strikethrough)
        result = "--" + result + "--";
    if(underline)
        result = "_" + result + "_";
    if(code)
        result = "`" + result + "`";

    return result;
}
