# Daily Gospel API (Evangelio Diario) Specification

This document provides the API specification, JSON schema, testing instructions, and client integration snippets for the Daily Gospel API.

---

## 1. API Endpoint Overview

- **Endpoint:** `/api/gospel`
- **Method:** `GET`
- **CORS Allowed:** Yes (`Access-Control-Allow-Origin: *`)
- **Caching Policy:** Edge Cache (`s-maxage=86400, stale-while-revalidate`)

### Query Parameters

| Parameter | Type   | Description | Example |
| :--- | :--- | :--- | :--- |
| `date` | String | Optional. Query date in `YYYY-MM-DD` format. Defaults to client's current date in local time. | `?date=2026-06-17` |
| `church` | String | Optional. Denomination style for readings. Options: `catholic` (default), `protestant`, `orthodox`. | `?church=protestant` |

### Data Providers by Denomination
1. **Roman Catholic (`catholic`):**
   - **Source:** Live queries to the public **Evangelizo.org API** (`feed.evangelizo.org`) in Spanish.
   - **Fallback:** Local Catholic liturgical calendar database (`lib/gospelFallback.ts`).
2. **Mainline Protestant (`protestant`):**
   - **Source:** Queries the **Lectionary API** (`lectio-api.org`) with the composite `episcopal` tradition to obtain the daily Gospel citation reference.
   - **Bible Text:** Fetches the Spanish text of that citation from the open-source **Free Use Bible API** (`bible.helloao.org`) using the **Reina Valera 1909** translation.
   - **Fallback:** Local Protestant deterministic fallback readings.
3. **Eastern Orthodox (`orthodox`):**
   - **Source:** Queries the **Orthocal API** (`orthocal.info`) using the Gregorian calendar to obtain the daily Gospel citation reference.
   - **Bible Text:** Fetches the Spanish text of that citation from **Free Use Bible API** (`bible.helloao.org`) using the **Reina Valera 1909** translation.
   - **Fallback:** Local Orthodox deterministic fallback readings.

---

## 2. JSON Response Schema

The endpoint returns a standardized JSON object with the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `date` | String | The query date formatted as `YYYY-MM-DD`. |
| `citation` | String | The biblical book, chapter, and verse references. |
| `passage` | String | The full, cleaned Gospel text in Spanish (with verse numbering for Protestant/Orthodox). |
| `source` | String | The source of the daily Gospel content and translation used. |

### Example Response (`200 OK` - Catholic)

```json
{
  "date": "2026-06-17",
  "citation": "Mateo 6,1-6.16-18",
  "passage": "Jesús dijo a sus discípulos: Tengan cuidado de no practicar su justicia delante de los hombres para ser vistos por ellos: de lo contrario, no recibirán ninguna recompensa del Padre que está en el cielo...",
  "source": "Evangelizo.org (Libro del Pueblo de Dios)"
}
```

### Example Response (`200 OK` - Protestant)

```json
{
  "date": "2026-06-18",
  "citation": "Matthew 18:1-20",
  "passage": "[1] En aquel tiempo los discípulos se llegaron á Jesús, diciendo: ¿Quién es el mayor en el reino de los cielos? [2] Y Jesús llamando á un niño, le puso en medio de ellos...",
  "source": "Lectio-API.org / Reina Valera 1909"
}
```

### Example Error Response (`500 Internal Server Error`)

```json
{
  "error": "Internal Server Error",
  "message": "Error details..."
}
```

---

## 3. Manual Testing Instructions (cURL)

To manually verify the API, execute the following `curl` commands in your terminal:

### Test Catholic (Default)
```bash
curl -i -X GET "http://localhost:3000/api/gospel"
```

### Test Protestant (e.g., June 18, 2026)
```bash
curl -i -X GET "http://localhost:3000/api/gospel?date=2026-06-18&church=protestant"
```

### Test Orthodox (e.g., June 18, 2026)
```bash
curl -i -X GET "http://localhost:3000/api/gospel?date=2026-06-18&church=orthodox"
```

### Test CORS Preflight Request
```bash
curl -i -X OPTIONS "http://localhost:3000/api/gospel" \
  -H "Access-Control-Request-Method: GET" \
  -H "Origin: http://localhost:8080"
```
*Verify that the response returns HTTP status `204` and headers `Access-Control-Allow-Origin: *`.*

---

## 4. Client Integration Snippets

### Flutter (Dart)

Using the `http` package:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class GospelReading {
  final String date;
  final String citation;
  final String passage;
  final String source;

  GospelReading({
    required this.date,
    required this.citation,
    required this.passage,
    required this.source,
  });

  factory GospelReading.fromJson(Map<String, dynamic> json) {
    return GospelReading(
      date: json['date'] as String,
      citation: json['citation'] as String,
      passage: json['passage'] as String,
      source: json['source'] as String,
    );
  }
}

Future<GospelReading?> fetchDailyGospel(String baseUrl, {String? date}) async {
  final uri = Uri.parse('$baseUrl/api/gospel' + (date != null ? '?date=$date' : ''));
  try {
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final decodedData = jsonDecode(utf8.decode(response.bodyBytes));
      return GospelReading.fromJson(decodedData);
    } else {
      print('Failed to load gospel. Status code: ${response.statusCode}');
      return null;
    }
  } catch (e) {
    print('Error fetching daily gospel: $e');
    return null;
  }
}
```

### React Native / JavaScript

Using native `fetch`:

```javascript
/**
 * Fetches the daily Gospel in Spanish from the API.
 * @param {string} baseUrl The API base URL.
 * @param {string} [date] Optional date in YYYY-MM-DD format.
 * @returns {Promise<object>} JSON response containing the daily Gospel.
 */
async function fetchDailyGospel(baseUrl, date = null) {
  const url = `${baseUrl}/api/gospel` + (date ? `?date=${date}` : '');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      date: data.date,
      citation: data.citation,
      passage: data.passage,
      source: data.source
    };
  } catch (error) {
    console.error('Error fetching daily gospel:', error);
    throw error;
  }
}
```
