import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function Room() {

const { user } = useAuth();
const params = useParams<RoomParams>();
const roomId = params.id;
const [newQuestion, setNewQuestion] = useState('');

async function handleSendQuestion ( event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '')  {
        return;
    }

    if (!user) {
        throw new Error("You must be logged in");
    }
    
    const question = {
        content: newQuestion,
        author: {
            name:user.name,
            avatar: user.avatar
        },
        isHighlighted: false,
        isAnswer: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
}


        return (
            <div id="page-room">
                <header>
                    <div className="content">
                        <img src={logoImg} alt='Letmeask'/>
                        <RoomCode code={roomId} />
                    </div>
                </header>

                <main>
                    <div className='room-title'>
                        <h1>Sala React</h1>
                        <span>4 Perguntas</span>
                    </div>

                    <form onSubmit={handleSendQuestion}>
                        <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                        />

                        <div className="form-footer">
                            { user ? (
                                <div className='user-info'>
                                    <img src={user.avatar as any} alt={user.name as any}/>
                                    <span>{user.name}</span>
                                </div>
                            ) : (
                                <span>Para enviar uma pergunta, <Button type='submit'>faça seu login</Button></span>
                            )}
                            <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                        </div>
                    </form>

                </main>
            </div>
    );
}