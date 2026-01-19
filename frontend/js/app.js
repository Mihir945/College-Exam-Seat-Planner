// js/app.js

// In-memory list of classrooms
const classrooms = [];

// Helper: get element by id
const $ = (id) => document.getElementById(id);

// Add a classroom from the form
function addClassroom() {
  const roomId = $("roomId").value.trim();
  const capacityValue = $("capacity").value;
  const floorNoValue = $("floorNo").value;
  const nearWashroom = $("nearWashroom").checked;

  const capacity = Number(capacityValue);
  const floorNo = Number(floorNoValue);

  // Basic validation
  if (!roomId) {
    alert("Please enter a Room ID.");
    return;
  }
  if (!capacity || capacity <= 0) {
    alert("Please enter a valid capacity.");
    return;
  }
  if (Number.isNaN(floorNo)) {
    alert("Please enter a valid floor number.");
    return;
  }

  // Create classroom object
  const classroom = {
    roomId,
    capacity,
    floorNo,
    nearWashroom,
  };

  classrooms.push(classroom);
  renderClassroomTable();

  // Clear form
  $("classroomForm").reset();
  $("roomId").focus();
}

// Render classrooms into the table
function renderClassroomTable() {
  const tbody = $("classroomTable");
  tbody.innerHTML = "";

  if (classrooms.length === 0) {
    const emptyRow = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No classrooms added yet.";
    cell.style.color = "#6b7280";
    emptyRow.appendChild(cell);
    tbody.appendChild(emptyRow);
    return;
  }

  classrooms.forEach((cls) => {
    const row = document.createElement("tr");

    const roomCell = document.createElement("td");
    roomCell.textContent = cls.roomId;
    row.appendChild(roomCell);

    const capacityCell = document.createElement("td");
    capacityCell.textContent = cls.capacity;
    row.appendChild(capacityCell);

    const floorCell = document.createElement("td");
    floorCell.textContent = cls.floorNo;
    row.appendChild(floorCell);

    const washroomCell = document.createElement("td");
    washroomCell.textContent = cls.nearWashroom ? "Yes" : "No";
    row.appendChild(washroomCell);

    tbody.appendChild(row);
  });
}

// Allocate exam seats across classrooms
function allocateExam() {
  const totalStudentsValue = $("students").value;
  const totalStudents = Number(totalStudentsValue);

  if (!totalStudents || totalStudents <= 0) {
    alert("Please enter a valid total number of students.");
    return;
  }

  if (classrooms.length === 0) {
    alert("Please add at least one classroom first.");
    return;
  }

  // Simple allocation: fill classrooms in the order they were added
  let remaining = totalStudents;
  const allocation = [];

  classrooms.forEach((cls) => {
    if (remaining <= 0) {
      allocation.push({
        roomId: cls.roomId,
        allocated: 0,
        capacity: cls.capacity,
      });
      return;
    }

    const allocated = Math.min(remaining, cls.capacity);
    allocation.push({
      roomId: cls.roomId,
      allocated,
      capacity: cls.capacity,
    });
    remaining -= allocated;
  });

  // Build a readable output
  let output = "";
  output += `Total students: ${totalStudents}\n`;
  output += `Classrooms used: ${classrooms.length}\n\n`;

  allocation.forEach((item) => {
    output += `Room ${item.roomId}: ${item.allocated}/${item.capacity} students\n`;
  });

  if (remaining > 0) {
    output += `\n⚠ Still unallocated: ${remaining} students (not enough capacity).\n`;
  } else {
    output += `\nAll students have been allocated to classrooms.\n`;
  }

  $("output").textContent = output;
}

// Render initial empty state
document.addEventListener("DOMContentLoaded", () => {
  renderClassroomTable();
});
