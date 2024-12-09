document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const attendanceList = document.getElementById('attendanceList');

    // Função para carregar a lista de presença do localStorage
    function loadAttendance() {
        const attendanceData = localStorage.getItem('attendance');
        if (attendanceData) {
            return JSON.parse(attendanceData);
        }
        return [];
    }

    // Função para salvar a lista de presença no localStorage
    function saveAttendance(attendance) {
        localStorage.setItem('attendance', JSON.stringify(attendance));
    }

    // Função para zerar a lista de presença no localStorage
    function clearAttendance() {
        localStorage.removeItem('attendance');
    }

    // Função para imprimir a lista e depois zerá-la
    function printAndClearAttendance() {
        window.print();
        clearAttendance();
        attendanceList.innerHTML = '';
    }

    // Carregar e exibir a lista de presença
    const attendance = loadAttendance();
    attendance.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student;
        attendanceList.appendChild(listItem);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;

        if (studentName) {
            const listItem = document.createElement('li');
            listItem.textContent = studentName;
            attendanceList.appendChild(listItem);

            // Adicionar aluno à lista de presença e salvar no localStorage
            attendance.push(studentName);
            saveAttendance(attendance);

            // Limpar o campo de entrada após adicionar o nome
            document.getElementById('studentName').value = '';
        }
    });

    // Adicionar evento ao botão de impressão
    document.getElementById('printButton').addEventListener('click', printAndClearAttendance);
});
