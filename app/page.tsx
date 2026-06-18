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
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />

      <main style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>DAILY GOSPEL API</div>
          <h1 style={styles.title}>Evangelio Diario</h1>
          <p style={styles.subtitle}>
            A resilient, multi-denomination API for daily liturgical readings in Spanish.
          </p>
        </header>

        {/* Section 1: Dashboard (Interactive Client) */}
        <section style={styles.dashboard}>
          {/* Controls Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Interactive Client</h2>
            <p style={styles.cardDesc}>Test the endpoint dynamically by configuring parameters below.</p>
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

            <div style={styles.quickLinks}>
              <a href="/api/health" target="_blank" rel="noreferrer" style={styles.quickLinkBtn}>
                🔍 System Health Status
              </a>
              <a 
                href="https://github.com/Joselm1234/daily-gospel-api" 
                target="_blank" 
                rel="noreferrer" 
                style={styles.quickLinkBtn}
              >
                📦 GitHub Repository
              </a>
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
                  Configure the parameters and click "Query API" to preview the live JSON and scripture text.
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

        {/* Section 2: Detailed API Documentation */}
        <section style={styles.documentationSection}>
          <div style={{ ...styles.card, ...styles.docCard }}>
            <h2 style={styles.docSectionTitle}>📚 API Reference & Documentation</h2>
            <div style={styles.divider}></div>

            {/* Endpoints */}
            <div style={styles.docGroup}>
              <h3 style={styles.docSubheading}>Base Endpoint</h3>
              <div style={styles.endpointBox}>
                <span style={styles.methodBadge}>GET</span>
                <code style={styles.code}>/api/gospel</code>
              </div>
            </div>

            {/* Parameters Table */}
            <div style={styles.docGroup}>
              <h3 style={styles.docSubheading}>Query Parameters</h3>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Parameter</th>
                      <th style={styles.th}>Type</th>
                      <th style={styles.th}>Default</th>
                      <th style={styles.th}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.td}><strong>`date`</strong></td>
                      <td style={styles.td}>String</td>
                      <td style={styles.td}>Today's date</td>
                      <td style={styles.td}>The target date in `YYYY-MM-DD` format (e.g. `2026-06-18`).</td>
                    </tr>
                    <tr>
                      <td style={styles.td}><strong>`church`</strong></td>
                      <td style={styles.td}>String</td>
                      <td style={styles.td}>`catholic`</td>
                      <td style={styles.td}>
                        The liturgical style to resolve. Options:
                        <ul style={styles.bulletList}>
                          <li>`catholic` — Roman Catholic (using Libro del Pueblo de Dios)</li>
                          <li>`protestant` — Mainline Protestant (Reina Valera 1909)</li>
                          <li>`orthodox` — Eastern Orthodox (Reina Valera 1909)</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response Schema */}
            <div style={styles.docGroup}>
              <h3 style={styles.docSubheading}>JSON Response Format</h3>
              <p style={styles.docText}>
                Every successful request returns a `200 OK` status with the following JSON structure:
              </p>
              <pre style={styles.codeBlock}>
{`{
  "date": "2026-06-18",
  "citation": "Matthew 18:1-20",
  "passage": "[1] EN aquel tiempo se llegaron los discípulos á Jesús...",
  "source": "Lectio-API.org / Reina Valera 1909"
}`}
              </pre>
            </div>

            {/* Code Integration */}
            <div style={styles.docGroup}>
              <h3 style={styles.docSubheading}>Integration Examples</h3>
              
              <h4 style={styles.docMiniTitle}>cURL</h4>
              <pre style={styles.codeBlock}>
{`curl -X GET "https://daily-gospel-api.vercel.app/api/gospel?church=protestant&date=2026-06-18"`}
              </pre>

              <h4 style={styles.docMiniTitle}>JavaScript / Fetch</h4>
              <pre style={styles.codeBlock}>
{`fetch("https://daily-gospel-api.vercel.app/api/gospel?church=protestant")
  .then(res => res.json())
  .then(data => {
    console.log("Citation:", data.citation);
    console.log("Passage:", data.passage);
  })
  .catch(err => console.error(err));`}
              </pre>
            </div>
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
    maxWidth: '650px',
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
    fontSize: '3rem',
    fontWeight: 600,
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(to right, #ffffff, #93c5fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.05rem',
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
    alignItems: 'stretch',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  documentationSection: {
    width: '100%',
    maxWidth: '1000px',
  },
  card: {
    flex: '1 1 350px',
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
  },
  docCard: {
    padding: '2rem',
  },
  resultCard: {
    flex: '1.5 1 450px',
    minHeight: '350px',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.35rem',
    fontWeight: 600,
    margin: '0 0 0.35rem 0',
    color: '#f3f4f6',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    margin: '0 0 1.25rem 0',
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
    backgroundColor: '#0c0f1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#f3f4f6',
    padding: '0.75rem',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  input: {
    backgroundColor: '#0c0f1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#f3f4f6',
    padding: '0.75rem',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
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
  quickLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
    marginTop: '1.5rem',
  },
  quickLinkBtn: {
    display: 'block',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '8px',
    color: '#93c5fd',
    textDecoration: 'none',
    fontSize: '0.85rem',
    padding: '0.65rem',
    fontWeight: 500,
    transition: 'background-color 0.2s, color 0.2s',
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
  docSectionTitle: {
    fontSize: '1.65rem',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 1rem 0',
  },
  docGroup: {
    marginBottom: '2rem',
  },
  docSubheading: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#f3f4f6',
    margin: '0 0 0.75rem 0',
  },
  docText: {
    fontSize: '0.95rem',
    color: '#9ca3af',
    lineHeight: 1.5,
    margin: '0 0 1rem 0',
  },
  endpointBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#0c0f1a',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  methodBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontWeight: 700,
    fontSize: '0.8rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  code: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.95rem',
    color: '#60a5fa',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
    textAlign: 'left',
  },
  th: {
    borderBottom: '2px solid rgba(255, 255, 255, 0.08)',
    padding: '0.75rem',
    color: '#9ca3af',
    fontWeight: 600,
  },
  td: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '0.75rem',
    color: '#d1d5db',
    verticalAlign: 'top',
  },
  bulletList: {
    margin: '0.35rem 0 0 0',
    paddingLeft: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    color: '#9ca3af',
  },
  codeBlock: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.85rem',
    backgroundColor: '#0c0f1a',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '8px',
    padding: '1rem',
    color: '#a7f3d0',
    overflowX: 'auto',
    margin: '0 0 1.25rem 0',
    lineHeight: 1.45,
  },
  docMiniTitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 0.5rem 0',
  },
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.85rem',
  },
};
