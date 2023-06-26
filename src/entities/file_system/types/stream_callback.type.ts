type streamsCallback = (chunc: Buffer) => void; 
type streamsCallbackErr = (err: Error) => void; 
type streamsCallbackEnd = () => void;

type streamsCallbackPack = { 
    cb: streamsCallback,
    cbEnd: streamsCallbackEnd,
    cbErr: streamsCallbackErr 
};

export { 
    streamsCallbackPack,
    streamsCallback,
    streamsCallbackErr,
    streamsCallbackEnd
};