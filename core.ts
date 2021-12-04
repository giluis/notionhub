import { IBlock ,isHeading,isParagraph,IParagraph ,IHeading,IText} from "./interface.ts";

function render(b:IBlock, indentLevel: number):string{
    return heading(b) || paragraph(b) || "";
}

function fn(a:number){
    return a*2;
}


function paragraph(p:IBlock):string | undefined{
    if(!isParagraph(p))
        return;
    const texts =  p.paragraph.text.map(text);
    return '\n' + texts.join("");
}

//type inference not working correctly (h[h.type] cannot be undefined after if statement)
function heading(h:IBlock):string | undefined{
    if(!isHeading(h))
        return;
    const numHashes = Number( h.type.charAt(h.type.length -1) )
    //if(h[h.type])
        return '\n' + "#".repeat(numHashes) + h[h.type]?.text.map(text);
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
