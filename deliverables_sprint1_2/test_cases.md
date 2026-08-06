# API Test Cases - Sprint 1 & 2

Below are extensive test cases for the APIs integrated and created, mapped to user stories.

## US-1: User Registration & Authentication

[ API being tested: `POST /api/auth/register` ]
- Inputs: `{"fullName": "Test User", "email": "test@smail.iitm.ac.in", "password": "pass", "department": "Core Team", "academicYear": 3}`
- Expected output: `201 Created` with a JSON object containing a `token` and `user` details.
- Actual Output: `201 Created` with `{"token": "eyJhb...", "user": {"id": 1, ...}}`
- Result: **Success**

[ API being tested: `POST /api/auth/register` (Duplicate Email) ]
- Inputs: `{"fullName": "Test User", "email": "admin@smail.iitm.ac.in", "password": "pass"}`
- Expected output: `400 Bad Request` with `{"error": "Email already exists"}`
- Actual Output: `400 Bad Request` with `{"error": "Email already exists"}`
- Result: **Success**

[ API being tested: `POST /api/auth/login` ]
- Inputs: `{"email": "admin@smail.iitm.ac.in", "password": "Admin@test"}`
- Expected output: `200 OK` with JSON `token` and `user` object.
- Actual Output: `200 OK` with `token` and `user` object.
- Result: **Success**

[ API being tested: `POST /api/auth/login` (Invalid Credentials) ]
- Inputs: `{"email": "admin@smail.iitm.ac.in", "password": "wrongpassword"}`
- Expected output: `401 Unauthorized` with `{"error": "Invalid credentials"}`
- Actual Output: `401 Unauthorized` with `{"error": "Invalid credentials"}`
- Result: **Success**

[ API being tested: `GET /api/auth/me` ]
- Inputs: Headers: `Authorization: Bearer <valid_token>`
- Expected output: `200 OK` with user details JSON.
- Actual Output: `200 OK` with user details JSON.
- Result: **Success**

## US-2: Role Management & Admin Stats

[ API being tested: `GET /api/admin/stats` ]
- Inputs: Headers: `Authorization: Bearer <admin_token>`
- Expected output: `200 OK` with `{"totalUsers": X, "totalTasks": Y, ...}`
- Actual Output: `200 OK` with `{"totalUsers": 4, "totalTasks": 0, "totalEvents": 0, "totalAnnouncements": 0}`
- Result: **Success**

[ API being tested: `GET /api/admin/stats` (Unauthorized User) ]
- Inputs: Headers: `Authorization: Bearer <volunteer_token>`
- Expected output: `403 Forbidden` with `{"error": "Access denied"}`
- Actual Output: `403 Forbidden` with `{"error": "Access denied"}`
- Result: **Success**

[ API being tested: `PUT /api/users/{id}/role` ]
- Inputs: Path: `id = 2`, Headers: `Authorization: Bearer <admin_token>`, Body: `{"role": "Core Member"}`
- Expected output: `200 OK` with `{"success": true, "changes": 1}`
- Actual Output: `200 OK` with `{"success": true, "changes": 1}`
- Result: **Success**

## Showcase of Testing Improving the API (Actual vs Expected Differed)

[ API being tested: `POST /api/auth/login` ]
- Inputs: `{"email": "admin@smail.iitm.ac.in", "password": "Admin@test"}`
- Expected output: `200 OK` with user data and valid token.
- Actual Output initially: `500 Internal Server Error` with `{"error": "Illegal arguments: string, object"}`
- Description: The initial implementation of `bcrypt.compare()` was receiving a `null` password hash for the seeded admin user, causing a crash. This test case helped identify that the seed script needed to pre-hash the password. After fixing the seed script to include a valid hash (`$2b$10...`), the test passed.
- Result: **Fixed & Success**
