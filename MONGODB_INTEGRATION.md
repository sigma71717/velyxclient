# MongoDB Integration Guide

## Co już zostało zrobione:

1. **Struktura MongoDB** - dodano schematy w `src/App.jsx`:
   - `MongoLicense` - licencje użytkowników
   - `MongoChangelog` - dziennik zmian
   - `MongoUser` - dane użytkowników

2. **Plik bazy danych** - `src/db.js`:
   - Połączenie z MongoDB
   - Funkcje CRUD dla licencji, changelog, użytkowników
   - Zarządzanie ustawieniami

3. **Backend API** - `server.js`:
   - Express.js server
   - Endpointy API dla wszystkich operacji
   - Prosta autentykacja (token)

## Jak uruchomić MongoDB:

### Krok 1: Zainstaluj zależności
```bash
npm install mongodb express cors
```

### Krok 2: Uruchom MongoDB
```bash
# Jeśli masz MongoDB zainstalowane lokalnie:
mongod

# Lub użyj Docker:
docker run -d -p 27017:27017 --name mongodb mongo
```

### Krok 3: Uruchom backend API
```bash
node server.js
```

### Krok 4: Zaktualizuj frontend
Zamień funkcje localStorage na wywołania API, np.:
```javascript
// Zamiast:
const licenses = loadLicenses();

// Użyj:
const response = await fetch('/api/licenses');
const licenses = await response.json();
```

## Struktura bazy danych:

### Licencje (licenses collection)
```javascript
{
  username: "kacper111",
  active: true,
  grantedBy: "admin",
  plan: "30d", // "30d", "180d", "lifetime"
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date
}
```

### Dziennik zmian (changelog collection)
```javascript
{
  title: "Patch 4.1.3",
  description: "Poprawiono wydajność...",
  dateLabel: "28 MAR",
  createdAt: Date,
  author: "admin"
}
```

### Użytkownicy (users collection)
```javascript
{
  username: "kacper111",
  email: "kacper111@velyx.client",
  role: "user", // "user", "admin"
  createdAt: Date,
  lastLogin: Date
}
```

## Endpointy API:

### Licencje
- `GET /api/licenses` - pobierz wszystkie licencje
- `POST /api/licenses` - utwórz licencję (admin)
- `PUT /api/licenses/:username` - aktualizuj licencję (admin)
- `DELETE /api/licenses/:username` - usuń licencję (admin)

### Dziennik zmian
- `GET /api/changelog` - pobierz wpisy
- `POST /api/changelog` - dodaj wpis (admin)
- `DELETE /api/changelog` - wyczyść wszystko (admin)

### Użytkownicy
- `POST /api/users/login` - login/rejestracja
- `GET /api/users/:username` - dane użytkownika

### Ustawienia
- `GET /api/settings/launcher-url` - URL launchera
- `PUT /api/settings/launcher-url` - zapisz URL (admin)

## Migracja danych:

Aby przenieść istniejące dane z localStorage do MongoDB:

1. Eksportuj dane z panelu admina (przycisk "Eksportuj bazę")
2. Importuj je w MongoDB przez API lub bezpośrednio

## Bezpieczeństwo:

W produkcji dodaj:
- JWT tokeny zamiast prostego tokena
- Rate limiting
- Walidacja danych wejściowych
- HTTPS
- Zmienne środowiskowe dla connection string

## Testowanie:

API działa na `http://localhost:3001`, frontend na `http://localhost:5173`.

Sprawdź health check: `http://localhost:3001/api/health`
