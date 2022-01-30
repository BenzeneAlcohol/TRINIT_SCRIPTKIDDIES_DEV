# 
# Bug Tracking System

As a part of this TRI-NIT Hackathon, we decided to take up the 2nd dev task, which is to build a robust bug tracking system. 

Our bug tracking system is comprised of 2 major parts: The bugs themselves, and the teams. We aim to cater the actual professional developers through this project, for example an enterprise could use this project to its fullest potential, that is why we decided to focus more on the teams aspect of this system.

Basically, if a bug has to be reported, the user should either be in a team, or a new team will be created for the bug to be handled.

Link to the submission document: https://drive.google.com/file/d/13Mzb55Ra_2TLZcetGbk7zuuhUZFDaFDD/view?usp=sharing

Link to the video: https://drive.google.com/file/d/10_04LLhXIA6Cpp-A9vOIkqgzRWhjDVGO/view?usp=sharing


## Installation

Clone the repo

```bash
git clone https://github.com/BenzeneAlcohol/TRINIT_SCRIPTKIDDIES_DEV.git
```
cd into the folder and install all the dependences

```bash
cd TRINIT_SCRIPTKIDDIES_DEV
npm install
```

Once all the dependencies are installed, cd into the source folder and create a .env file from the sample env file given in this repo. [Create env file inside the source folder] Then, run node app.js

If you are running mongoDB locally, make sure to run "mongod" command in your terminal before you proceed.


```bash
cd src 
nodemon app.js
```

## Tech Stack used

Backend: Node JS + MongoDB

Frontend: EJS

Cloudinary, for storing images



# Explanation

## Teams

Teams can be imagined as companies. Companies that have many employees, and to this company, you can report your bugs. Any user in the platform can report bugs to any team, but only the members of that specific team will be able to resolve the bugs.

The My Teams section first shows the teams that the curent user is included in, and then in another section also shows all the teams in the organization.

To create a bug, one has to go through a team, because thats what makes the most sense. A user can go to the teams section, select which team he thinks the bug belongs to, and report the bug to that section.

## Bugs

Every bug in our system has the following properties:
 * Title
 * Description
 * Image of the issue
 * Priority: This determines to which level of users will be bug be assined to. Naturally, a high priority bug is something is important both in time and in its value. Hence, it should be allocated to the highest level of user, which is "expert". 
 So, a `Nominal` bug is assigned to `Beginner`. 

 So, an `Important` bug is assigned to `Intermediate`. 

 So, a `Critical` bug is assigned to `Expert`. 

  * Status: Whether the bug has been fixed, or is in progress, or has not been assigned at all.
  * Assignee: To whom the bug has been assigned to.
  * Team: To which team the bug has been assigned to.

## Discussions

Discussions play a very major role in fixing or building anything in a development environment. Similar to how github has issues, pull requests and basically forums everywhere, we have one as well.

The team members can talk on the bug, how to fix it, why it is casued etc. It is just like a forum, with different threads for different issues.

## User

Users are always the central point of any application. Here, the users are also the "Bug solvers" as well as the reporters. 

Any user from any team can report bugs to any team. However, only the users added to that specific team can SOLVE the bug, and be assigned the bugs and so on.

**One very important highlight in our application is that the same user can be at multiple roles in different organizations. For instance, one user may be well versed in Cyber security, but not as good in Java. So, he will be an expert in the cyber sec team, while just a beginner in the java team. So, the roles are not characterestic to the user alone, but it is linked to the team in which the user belongs to.**
## FAQ

#### Can every member of the team see all the bugs?

No, only the corrosponding levels of the users can see the bugs. As mentioned in the bugs section, a very strict hierarchy is followed. 

#### Who and how can someone assign bugs and add team members?

An Expert can assign bugs to the below two levels, and can add team members as one of the three roles as well. By default, if someone creates a team he is an expert **in that team**.

## Screenshots

![image](https://user-images.githubusercontent.com/75667393/151686473-80548461-9976-406b-94b8-c0de90a0f3dc.png)

![image](https://user-images.githubusercontent.com/75667393/151686483-1cadf1c9-48e1-499f-99c9-d6f07806fba5.png)

![image](https://user-images.githubusercontent.com/75667393/151686487-9ccd86d2-ad68-41aa-a748-9dab6a90f25d.png)

![image](https://user-images.githubusercontent.com/75667393/151686497-9bf3ae72-154a-44d6-9bc0-2ead0b4380b1.png)

![image](https://user-images.githubusercontent.com/75667393/151686499-4582638d-0de2-4539-b365-20883378a296.png)



