import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Login() {
  const [form, setForm] = useState({ uname: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      if (res.data?.token) localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login error', err.response?.data || err.message || err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth:480, margin:'0 auto' }}>
        <h3>Login</h3>
        <form className="form" onSubmit={onSubmit}>
          <label>Username<input name="uname" value={form.uname} onChange={onChange} required /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={onChange} required /></label>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary" type="submit">Login</button>
            <button className="btn" type="button" onClick={() => navigate('/register')}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}