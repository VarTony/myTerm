import { Response } from "express"


const cbStream = (res: Response) => (chunk: Buffer) => {
    res.write({ result: chunk.toString() });
}

const cbStreamEnd = (res: Response) => () => {
    res.send({ result: '<End>' });
};

const cbStreamError = (res: Response) => (err: Error) => { 
    console.warn(err) 
};

export { cbStream, cbStreamEnd, cbStreamError };