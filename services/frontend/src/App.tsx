import React, { useState } from 'react';
import Header from './components/Header/Header';
import { ChatRoom } from './components/ChatRoom/ChatRoom';

interface AppState {
    page: string
}

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        page: "Home",
    });

    const [showChatRoom, setShowChatRoom] = useState(false);
    
    const handleClick = () => {
        setShowChatRoom(true);
    }

    return(
        <div className='App'>
            <Header header={appState.page}></Header>
            <button onClick={handleClick}>
                Go to chat room!
            </button>
            {showChatRoom && <ChatRoom></ChatRoom>}
        </div>
    );
}   

export default App;