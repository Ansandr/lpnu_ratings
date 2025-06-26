class Student:
    def __init__(self, student_id, subjects):
        self.id = student_id
        self.subjects = subjects
        self.average_score = self._calculate_average_score()

    def _calculate_average_score(self):
        """Обчислити рейтинговий бал з врахуванням кредитів"""
        total_weighted_marks = sum(subject.get_weighted_mark() for subject in self.subjects)
        total_credits = sum(subject.credits for subject in self.subjects)
        return (total_weighted_marks / total_credits) * 0.95

    def get_data(self):
        """Повертає дані студента у вигляді словника."""
        return {
            "id": self.id,
            "subjects": [
                {"name": subject.name, "credits": subject.credits, "mark": subject.mark}
                for subject in self.subjects
            ],
            "average_score": self.average_score
        }