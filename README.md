# Learning-Platform-for-University-Entrance-Exam-Candidates

>This is a ReadMe to understand project info.

---

### Table Of Contents

- [Description](#description)
- [Machine Learning Algorithms](#machine-learning-algorithms)
- [Process for Ask Question](#process-for-ask-question)
- [Authentication](#authentication)
- [Storage](#storage)
- [User Interfaces](#user-interfaces)
- [Techonologies and Languages](#languages)

---

## Description

The aim of this project is to facilitate the communication of young audience candidates preparing for exams, to increase their working efficiency and to share information;
It also enables candidates preparing for the exam to compare their positions with other candidates and have an idea about other candidates' approach to the exam.
Basically, in project, the candidates will upload the questions they cannot solve to the system and other candidates will answer these questions.
These solutions will be ranked and classified among themselves through trial exams.Thus, a continuous mobility can be achieved in the system.

In addition to the most recent questions asked to users, some special categories are also provided.
These can be listed as follows: Special questions for you, questions you think you can ask in the university exam, the latest questions.
The aim of this project is to facilitate the communication of young audience candidates who are preparing for the exams,
if the user wants to answer the question, it is possible to send visuals, to answer the question with text as well as voice question and solution explanations.

Visual data to be uploaded by users will be stored via google firebase or amazon web services, at the same time, registration / login processes and
other databases and machine learning have been done through cloud services.


### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)

---

## User Intefaces


#### Sign In
![Sign in](user%20interfaces/sign%20in%20page.png)
----

#### Home 
![Home](user%20interfaces/homepage.jpg)
----

#### Upload Question
![Upload](user%20interfaces/upload%20question.jpg)
----

#### Contact
![Contact](user%20interfaces/contact.jpg)
----

#### Question Page
![Question](user%20interfaces/question%20page.jpg)
----

#### Profile
![Profile](user%20interfaces/profile.jpg)
----

#### FAQ
![FAQ](user%20interfaces/FAQ.jpg)


### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)

---

## Machine Learning Algorithms

Google cloud platform was used for all ML algorithms.

#### 1. Convert  image to text
This function is called OCR. It stands for Optical Character Recognazition.It was carried out as follows:A photo or pdf is sent to the system.Words are formed according to the spaces by progressing letter by letter in the sent file.The requirement in this project is to translate the submitted question into text.Also, data was needed to categorize the questions.The question booklets were downloaded as pdf and used to convert these pdfs to text.
•Used language: python
•API used: google vision api

#### 2. Classify question subject
It was used to learn and classify the texts of the questions whose requirement in this project was the image to text output according to 8 lessons (mat, geo, phys, bio, chemistry ...)So far, 82,571 data have been used for the learning of the system.After the learning of these data, it is determined which of the 8 categories the question belongs to.It does this by keeping the connections between words.In addition, 82.571 data required for the learning of the system was taken from the pdf, since the pdfs are larger than the images, a storage space is needed.Google storage was used to store these pdfs.This works the same as the drive.
• API used: Automl natural language
• Accuracy rate as a result of this learning: 90%.

#### 3. Personalized user experience with personalized question suggestions

Firstly, the server objectives in a preliminary test page for this algorithm can be listed as follows:
to present the mock exams registered in the database to the user and to present the necessary question information in the database to the user for the selected trial.

When the user completes the experiment, the purpose of the server is to compare the answers of the users who come to him with the answer key of the relevant experiment in the database, and to present the users' separate net information for each course and the net information in total.The previously produced TYT score calculation system has been developed with a linear regression model.With the linear regression model, it is possible to predict the possible tyt score of the user.According to the Tyt score results, the classification of the users was ensured with another machine learning model that was previously produced.

### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)

---

## Process for Ask Question

- I. With the help of dragzone, only one question image is uploaded to the system.
- II. The question loaded using the image to text ML function is translated into relative text.
- III. Using the Text Classify ML function, the type of the text of the problem is detected.
- IV. Question details are received from the user.
- V. Share question button is clicked.
- VI. Question image is uploaded to firebase storage:Creating a folder named FileID. The FileID was created as userId + Date.now () to be uniqe. Date.now () here is unique because it is taken in milliseconds.Inside the FileID folder there is both the question folder for the question and the answer folder for the answer. The purpose is to access all materials via FileID.At this point, the acquired information is FileId (questionId), userID, imageText, category ..
- VII. It sends everything until this process to the MongoDB database.The name of the database is simel.Inside the simel there is the question document. The document is the same as the table in MySQL.


### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)

---

## Authentication
Some methods were offered to users to log into the system (login, signup): mail, google, facebook, twitter.After selecting any of these options, a userId is obtained.
All other operations performed on the databased on behalf of the user are carried out through this userId.

Extra developer accounts were opened for Facebook and Twitter logins.The purpose is to access the userId of the users who log in with these accounts.Authentication was provided with the ip key provided by Facebook and Twitter.The reason for being an IP key is to perform the process without data gap between systems.Therefore, the systems have been developed in connection with each other with keys.


### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)
---

## Storage
It provides storage of all media in the system:question image, answer image, audio recordings, user-specific data, user profile photo.The advantage is that storage works on the client side, that is, clint media is loaded without the need for a server.Since its authentication is done in the same field, a link returns a public link after the user uploads a question.It takes this link and it is processed in the database.In other words, it is used only when the user uploads a question.

### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)
---


## Techonologies & Languages

- Python (for data)
- NodeJS (backend)
- React (frontend)
- Google Vision API
- Automl Natural Language API


### [Back To The Top](#Learning-Platform-for-University-Entrance-Exam-Candidates)

---



