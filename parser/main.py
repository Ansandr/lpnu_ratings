from managers.student_manager import StudentManager
from services.exporter import JsonExporter

def main():
    url = "https://student.lpnu.ua/curriculum_consent"

    # Програма

    my_id = 1600927

    start_id = my_id - (24 - 30 - 30 - 30)  * 2
    end_id = start_id + (300)



    # програма
    #start_id = 1500331 
    #end_id = 1500872


    manager = StudentManager(url)
    manager.fetch_students_in_range(start_id, end_id)

    exporter = JsonExporter()
    exporter.export(manager.get_all_students_data(), "students.json")

if __name__ == "__main__":
    main()