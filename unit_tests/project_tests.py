import pytest
import requests

# Assuming your API is running on localhost:3000
BASE_URL = "http://localhost:3000/api"


def test_about_page():
    response = requests.get(f"{BASE_URL}/about")
    data = response.json()
    assert any(person["first_name"] == "Raz" for person in data)
    assert any(person["last_name"] == "Hagani" for person in data)
    assert any(person["first_name"] == "Josh" for person in data)
    assert any(person["last_name"] == "Fiquette" for person in data)


def test_create_cost_item_success():
    return_value = {"data": {"id": 1, "description": "Test Cost"}}
    payload = {
        "description": "Test Cost",
        "category": "health",
        "userid": "user123",
        "sum": 100,
        "create_date": "2025-02-11"
    }
    response = requests.post(f"{BASE_URL}/add", json=payload)
    assert response.status_code == 201
    assert response.json()["userid"] == "user123"
    assert response.json()["description"] == "Test Cost"
    assert response.json()["category"] == "health"
    assert "2025-02-11" in response.json()["create_date"]


def test_create_cost_item_missing_fields():
    payload = {
        "description": "Test Cost",
    }
    response = requests.post(f"{BASE_URL}/add", json=payload)
    assert response.status_code == 400
    assert "error" in response.json()
    assert response.json()["error"] == "All fields are required"


def test_create_report_missing_fields():
    response = requests.get(f"{BASE_URL}/report/")
    assert response.status_code == 400
    assert response.json() == {"error": "Missing required parameters"}
    response = requests.get(f"{BASE_URL}/report?year=2025")
    assert response.status_code == 400
    assert response.json() == {"error": "Missing required parameters"}
    response = requests.get(f"{BASE_URL}/report?month=1")
    assert response.status_code == 400
    assert response.json() == {"error": "Missing required parameters"}


def test_create_report_success():
    response = requests.get(f"{BASE_URL}/report?userid=user123&year=2025&month=2")
    assert response.status_code == 200
    assert response.json()["userid"] == "user123"
    assert response.json()["year"] == 2025
    assert response.json()["month"] == 2
    assert len(response.json()["costs"])>0

def test_get_user_success():
    response = requests.get(f"{BASE_URL}/users/123")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "123"
    assert data["first_name"] == "raz"
    assert data["last_name"] == "hagani"
    assert isinstance(data["total"], (int, float))
    assert data["total"] >= 0  # לוודא שהתוצאה אינה שלילית

def test_get_user_not_found():
    response = requests.get(f"{BASE_URL}/users/999999")  
    assert response.status_code == 404
    data = response.json()
    assert "error" in data
    assert data["error"] == "User not found"
