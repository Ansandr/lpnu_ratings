import requests
from bs4 import BeautifulSoup
from models.student import Student
from models.subject import Subject


class Parser:
    def parse_student_data(self, url, student_id):
        response = requests.get(url + str(student_id))
        soup = BeautifulSoup(response.text, "html.parser")
        table = soup.find('table', attrs={"class": "table table-bordered table-condensed table-hover table-striped"})

        if table is None:
            return None

        # Знаходимо назви предметів, кредити та оцінки
        disciplines = [td.get_text(strip=True) for td in table.find_all('td', attrs={"headers": "view-subject-name-table-column"})]
        credits = [td.get_text(strip=True) for td in table.find_all('td', attrs={"headers": "view-credits-table-column"})]
        marks = [td.get_text(strip=True) for td in table.find_all('td', attrs={"headers": "view-mark-table-column"})]

        # Створюємо список об'єктів Subject
        subjects = []
        for discipline, credit, mark in zip(disciplines, credits, marks):
            subjects.append(Subject(discipline, credit, mark))

        return Student(student_id, subjects)