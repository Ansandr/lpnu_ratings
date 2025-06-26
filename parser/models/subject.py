class Subject:
    def __init__(self, name: str, credits, mark):
        self.name = name
        self.credits = float(credits)
        self.mark = int(mark)

    def get_weighted_mark(self):
        """Повертає оцінку, помножену на кредити."""
        return self.mark * self.credits

    def __repr__(self):
        return f"Subject(name={self.name}, credits={self.credits}, mark={self.mark})"