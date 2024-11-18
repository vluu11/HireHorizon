import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const basicCandidates = await searchGithub();
      if (basicCandidates.length > 0) {
        fetchCandidateDetails(basicCandidates[0].login); 
        setCandidates(basicCandidates);
      }
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  const fetchCandidateDetails = async (username: string) => {
    const detailedCandidate = await searchGithubUser(username);
    setCurrentCandidate(detailedCandidate);
  };

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    handleNext();
  };

  const handleNext = () => {
    if (candidates.length > 0) {
      const nextCandidates = candidates.slice(1); 
      setCandidates(nextCandidates);
      if (nextCandidates.length > 0) {
        fetchCandidateDetails(nextCandidates[0].login); 
      } else {
        setCurrentCandidate(null);
      }
    } else {
      alert('No more candidates to review.');
    }
  };

  if (loading) {
    return <h2>Loading candidates...</h2>;
  }

  if (!currentCandidate) {
    return <h2>No more candidates to review.</h2>;
  }

  return (
    <main>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          className="candidate-image"
          src={currentCandidate.avatar_url}
          alt={currentCandidate.name || currentCandidate.login}
        />
        <div>
          <h2>
            {currentCandidate.name || currentCandidate.login}{' '}
            <span className="username">({currentCandidate.login})</span>
          </h2>
          <p>Location: {currentCandidate.location || 'Unknown'}</p>
          <p>
            Email:{' '}
            {currentCandidate.email ? (
              <a href={`mailto:${currentCandidate.email}`} className="email">
                {currentCandidate.email}
              </a>
            ) : (
              'N/A'
            )}
          </p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <p>Bio: {currentCandidate.bio || 'N/A'}</p>
        </div>
        <div className="actions">
          <button className="reject" onClick={handleNext}>-</button>
          <button className="accept" onClick={handleAccept}>+</button>
        </div>
      </div>
    </main>
  );
};

export default CandidateSearch;
