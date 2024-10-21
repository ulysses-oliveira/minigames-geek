import { useState } from 'react'
// import Button from '../aulas/UseEffect'

function Form() {
    function cadastrarUsuario(e) {
        e.preventDefault()
        console.log(userName, password);
    }

    const [userName, setName] = useState('')
    const [password, setPassword] = useState('')

    function meuEvento() {
        console.log('Ativando primeiro evento!');
        
    }

    return (
        <div>
            <h1>Meu Cadastro</h1>
            <form onSubmit={cadastrarUsuario}>
                <div>
                    <label htmlFor='userName'>Nome:</label>
                    <input type='text' id='userName' name='userName' placeholder='Seu Nome' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Senha:</label>
                    <input type='text' id='password' name='password' placeholder='*Senha' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type='submit' value='Cadastrar' />
                </div>
            </form>

            <div>
                <p>Clique para disparar um evento:</p>
                {/* <Button event={meuEvento} text='Primeiro Evento' /> */}
            </div>
        </div>
    )
}

export default Form