# Role-Based Access Control (RBAC) System

This project is a **Role-Based Access Control (RBAC)** system designed to manage users, their roles, and permissions through an intuitive and responsive web interface. The system simplifies user management for applications that require hierarchical role control and efficient access management.

## Project Overview

RBAC is a common security paradigm in software systems, allowing organizations to define roles and permissions for their users. This project enables administrators to perform user operations like adding, editing, and deleting, as well as assigning roles dynamically. The system is optimized for ease of use with features such as sorting, searching, and a clean, responsive UI.

---

## Features

1. **User Management**:
   - Add, edit, and delete users with just a few clicks.

2. **Role Management**:
   - Assign roles (e.g., Admin, Editor, Viewer) to users.
   - Users can have multiple roles displayed in a comma-separated format.

3. **Dynamic Sorting**:
   - Clickable column headers allow sorting by **ID**, **Name**, **Email**, **Roles**,**Role Name** or **Status**.

4. **Search Functionality**:
   - Search users dynamically by typing keywords in the search bar.
   - Filters results in real-time by matching **Name**, **Email**, or **Roles**.

5. **Responsive Design**:
   - Supports horizontal scrolling for tables on smaller screens.
   - Ensures usability across devices (desktop, tablet, and mobile).
   - A **Sidebar** replaces the traditional navbar for better navigation and improved user experience,  especially on smaller devices.


6. **Actions**:
   - Provides **Edit** and **Delete** buttons for each user in the table.
   - Edit functionality allows modifying user details and roles.

---

## Tech Stack

- **Frontend**: ReactJS
- **Styling**: CSS (customized for responsive designs)
- **Package Management**: npm

---

## Screenshots

> Add relevant screenshots showcasing:
- The user list with sorting and searching.
- The Add/Edit user form.
- The responsive design on smaller devices.

---

## Getting Started
 
Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js**: `>=16.x`
- **npm**: `>=8.x` (or use `yarn` as an alternative)

### Installation

1. **Clone the Repository**:
   ```bash
   [git clone https://github.com/yourusername/rbac-system.git](https://github.com/ShanuRocky/RBAC_frontend.git)
2. **Install Dependencies**:
   ```bash
   npm install
3. **Start the Development Server**:
   ```bash
   npm start

