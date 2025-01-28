const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const noteModal = document.getElementById("noteModal");
const selectedDateEl = document.getElementById("selectedDate");
const noteText = document.getElementById("noteText");
const noteTime = document.getElementById("noteTime");
const saveNote = document.getElementById("saveNote");
const closeModal = document.getElementById("closeModal");

let currentDate = new Date();
let notes = {};
let irrigationStatus = {};

function renderCalendar() {
  calendarBody.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  let dayCell = 0;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (dayCell >= firstDay && dayCell - firstDay < daysInMonth) {
        const day = dayCell - firstDay + 1;
        cell.textContent = day;
        cell.dataset.date = `${year}-${month + 1}-${day}`;

        // Check the irrigation status for the date and color the cell accordingly
        if (irrigationStatus[cell.dataset.date]) {
          cell.style.backgroundColor = "lightgreen";
        } else {
          cell.style.backgroundColor = "#ffc6c620";
        }

        cell.addEventListener("click", openModal);
      }
      row.appendChild(cell);
      dayCell++;
    }
    calendarBody.appendChild(row);
  }
}

function openModal(event) {
  const date = event.target.dataset.date;
  selectedDateEl.textContent = `Date: ${date}`;

  // Clear previous checkboxes and labels from the modal
  const modalContent = document.querySelector(".modal-content");
  const existingCheckbox = modalContent.querySelector("input[type='checkbox']");
  if (existingCheckbox) {
    modalContent.removeChild(existingCheckbox);
  }
  const existingLabel = modalContent.querySelector("label");
  if (existingLabel) {
    modalContent.removeChild(existingLabel);
  }

  // Display the irrigation checkbox based on current status
  const irrigationCheckbox = document.createElement("input");
  irrigationCheckbox.type = "checkbox";
  irrigationCheckbox.checked = irrigationStatus[date] || false;
  irrigationCheckbox.addEventListener("change", () =>
    toggleIrrigation(date, irrigationCheckbox.checked)
  );

  const irrigationLabel = document.createElement("label");
  irrigationLabel.textContent = "Irrigation Done";

  modalContent.appendChild(irrigationLabel);
  modalContent.appendChild(irrigationCheckbox);

  noteText.value = notes[date]?.text || "";
  noteTime.value = notes[date]?.time || "";

  noteModal.classList.remove("hidden");
}

function toggleIrrigation(date, isChecked) {
  irrigationStatus[date] = isChecked;
  renderCalendar();
}

function saveNoteHandler() {
  const date = selectedDateEl.textContent.split(": ")[1];
  notes[date] = {
    text: noteText.value,
    time: noteTime.value,
  };
  noteModal.classList.add("hidden");
  renderCalendar();
}

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener("click", () => {
  noteModal.classList.add("hidden");
});

saveNote.addEventListener("click", saveNoteHandler);

renderCalendar();
