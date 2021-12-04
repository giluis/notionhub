Hi, I am communicating with an API that responds with JSON that follows the folowing structure

```
{

    results: [

        {

            "type": "heading_1",

            "heading_1": {

                "text": "Sometext",
            }

        },


        {

            "type": "heading_2",

            "heading_2": {

                "text": "Sometext",
            }

        },

        {

            "type": "heading_3",

            "heading_3": {

                "text": "Sometext",
            }

        },

        {

            "type":"paragraph",

            "paragraph": {

                "text":"Sometext"
            }

        }

    ]
}



While typing this JSON, I wanted to have something like:

```
interface APIContents {

    results: Block[]

}


interface Block {

    .... ommitted info

}

interface Paragraph extends Block {

     .... ommitted info

}

interface Heading extends Block{

    type: "heading\_1" | "heading\_2" | "heading\_3"

    //.... my question

}
```


In the interface Heading  I want to have a property whose name is the value of the type property.

This way I could model all of the headings, with only one heading interface... Is this possible?

Example:

const h1: Heading = {

type: "heading_1",

heading_2: ....

} //this should throw an error, as the property should be named "heading\_1"


I have hunch that this is impossible to do in Typescript. If this is the case, I would be satisfied if I could just do something like this:

```

type HeadingType ="heading\_1" | "heading\_2" | "heading\_3";

interface Heading extends Block {
    type: HeadingType;
    [key in HeadintType]: {
        text: string
    }
}

```
Is this second option possible?
Thanks in advance
