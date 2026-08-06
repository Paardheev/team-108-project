import pytest
import requests

BASE_URL = "http://localhost:3000/api"

def test_get_announcements():
    """
    [ API being tested: GET /api/announcements
      Inputs: None
      Expected output: 200 OK, list of announcements
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    response = requests.get(f"{BASE_URL}/announcements")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_announcement_success():
    """
    [ API being tested: POST /api/announcements
      Inputs: title="Test Announce", content="Test Content", channel="General"
      Expected output: 201 Created
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    payload = {
        "title": "Test Announce",
        "content": "Test Content",
        "channel": "General"
    }
    response = requests.post(f"{BASE_URL}/announcements", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Announce"
    assert "id" in data

def test_create_announcement_missing_fields():
    """
    [ API being tested: POST /api/announcements
      Inputs: title="Only Title"
      Expected output: 400 Bad Request, error message
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    payload = {
        "title": "Only Title"
        # missing content and channel
    }
    response = requests.post(f"{BASE_URL}/announcements", json=payload)
    assert response.status_code == 400
    assert "error" in response.json()

def test_get_tasks():
    """
    [ API being tested: GET /api/tasks
      Inputs: None
      Expected output: 200 OK, list of tasks
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    response = requests.get(f"{BASE_URL}/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_task_success():
    """
    [ API being tested: POST /api/tasks
      Inputs: title="New Task", department="Software"
      Expected output: 201 Created
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    payload = {
        "title": "New Task",
        "department": "Software",
        "description": "Do the work"
    }
    response = requests.post(f"{BASE_URL}/tasks", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "New Task"
    assert "id" in data

def test_create_task_missing_fields():
    """
    [ API being tested: POST /api/tasks
      Inputs: title="Task Only"
      Expected output: 400 Bad Request (This demonstrates how expected and actual can differ if not handled properly)
      Actual Output: Verified by assertion
      Result: Success/Fail ]
    """
    payload = {
        "title": "Task Only"
        # missing department
    }
    response = requests.post(f"{BASE_URL}/tasks", json=payload)
    assert response.status_code == 400
    assert "error" in response.json()
