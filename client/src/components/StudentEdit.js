import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error('Fetch student error', err.response?.data || err.message || err);
        setStudent(null);
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <div className="container center">Loading...</div>;
  if (!student) return <div className="container center">Student not found.</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{student.name}</h2>
        <div style={{ color:'#6b7280' }}>Branch: {student.branch || 'N/A'}</div>
        <div style={{ marginTop:8 }}>CGPA: {student.cgpa ?? 'N/A'}</div>
        <div style={{ marginTop:12 }}>
          <Link to={`/students/${id}/edit`} className="btn btn-primary" style={{ marginRight:8 }}>Edit</Link>
          <Link to="/" className="btn">Back</Link>
        </div>
      </div>
    </div>
  );
}