# Learning-Platform-for-University-Entrance-Exam-Candidates

>This is a ReadMe to understand project info.

---

### Table Of Contents

- [Description](#description)
- [Machine Learning Algorithms](#machine-learning-algorithms)
- [Process for Ask Question](#process-for-ask-question)
- [Authentication](#authentication)
- [Storage](#storage)
- [User Intefaces](#user-interfaces)
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


---
## User Intefaces

![Sign in](user%20interfaces/sign%20in%20page.png)

![ ](screenshots/socket%20tunnel%20process%20comunication.jpg)

### [Back To The Top](#Software-Architecture-for-Natural-Disaster)

---

## Machine Learning Algorithms

Google cloud platform was used for all ML algorithms.

#### 1. Convert  image to text
#### 2. Classify question subject
#### 3. Personalized user experience with personalized question suggestions


### [Back To The Top](#Software-Architecture-for-Natural-Disaster)

---

## Process for Ask Question

- I. With the help of dragzone, only one question image is uploaded to the system.
- II. The question loaded using the image to text ML function is translated into relative text.
- III. Using the Text Classify ML function, the type of the text of the problem is detected.
- IV. Question details are received from the user.
- V. Share question button is clicked.
- VI. Question image is uploaded to firebase storage:Creating a folder named FileID. The FileID was created as userId + Date.now () to be uniqe. Date.now () here is unique because it is taken in milliseconds.Inside the FileID folder there is both the question folder for the question and the answer folder for the answer. The purpose is to access all materials via FileID.At this point, the acquired information is FileId (questionId), userID, imageText, category ..
- VII. It sends everything until this process to the MongoDB database.The name of the database is simel.Inside the simel there is the question document. The document is the same as the table in MySQL.


### [Back To The Top](#Software-Architecture-for-Natural-Disaster)

---

## Authentication


### [Back To The Top](#Software-Architecture-for-Natural-Disaster)
---

## Storage


### [Back To The Top](#Software-Architecture-for-Natural-Disaster)
---


## Techonologies & Languages

- Java ( programming language )


### [Back To The Top](#Software-Architecture-for-Natural-Disaster)

---



