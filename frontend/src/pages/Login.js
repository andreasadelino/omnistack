import React, { useState, useEffect } from 'react'
import logo from "../assets/logo.svg"
import "./Login.css"
import api from '../services/api';

export default function Login({ history }) {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post(`/devs`, { username });
            const { _id } = response.data;
            history.push(`/dev/${_id}`);
        } catch (error) {
            console.log(error);
            setMessage("Usuário não encontrado!");
        }
    }

    // useEffect(() => {
    //     setMessage("teste")
    //     return () => {

    //     };
    // }, [message])

    function updateMessage() { setMessage("teste") };

    return (

        <div className="login-container">
            {message && <div className="messages">
                <span>
                    {message}
                </span>
            </div>
            }
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    type="text"
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
