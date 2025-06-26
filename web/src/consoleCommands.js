// Функція для виведення інформації про доступні команди
function raitingsHelp() {
    console.log("Доступні команди:");
    console.log("1. viewStudentInfo('ID_студента') - переглянути інформацію про студента за його ID.");
    console.log("2. setStudentMark('ID_студента', 'Назва_предмета', нова_оцінка) - встановити оцінку студенту за предмет.");
    console.log("3. exportTableToJson() - експортувати таблицю у форматі JSON (скачати файл).");
    console.log("4. raitingsHelp() - показати список доступних команд.");
}

// Функція для виведення інформації про навчальний план в консоль
function viewStudentInfo(studentId) {
    const student = studentsData.find(student => student.id === studentId);
    if (student) {
        console.log(`Дані по навчальному плану ${studentId}:`);
        console.log(`Рейтингоаий бал: ${student.average_score.toFixed(2)}`);
        console.log('Предмети:');
        student.subjects.forEach(subject => {
            console.log(`- ${subject.name}: ${subject.mark}`);
        });
    } else {
        console.log(`Навчальний план ID ${studentId} не знайден.`);
    }
}

// Функція для встановлення оцінки за предмет
function setStudentMark(studentId, subjectName, newMark) {
    const student = studentsData.find(student => student.id === studentId);
    if (student) {
        const subject = student.subjects.find(subject => subject.name === subjectName);
        if (subject) {
            subject.mark = newMark;
            console.log(`Оцінка по "${subjectName}" для навчального плану ${studentId} встановлена на ${newMark}.`);
            // Пересчет среднего балла
            student.average_score = calculateScore(student);
            // Обновление таблицы
            document.querySelector("#ranking-table tbody").innerHTML = '';
            createTable(studentsData);
        } else {
            console.log(`Предмет "${subjectName}" не не знайден в навчальному плані ${studentId}.`);
        }
    } else {
        console.log(`Навчальний план ID ${studentId} не знайден.`);
    }
}

// Функція для експорту таблиці у форматі JSON
function downloadJson() {
    const jsonData = JSON.stringify(studentsData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Таблиця экспортована у файл students_data.json');
}

// Додавання команд у глобальну область видимості для доступу через консоль
window.viewStudentInfo = viewStudentInfo;
window.setStudentMark = setStudentMark;
window.downloadJson = downloadJson;
window.raitingsHelp = raitingsHelp;