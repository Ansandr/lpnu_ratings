const toCalculateScore = true;

function createTable(data) {
    const tableBody = document.querySelector("#ranking-table tbody");

    // Sort students by average score in descending order
    data.sort((a, b) => {
        const scoreA = toCalculateScore ? calculateScore(a) : a.average_score;
        const scoreB = toCalculateScore ? calculateScore(b) : b.average_score;
        return scoreB - scoreA; // Сортування за спаданням
    });

    // Додавання рядків до таблиці
    data.forEach((student, index) => {
        const row = document.createElement("tr");
        let score = student.average_score.toFixed(2);
        let calcuLatedscore = calculateScore(student).toFixed(2);
        
        // Виведення попередження, якщо значення з JSON не збігається з розрахованим
        if (score != calcuLatedscore) {
            console.log(`ID ${student.id}: ${score} (json) - ${calcuLatedscore} (calc)`)
        }

        // Використання розрахованого балу, якщо toCalculateScore = true
        if (toCalculateScore) {
            score = calcuLatedscore;
        }       

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.id}</td>
            <td>${score}</td>
        `;

        // Додавання події кліку для показу/приховування деталей
        row.addEventListener("click", () => {
            const detailsRow = document.getElementById(`details-${student.id}`);
            if (detailsRow) {
                detailsRow.style.display = detailsRow.style.display === "none" ? "table-row" : "none";
            }
        });

        tableBody.appendChild(row);

        // Створення рядка з деталями
        const detailsRow = document.createElement("tr");
        detailsRow.id = `details-${student.id}`;
        detailsRow.classList.add("details");
        detailsRow.style.display = "none";
        detailsRow.innerHTML = `
            <td colspan="3">
                    <div style="margin-top: 10px;">
                        <a href="https://student.lpnu.ua/curriculum_consent/${student.id}" 
                            target="_blank" 
                            style="color: #2E3192; font-weight: bold;">
                            Подивитсь навчальний план
                        </a>
                    </div>
                    <table class="nested-table">
                        <tbody>
                            ${student.subjects.map(subject => `
                                <tr>
                                    <td>${subject.name}</td>
                                    <td>${subject.credits}</td>
                                    <td>${subject.mark}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
            </td>
        `;

        tableBody.appendChild(detailsRow);
        
    });
}

function calculateScore(student) {
    let totalWeigthedMarks = 0;
    let totalCredits = 0;
    for (const subject of student.subjects) {
        totalWeigthedMarks += subject.credits * subject.mark;
        totalCredits += subject.credits;
    }
    return (totalWeigthedMarks / totalCredits) * 0.95;
}

async function loadData() {
    const response = await fetch("./students.json");
    const studentsData = await response.json();

    createTable(studentsData);
}

if (toCalculateScore) {
    console.log("Javascript now calculating average score despite json. ")
}

document.addEventListener("DOMContentLoaded", loadData);