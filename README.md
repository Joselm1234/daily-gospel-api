# Daily Gospel API (Evangelio Diario)

A resilient, high-performance API that provides the daily Gospel readings in Spanish, supporting multiple Christian denominations: Roman Catholic, mainline Protestant (Revised Common Lectionary), and Eastern Orthodox.

The API dynamically resolves the liturgical coordinates for the given date, fetches the corresponding scripture readings from external providers, cleans the HTML markup, maps and retrieves Spanish translations, and falls back to a deterministic local database if external services fail or time out.

## Features

- **Multi-Denomination Support:** Retrieve liturgical readings for:
  - **Roman Catholic (`catholic`):** Fetched from the Evangelizo API (using the *Libro del Pueblo de Dios* translation).
  - **Protestant (`protestant`):** Resolves the Revised Common Lectionary (RCL) daily reading via Lectio API, and pulls Spanish scripture text from the open-source Free Use Bible API using the *Reina Valera 1909* translation.
  - **Eastern Orthodox (`orthodox`):** Resolves the OCA liturgical gospel reference via Orthocal API (Gregorian calendar), and pulls Spanish scripture text from Free Use Bible API using the *Reina Valera 1909* translation.
- **Fast and Resilient:** Built-in 3-second request timeouts and a local scripture fallback database ensure the service never goes down.
- **Production-Ready Caching:** Includes Edge-level caching HTTP headers (`s-maxage=86400, stale-while-revalidate`) to prevent rate-limiting from external APIs.
- **CORS Enabled:** Fully open CORS configurations to support direct integration in mobile apps (Flutter, React Native) and web frontends.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:Joselm1234/daily-gospel-api.git
   cd daily-gospel-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To start the Next.js development server:
```bash
pnpm dev
```
The server will run on `http://localhost:3000`.

---

## Production Deployment (Vercel)

This project is built with Next.js and is fully optimized for **Vercel**:

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project** and select this repository (`daily-gospel-api`).
3. Vercel will automatically detect Next.js and configure the build settings.
4. Click **Deploy**.

Once deployed, your API will be available at your custom Vercel domain, for example:
`https://daily-gospel-api.vercel.app`

---

## API Usage

### Endpoints

- **Development:** `http://localhost:3000/api/gospel`
- **Production (Vercel):** `https://your-project-name.vercel.app/api/gospel`

### Query Parameters

| Parameter | Type | Description | Default | Example |
| :--- | :--- | :--- | :--- | :--- |
| `church` | `string` | The denomination. Options: `catholic`, `protestant`, `orthodox`. | `catholic` | `?church=protestant` |
| `date` | `string` | Query date in `YYYY-MM-DD` format. | Client local date | `?date=2026-06-18` |

### Example Production Request

```bash
curl -s "https://your-project-name.vercel.app/api/gospel?date=2026-06-18&church=protestant"
```

### Example Response (`200 OK`)

```json
{
  "date": "2026-06-18",
  "citation": "Matthew 18:1-20",
  "passage": "[1] EN aquel tiempo se llegaron los discípulos á Jesús, diciendo: ¿Quién es el mayor en el reino de los cielos? [2] Y llamando Jesús á un niño, le puso en medio de ellos...",
  "source": "Lectio-API.org / Reina Valera 1909"
}
```

For more detailed JSON schemas, preflight CORS checks, and integration examples, see [documents/api_spec.md](documents/api_spec.md).

---

## License

This project is open-source. External lectionary and scripture APIs are subject to their respective terms and licenses.
