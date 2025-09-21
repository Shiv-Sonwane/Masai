import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Form.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Login</h2>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Login</button>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </form>
    );
}