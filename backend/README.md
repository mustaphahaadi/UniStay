# UniStay Backend

This is the backend service for UniStay built with Django and Django REST Framework.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The server will start at http://localhost:8000

## API Documentation

API documentation will be available at:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/

## Project Structure

- `unistay/` - Main project directory
  - `api/` - API endpoints
  - `users/` - User management
  - `properties/` - Property management
  - `bookings/` - Booking management 