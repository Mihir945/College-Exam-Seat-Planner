# Exam Seat Planner

A small web app to manage classrooms and allocate exam seats to students.  
Built with HTML, CSS, JavaScript.

## Features

- Add classrooms with:
  - Room ID
  - Capacity
  - Floor number
  - Near washroom flag
- View all added classrooms in a clean table.
- Allocate exam seats for a given total number of students.
- Simple allocation logic:
  - Fills classrooms in the order they were added.
  - Shows how many students are in each room.
  - Shows if some students are still unallocated.

# Basic Architecture Flow
      Add Classroom
           |
      stored in In-Memory
           |
      View Classroom from In-Memory
           |
     Allocate exam Seats Fetch from In-memory 
           |
     Allocation Logic Execute
           |
     Output result info if allocated or not                          

## Tech Stack

- **Frontend With Logic and In-Memory Database**: HTML, CSS, vanilla JavaScript  


## Getting Started

### 1. Clone the repo

```bash
git clone <https://github.com/Mihir945/College-Exam-Seat-Planner>
cd exam-seat-planner
