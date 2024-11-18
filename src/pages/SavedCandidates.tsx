import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import './SavedCandidates.css'; 

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleReject = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <h2>No potential candidates have been saved.</h2>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.name || candidate.login}/>
              </td>
              <td>{candidate.name || candidate.login}</td>
              <td>{candidate.location || 'Unknown'}</td>
              <td>
                {candidate.email ? (
                  <a href={`mailto:${candidate.email}`} >
                    {candidate.email}
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{candidate.company || 'N/A'}</td>
              <td>
                <button onClick={() => handleReject(index)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
