# Intelligent Timetable Rescheduler

A web-based application for managing and rescheduling timetables intelligently. The system handles teacher absences and automatically suggests schedule adjustments.

## Features

- 📅 View and manage class timetables
- 👩‍🏫 Track teacher attendance
- 🔄 Automatic rescheduling on teacher absence
- 🔐 Role-based access (Admin, Teacher, Student)
- 📱 Responsive web interface

## Project Structure

```
Intelligent_Timetable_Recheduler/
├── config/           # Database and configuration files
├── controller/       # Business logic and API controllers
├── css/             # Stylesheets
│   └── style.css
├── HTML/            # Frontend HTML pages
│   ├── absence.html    # Teacher absence marking
│   ├── dashboard.html  # Main dashboard
│   ├── index.html      # Login page
│   └── timetable.html  # Timetable view
├── js/              # Frontend JavaScript
│   └── main.js        # Core functionality
├── router/          # API routes
└── server.js        # Express server entry point
```

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MySQL Server
   - Git

2. **Clone the Repository**
   ```bash
   git clone https://github.com/Sachidananda7612/Intelligent_Timetable_Recheduler.git
   cd Intelligent_Timetable_Recheduler
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Database Setup**
   - Create a MySQL database
   - Update database configuration in `config/db.js`
   - Required tables:
     - users (for authentication)
     - timetable (for schedule data)
     - teacherlogin (for attendance tracking)

5. **Start the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the Application**
   - Open http://localhost:5000 in your browser
   - Login with appropriate credentials

## Basic Flow

1. **User Authentication**
   - Users log in through `index.html`
   - Role-based redirection to appropriate dashboard

2. **Teacher Flow**
   - Login records attendance automatically
   - Can view their schedule
   - Mark planned absences

3. **Admin Flow**
   - View complete timetable
   - Monitor teacher attendance
   - Handle rescheduling requests

4. **Student Flow**
   - View class schedule
   - Get notifications of changes

## API Endpoints

- `GET /api/getUser` - Authentication
- `GET /api/getTimetable` - Fetch timetable data
- More endpoints documented in router files

## Time Slots

The system operates with the following time slots:
- 09:00-09:55
- 09:55-10:50
- 11:10-12:05
- 12:05-01:00
- 01:55-02:50
- 03:00-03:55
- 03:55-04:45

## Development

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL
- Version Control: Git

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.