import vs from "./deps.ts";

export function validateJSON(json:JSON){
    const schema = {
        id: vs.number({
            minValue: 1,
        })
    }
    return vs.applySchemaObject(schema,json);
}

