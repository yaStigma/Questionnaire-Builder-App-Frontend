# Questionnaire Builder App

**Overview**
The Questionnaire Builder App is a web-based application designed for creating and completing questionnaires. It allows users to build questionnaires with multiple question types, including text, single-choice, and multiple-choice questions. The application also stores questionnaires and answers in a database.

The project is implemented at a base level, which includes essential features for building, viewing, and completing questionnaires.

**Project Structure**
The project includes the following main components:

Questionnaire Catalog Page - Displays a list of available questionnaires with actions like "edit," "run," and "delete."

Questionnaire Builder Page - Allows users to create questionnaires with multiple question types.

Interactive Questionnaire Page - Lets users answer questionnaires and view the time spent completing them.

Database - Stores questionnaire data and responses.

**Features**
Base Level

- Questionnaire Catalog Page: View available questionnaires with details like name, description, number of questions, and completions.
- Questionnaire Builder Page: Create questionnaires by adding multiple questions. Supports the following question types:
  - Text: Free-form user input.
  - Single Choice: Radio buttons for single selection.
  - Multiple Choice: Checkbox buttons for multiple selections.
- Interactive Questionnaire Page: Complete the questionnaire, view answers, and see the time spent on the task. Responses are stored in the database.

**Technologies Used**

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js (with Express.js)
- Database: MongoDB (NoSQL)
- Libraries/Frameworks: React (Frontend), Axios (for API calls)

**Installation**

1. Clone the repository:
   git clone <https://github.com/yaStigma/Questionnaire-Builder-App-Frontend.git>
2. Navigate to the project folder:
   cd <Questionnaire-Builder-App-Frontend>
3. Install dependencies:
   npm install
4. Start the server:
   npm run dev
   The app will be accessible at http://localhost:3000.

**Author**

- Author: Yenakiieva Tanya.
- Contact Information: email: yastigma@gmail.com, telegram: yastigma.
- GitHub: https://github.com/yaStigma
