import React, { useState, useEffect } from "react";

interface MessageState{
    message: {
        body: string;
    }
}

interface MessageProps{
    message: string;
    timestamp: number;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const [state, setstate] = useState<MessageState>({
        message: JSON.parse(message),
    });


    return (
        <div className='Message'>
            {state.message.body}
        </div>
    )

}

export default Message;