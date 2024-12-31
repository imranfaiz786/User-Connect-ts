# User Connection Service

This project is a User Connection Service built with **Node.js** and **MongoDB**. It allows users to create profiles, generate unique QR codes, and send invitations via email or SMS.

## Features

- **Create User Connections**: Add user profiles with details like name, email, and phone number, and generate QR codes.
- **Send Invitations**: Send personalized email or SMS invitations with QR codes.
- **View Connections**: Retrieve details of single or all user connections.
- **QR Code Generation**: Automatically generate unique QR codes for each user.
- **Email & SMS Integration**: Seamlessly send invitations using Nodemailer and Twilio.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web application framework.
- **MongoDB**: Database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **Nodemailer**: For email invitations.
- **Twilio**: For SMS invitations.
- **QRCode**: For generating QR codes.

## Installation

### Prerequisites

- **Node.js** and **npm**: Install from [nodejs.org](https://nodejs.org).
- **MongoDB**: Use MongoDB Atlas or a local instance.
- **Twilio Account**: Obtain Twilio credentials.
- **Email Credentials**: Set up an email service (e.g., Gmail).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/user-connection-service.git
   cd user-connection-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   TWILIO_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```
4. Start the server:
   ```bash
   yarn dev
   ```

The application runs on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

- **Create User Connection**: `POST /api/connect` – Add a new user connection.
- **Send Invitation**: `POST /api/connect/:id/invite` – Send email or SMS invitations.
- **Get User Connection by ID**: `GET /api/connect/:id` – Retrieve specific user details.
- **Get All Connections**: `GET /api/connect` – Retrieve all user connections.

## Services

- **Generate QR Code**: Creates unique QR codes for each user based on their email.
- **Send Email**: Sends email invitations via Nodemailer.
- **Send SMS**: Sends SMS invitations via Twilio, handling message length appropriately.

## Error Handling

The API provides detailed error messages for invalid inputs or missing fields, ensuring smooth debugging.

## Example Invitations

- **Email**: "Hello John Doe, You are invited to connect! Your QR Code: [QR_CODE_URL]. Link: http://localhost:3000/connect/john.doe@example.com"
- **SMS**: "Hello John Doe, You are invited to connect! Your QR Code: [QR_CODE_URL]. Link: http://localhost:3000/connect/john.doe@example.com"

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make changes and commit:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a Pull Request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

