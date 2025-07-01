from managers.student_manager import StudentManager
from services.exporter import JsonExporter

def main():
    url = "https://student.lpnu.ua/curriculum_consent"

    # Програма

    my_id = 1600927

    #start_id = my_id - (150 * 7)
    #end_id = my_id + (150 * 7)
    step = 7



    # програма
    start_id = 1600248 
    end_id = 1601977


    manager = StudentManager(url)
    manager.fetch_students_in_range(start_id, end_id, step)

    exporter = JsonExporter()
    exporter.export(manager.get_all_students_data(), "students.json")

if __name__ == "__main__":
    main()