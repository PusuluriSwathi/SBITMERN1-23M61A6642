import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';


export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', branch: '', cgpa: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        const s = res.data;
        setForm({ name: s.name || '', branch: s.branch || '', cgpa: s.cgpa ?? '' });
      } catch (err) {
        console.error('Load student error', err.response?.data || err.message || err);
        alert('Failed to load student');
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/students/${id}`, { ...form, cgpa: Number(form.cgpa) });
      navigate(`/students/${id}`);
    } catch (err) {
      console.error('Update error', err.response?.data || err.message || err);
      alert('Failed to update student');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="container center">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop:0 }}>Edit Student</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>Name<input name="name" value={form.name} onChange={onChange} required /></label>
          <label>Branch<input name="branch" value={form.branch} onChange={onChange} required /></label>
          <label>CGPA<input name="cgpa" type="number" step="0.01" value={form.cgpa} onChange={onChange} required /></label>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button className="btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}