from models.student import Student
from services.parser import Parser

class StudentManager:
    def __init__(self, url: str):
        self.students = []
        if not url.endswith('/'): 
            url += '/'
        self.url = url

    def add_student(self, student):
        self.students.append(student)

    def fetch_students_in_range(self, start_id, end_id, step = 1):
        """
        Завантажує дані студентів у діапазоні ID від start_id до end_id (включно).
        """
        parser = Parser()
        for student_id in range(start_id, end_id + 1, step):  # end_id включительно
            student = parser.parse_student_data(self.url, student_id)
            if student:
                print(f"{student_id} +") 
                self.add_student(student)
            else:
                print(f"{student_id} -")    

    def fetch_all_students(self, student_ids):
        """
        Завантажує дані студентів за переліком ID.
        """
        parser = Parser()
        for student_id in student_ids:
            student = parser.parse_student_data(self.url, student_id)
            if student:
                self.add_student(student)

    def get_all_students_data(self):
        return [student.get_data() for student in self.students]