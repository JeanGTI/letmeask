import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logo_lightImg from '../assets/images/logo_light.svg'
import logoGoogle from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

async function handleCreateRoom()  {
    if (!user) {
        await signInWithGoogle()
    }

    navigate('/rooms/new');

    };

async function HandleJoinRoom( event : FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') {
        return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
        alert('Room does not exists.');
        return;
    }

    if (roomRef.val().endedAt) {
        alert('Room already closed')
        return;
    }

    navigate(`rooms/${roomCode}`);

}

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo_lightImg} alt='Letmeask'/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={logoGoogle} alt='Logo Google'/>
                        Crie sua sala com o Google
                    </button> 
                    <div className='separator'>
                        ou entre em uma sala! 
                    </div>
                    <form onSubmit={HandleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}