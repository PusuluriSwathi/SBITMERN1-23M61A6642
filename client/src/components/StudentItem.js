import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentItem({ student, onDelete }) {
  // defensive guard — do not crash if student is undefined
  if (!student || typeof student !== 'object') {
    // eslint-disable-next-line no-console
    console.warn('StudentItem: invalid student prop', student);
    return null;
  }

  const id = student._id || student.id || '';

  return (
    <li className="student-item">
      <div className="student-meta">
        <div style={{ fontWeight: 700 }}>{student.name || 'No Name'}</div>
        <div style={{ color: '#6b7280' }}>{student.branch || 'N/A'} • CGPA: {student.cgpa ?? 'N/A'}</div>
      </div>

      <div className="student-actions">
        <Link to={`/students/${id}`} className="nav-link">View</Link>
        <Link to={`/students/${id}/edit`} className="nav-link">Edit</Link>
        <button className="btn btn-danger" onClick={() => onDelete && onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}