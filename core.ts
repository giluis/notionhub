import { IBlock ,isHeading,IPage,isParagraph,isToggle, IParagraph ,IHeading,IText} from "./interface.ts";

const BLOCK_HEADER = "#&b^"
const tab = '\t';
const BLOCK_FOOTER = "#&b$"
const BLOCK_PROP_KEY_VALUE_CONNECTOR = ":="


type BlockID = string;
/**
 * Blocks will be just normal markdown, no issues.
 * the id will be shown above the block, in a markdown comment:
 *
 ```markdown
  (empty line)
   [<local_id>]: #
    [x]- Do this

 ```
* a local_id is just parentId___id

*
*/
function render(b:IBlock, parent_id: BlockID):string{
    let result = '\n' + `[${ local_id(b,parent_id) }]: #`;
    result +=  heading(b) || paragraph(b) || "";
    return result;
}

function local_id(b:IBlock, parent_id: BlockID): `${BlockID}___${BlockID}`{
    return `${b.id}___${parent_id}`
}


function toggle(t:IBlock):string | undefined{
    if(!isToggle(t))
        return;
    const texts = t.toggle.text
    return '\n' + texts.join("");
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
    const textContent =  h.type === "heading_1"
                            ? h.heading_1.text
                            : h.type === "heading_2"
                                ? h.heading_2.text: h.heading_3.text;
    const numHashes = Number( h.type.slice(h.type.length -1) )
    return '\n' + "#".repeat(numHashes) + textContent.map(text);
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

