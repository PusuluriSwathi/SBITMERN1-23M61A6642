import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function StudentForm() {
  const [form, setForm] = useState({ name: '', branch: '', cgpa: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/students', { name: form.name, branch: form.branch, cgpa: Number(form.cgpa) });
      navigate('/');
    } catch (err) {
      console.error('Add student error', err.response?.data || err.message || err);
      alert('Failed to add student: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Add Student</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Branch
            <input name="branch" value={form.branch} onChange={onChange} required />
          </label>
          <label>
            CGPA
            <input name="cgpa" type="number" step="0.01" value={form.cgpa} onChange={onChange} required />
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="btn" type="button" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}