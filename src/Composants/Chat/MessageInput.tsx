
import { useState } from "react";

export default function MessageInput({ send }: { send: (value: string) => void }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, setValue] = useState<string>('');
    return (
        <>
            <input onChange={(e) => setValue(e.target.value)} placeholder="Tape ton msg" value={value} />
            <button onClick={() => send(value)} className="bg-white m-2">Send</button>
        </>
    )
}
