import illustrationImg from '../assets/images/illustration.svg'
import logo_lightImg from '../assets/images/logo_light.svg'
import logoGoogle from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home() {
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
            <button className="create-room">
                <img src={logoGoogle} alt='Logo Google'/>
                Crie sua sala com o Google
            </button> 
            <div className='separator'>
                ou entre em uma sala! 
            </div>
            <form>
                <input 
                    type="text"
                    placeholder="Digite o código da sala"
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