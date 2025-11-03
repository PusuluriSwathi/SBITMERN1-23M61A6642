import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import StudentItem from './StudentItem';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/students');
      const list = Array.isArray(res.data) ? res.data : res.data?.students || [];
      // eslint-disable-next-line no-console
      console.debug('fetchStudents ->', list);
      // ensure only plain objects (filter out primitives/undefined)
      setStudents(list.filter((x) => x && typeof x === 'object'));
    } catch (err) {
      console.error('Fetch students error:', err.response?.data || err.message || err);
      setError('Failed to load students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((x) => (x?._id || x?.id) !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message || err);
      alert('Failed to delete student');
    }
  };

  if (loading) return <div className="container center">Loading...</div>;
  if (error) return <div className="container center" style={{ color: '#ef4444' }}>{error}</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Students</h2>
          <Link to="/add" className="btn btn-primary">Add Student</Link>
        </div>

        {students.length === 0 ? (
          <div className="center">No student data found.</div>
        ) : (
          <ul className="student-list" style={{ margin: 0, padding: 0 }}>
            {students.map((s, idx) =>
              s ? <StudentItem key={s._id || s.id || idx} student={s} onDelete={handleDelete} /> : null
            )}
          </ul>
        )}
      </div>
    </div>
  );
}