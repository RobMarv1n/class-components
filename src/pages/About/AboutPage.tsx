import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '1rem',
      }}
    >
      <h1>About This App</h1>
      <p>
        This is a demo Single Page Application displaying characters (e.g. from
        the Rick and Morty API).
      </p>
      <Link to="/">Go back to homepage</Link>
      <Link to={'https://rs.school'} target="_blank">
        <img src="/logo-rs.svg" alt="RS School Logo" width={120} height={62} />
      </Link>
    </div>
  );
}
