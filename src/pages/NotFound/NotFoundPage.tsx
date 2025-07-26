import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>404 — Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for does not exist.</p>
      <Link to="/">Go back to homepage</Link>
    </div>
  );
}
