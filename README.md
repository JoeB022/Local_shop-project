# Local Shop Project

## Description
The Local Shop Project is a web application built with Flask for the backend and React for the frontend. It provides a platform for managing stores, products, and supply requests, with user authentication and role management.

## Features
- User authentication with JWT (JSON Web Tokens).
- Role-based access control for merchants, clerks, and admins.
- Management of stores and products.
- Supply request handling.
- CORS support for cross-origin requests.
- Responsive frontend built with React.

## Backend Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd local_shop-project
   ```

2. Install the required packages:
   ```bash
   pip install -r Backend/requirements.txt
   ```

3. Set up the database:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

4. Run the backend application:
   ```bash
   python Backend/app.py
   ```

## Frontend Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Run the frontend application:
   ```bash
   npm start
   ```

## Usage
- Access the backend application at `http://127.0.0.1:5000`.
- Access the frontend application at `http://localhost:5173`.
- Use the provided endpoints for user authentication, store management, and supply requests.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.
