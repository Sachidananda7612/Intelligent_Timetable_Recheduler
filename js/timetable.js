document.addEventListener("DOMContentLoaded", () => {
  // Get all day rows (they're in thead, after the time slots row)
  const dayRows = document.querySelectorAll('thead tr:not(:first-child):not(:nth-child(2))');
  
  fetch("http://localhost:5000/api/getTimetable")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success && data.timetableData && data.timetableData.length > 0) {
        // Process each day row
        dayRows.forEach(row => {
          // Get the day name from the first cell
          const dayName = row.querySelector('th').textContent.trim().toLowerCase();
          
          // Find subjects for this day
          const daySubjects = data.timetableData.filter(item => 
            item.day.toLowerCase() === dayName
          );
          
          // Clear existing cells (if any) and add 7 cells for time slots
          const existingCells = row.querySelectorAll('td');
          existingCells.forEach(cell => cell.remove());
          
          // Add a cell for each time slot
          const timeSlots = [
            "09:00-09:55",
            "09:55-10:50",
            "11:10-12:05",
            "12:05-01:00",
            "01:55-02:50",
            "03:00-03:55",
            "03:55-04:45"
          ];
          
          // Function to normalize time format (remove milliseconds and handle 24hr format)
          const normalizeTime = (time) => {
            // Remove milliseconds if present
            time = time.split('.')[0];
            // Convert to 12-hour format if needed
            const [hours, minutes] = time.split(':');
            let hour = parseInt(hours);
            
            // Special handling for afternoon times
            if (hour >= 13 && hour <= 16) { // Handle 1 PM to 4 PM
              hour = hour - 12;
            } else if (hour === 0) {
              hour = 12;
            }
            
            // Always pad single digit hours with 0
            let normalizedHour = hour;
            // Ensure single-digit hours in the afternoon are shown correctly (e.g., "02:50" for 2:50 PM)
            if (hour >= 1 && hour <= 4 && time.includes('PM')) {
              normalizedHour = hour;
            }
            return `${normalizedHour < 10 ? '0' + normalizedHour : normalizedHour}:${minutes}`;
          };

          // Function to convert time string to standardized 24-hour minutes for comparison
          const timeToMinutes = (timeStr) => {
            let [hours, minutes] = timeStr.split(':').map(num => parseInt(num));
            // Convert afternoon times (12 PM to 4:45 PM) to 24-hour format
            if (hours >= 1 && hours <= 4) {
              hours += 12; // Convert to 24-hour format (1 PM = 13:00, 2 PM = 14:00, etc.)
            }
            // Special case for 12 PM
            else if (hours === 12) {
              hours = 12; // Keep 12 PM as 12
            }
            return hours * 60 + minutes;
          };

          // Function to check if a subject's time range overlaps with a slot
          const isOverlapping = (subjectStart, subjectEnd, slotStart, slotEnd) => {
            const subStartMins = timeToMinutes(subjectStart);
            const subEndMins = timeToMinutes(subjectEnd);
            const slotStartMins = timeToMinutes(slotStart);
            const slotEndMins = timeToMinutes(slotEnd);
            
            return subStartMins <= slotEndMins && subEndMins >= slotStartMins;
          };

          let lastSubject = null; // Track the last subject to handle spanning
          
          timeSlots.forEach((slot, index) => {
            const td = document.createElement('td');
            const [slotStart, slotEnd] = slot.split('-');
            
            // If the last subject is still spanning this slot, use it
            if (lastSubject) {
              const subjectEndTime = normalizeTime(lastSubject.end_time);
              const currentSlotEndTime = slotEnd;
              
              if (timeToMinutes(subjectEndTime) >= timeToMinutes(currentSlotEndTime)) {
                td.textContent = lastSubject.subject_id;
                td.title = `Subject: ${lastSubject.subject_id}\nTeacher: ${lastSubject.teacher_id || 'Not assigned'}\nTime: ${normalizeTime(lastSubject.start_time)}-${normalizeTime(lastSubject.end_time)}`;
                row.appendChild(td);
                return;
              } else {
                lastSubject = null;
              }
            }
            
            // Find if there's a subject starting in this time slot
            const subject = daySubjects.find(s => {
              const startTime = normalizeTime(s.start_time);
              const endTime = normalizeTime(s.end_time);
              return isOverlapping(startTime, endTime, slotStart, slotEnd);
            });
            
            if (subject) {
              td.textContent = subject.subject_id;
              td.title = `Subject: ${subject.subject_id}\nTeacher: ${subject.teacher_id || 'Not assigned'}\nTime: ${normalizeTime(subject.start_time)}-${normalizeTime(subject.end_time)}`;
              // If this subject spans multiple slots, track it
              if (timeToMinutes(normalizeTime(subject.end_time)) > timeToMinutes(slotEnd)) {
                lastSubject = subject;
              }
            } else {
              td.textContent = '-';
            }
            row.appendChild(td);
          });
        });
      } else {
        dayRows.forEach(row => {
          // Clear and add empty cells if no data
          const cells = row.querySelectorAll('td');
          cells.forEach(cell => cell.remove());
          
          for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            td.textContent = '-';
            row.appendChild(td);
          }
        });
      }
    })
    .catch(error => {
      // Show error state in the table
      dayRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => cell.remove());
        
        const errorCell = document.createElement('td');
        errorCell.colSpan = 7;
        errorCell.textContent = 'Failed to load timetable data';
        row.appendChild(errorCell);
      });
    });
});