import pytest
import requests

BASE_URL = "http://localhost:3000/api/auth"

def test_register():
    payload = {
        "fullName": "Test User",
        "email": "test@smail.iitm.ac.in",
        "password": "testpassword",
        "department": "Core Team",
        "academicYear": 3
    }
    response = requests.post(f"{BASE_URL}/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == "test@smail.iitm.ac.in"
    return data["token"]

def test_login():
    payload = {
        "email": "test@smail.iitm.ac.in",
        "password": "testpassword"
    }
    response = requests.post(f"{BASE_URL}/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "token" in data

def test_me():
    token = test_register()
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@smail.iitm.ac.in"
