import pytest
import requests
import string
import random

BASE_URL = "http://localhost:3000"

def random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def test_health():
    res = requests.get(f"{BASE_URL}/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_register_and_login():
    # Register new user
    email = f"test_{random_string()}@smail.iitm.ac.in"
    password = "password123"
    payload = {
        "fullName": "Pytest User",
        "email": email,
        "password": password,
        "department": "Software & AI",
        "academicYear": 2
    }
    res = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert "token" in data
    assert data["user"]["email"] == email
    
    # Attempt duplicate registration
    res_duplicate = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
    assert res_duplicate.status_code == 400
    assert "Email already exists" in res_duplicate.json()["error"]

    # Login
    login_payload = {
        "email": email,
        "password": password
    }
    res_login = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
    assert res_login.status_code == 200
    login_data = res_login.json()
    assert "token" in login_data

def test_admin_stats_unauthorized():
    # First register a volunteer
    email = f"volunteer_{random_string()}@smail.iitm.ac.in"
    payload = {
        "fullName": "Volunteer",
        "email": email,
        "password": "pass"
    }
    res = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
    token = res.json()["token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    res_stats = requests.get(f"{BASE_URL}/api/admin/stats", headers=headers)
    
    # A standard volunteer shouldn't have access to admin stats
    assert res_stats.status_code == 403
    assert "Access denied" in res_stats.json()["error"]

def test_admin_stats_authorized():
    # Login as admin
    login_payload = {
        "email": "admin@smail.iitm.ac.in",
        "password": "Admin@test"
    }
    res_login = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
    
    # If the database is properly seeded, this should work
    if res_login.status_code == 200:
        token = res_login.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}
        res_stats = requests.get(f"{BASE_URL}/api/admin/stats", headers=headers)
        
        assert res_stats.status_code == 200
        stats = res_stats.json()
        assert "totalUsers" in stats
        assert "totalTasks" in stats
    else:
        pytest.skip("Admin user not seeded properly for this test")
