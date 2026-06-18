'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [date, setDate] = useState('');
  const [church, setChurch] = useState('catholic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Set default date to today in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const fetchGospel = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/gospel?date=${date}&church=${church}`);
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Failed to fetch the Gospel.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while making the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      <main style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>DAILY GOSPEL API</div>
          <h1 style={styles.title}>Evangelio Diario</h1>
          <p style={styles.subtitle}>
            A resilient, multi-denomination API for daily liturgical readings in Spanish.
          </p>
        </header>

        <section style={styles.dashboard}>
          {/* Controls Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Configure Request</h2>
            <form onSubmit={fetchGospel} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Denomination (Church)</label>
                <select 
                  value={church} 
                  onChange={(e) => setChurch(e.target.value)} 
                  style={styles.select}
                >
                  <option value="catholic">Roman Catholic (Libro del Pueblo de Dios)</option>
                  <option value="protestant">Mainline Protestant (Reina Valera 1909)</option>
                  <option value="orthodox">Eastern Orthodox (Reina Valera 1909)</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  style={styles.input} 
                  required
                />
              </div>

              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Fetching...' : 'Query API'}
              </button>
            </form>

            <div style={styles.linksContainer}>
              <h3 style={styles.smallHeading}>Useful Links</h3>
              <ul style={styles.linksList}>
                <li>
                  <a href="/api/health" target="_blank" rel="noreferrer" style={styles.link}>
                    🔍 System Health Status (`/api/health`)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/Joselm1234/daily-gospel-api" 
                    target="_blank" 
                    rel="noreferrer" 
                    style={styles.link}
                  >
                    📦 GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Results Display */}
          <div style={{ ...styles.card, ...styles.resultCard }}>
            {loading && (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Fetching daily readings...</p>
              </div>
            )}

            {!loading && !result && !error && (
              <div style={styles.placeholderContainer}>
                <span style={styles.placeholderIcon}>📖</span>
                <p style={styles.placeholderText}>
                  Select a church and date, then query the API to preview the response here.
                </p>
              </div>
            )}

            {error && (
              <div style={styles.errorContainer}>
                <span style={styles.errorIcon}>⚠️</span>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            {result && (
              <div style={styles.gospelContent}>
                <div style={styles.gospelMeta}>
                  <span style={styles.gospelDate}>{result.date}</span>
                  <span style={styles.gospelSource}>{result.source}</span>
                </div>
                <h3 style={styles.gospelCitation}>{result.citation}</h3>
                <div style={styles.divider}></div>
                <div style={styles.gospelPassage}>
                  {result.passage.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} style={styles.gospelParagraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <footer style={styles.footer}>
          <p>© 2026 Daily Gospel API. Ready for production integrations.</p>
        </footer>
      </main>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0d16',
    backgroundImage: 'radial-gradient(circle at top right, rgba(29, 78, 216, 0.15), transparent 45%), radial-gradient(circle at bottom left, rgba(88, 28, 135, 0.15), transparent 45%)',
    color: '#f3f4f6',
    fontFamily: '"Outfit", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1.5rem',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    maxWidth: '600px',
  },
  badge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    color: '#60a5fa',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    padding: '0.35rem 0.75rem',
    borderRadius: '9999px',
    marginBottom: '0.75rem',
    border: '1px solid rgba(96, 165, 250, 0.2)',
  },
  title: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '2.75rem',
    fontWeight: 600,
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(to right, #ffffff, #93c5fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#9ca3af',
    lineHeight: 1.5,
    margin: 0,
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '1000px',
    flex: 1,
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1 1 350px',
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
  },
  resultCard: {
    flex: '1.5 1 450px',
    minHeight: '350px',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '0 0 1.25rem 0',
    color: '#f3f4f6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#9ca3af',
  },
  select: {
    backgroundColor: '#111827',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#f3f4f6',
    padding: '0.75rem',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  input: {
    backgroundColor: '#111827',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#f3f4f6',
    padding: '0.75rem',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    marginTop: '0.5rem',
  },
  linksContainer: {
    marginTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '1.25rem',
  },
  smallHeading: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 0.75rem 0',
  },
  linksList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: '0.95rem',
    margin: 0,
  },
  placeholderContainer: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '2rem',
  },
  placeholderIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '1rem',
  },
  placeholderText: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
    margin: 0,
  },
  errorContainer: {
    textAlign: 'center',
    color: '#ef4444',
    padding: '1.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(239, 68, 68, 0.15)',
  },
  errorIcon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.5rem',
  },
  errorText: {
    fontSize: '0.95rem',
    margin: 0,
  },
  gospelContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  gospelMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#9ca3af',
    marginBottom: '0.5rem',
  },
  gospelDate: {
    color: '#60a5fa',
  },
  gospelSource: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
  },
  gospelCitation: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#f3f4f6',
    margin: '0 0 1rem 0',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: '1.25rem',
  },
  gospelPassage: {
    overflowY: 'auto',
    maxHeight: '380px',
    paddingRight: '0.5rem',
  },
  gospelParagraph: {
    fontSize: '1.05rem',
    lineHeight: 1.65,
    color: '#d1d5db',
    margin: '0 0 1rem 0',
    textAlign: 'justify',
  },
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.85rem',
  },
};
