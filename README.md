# Languages.com
This project was created as a submission for the Rich Web Applications module. The aim of the project was to create a project to be professional looking, user friendly and fulfil the criteria given.

This project was worth 40% of our overall module mark. This submission achieved 85 out of 100 marks (34 out of 40 for the module).

--- 

### Technologies Used

|PHP    | Stripe API |BootStrap|
| ------------- |:-------------:| -----:|
| Javascript     | MYSQL   |  JQuery |
| AJAX| JSON    | HTML | 
|    | CSS | 

---

### Functionality
Registration & Login System
  - Client side & server side validation
 
Session awareness across multiple devices
  - Session ID created on login and stored on server, no sensitive user details will be stored on the application.
  - If a user hasn't bought any courses, their session key is valid for 2 hours or until they exit the app.
  - If a user has bought a course, they will stay logged in until the user chooses to log out.

Live search system to search for courses by title

Purchasing system
 - User's debit/credit card purchase processed through Stripe.
 - User's purchase saved on database.
 
 Locking & unlocking of courses 
 - The user can only be able to view the course from one device at a given time.
 
 Lesson tracking 
 - Keep track of which lesson a user is currently on for each course that they have purchased.
 
 Profile Editing
