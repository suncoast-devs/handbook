---
title: Who works here?
tags: ['javascript', 'react']
---

Over the last six weeks, you have learned many concepts about front-end
development. To demonstrate how far you have come, I want you to build an
Employee Directory. For `Explorer Mode`, this will be a site with three pages;
view all employees, add an employee, and view an employee. `Adventure Mode` adds
the features to delete and updating an employee.

## Objectives

- Use react-router-dom to build a multiple page SPA
- Create an API driven UI
- Practice the skills you have learned in the past six weeks.
- practice wireframing a new app

## Requirements

- Create a new `delta` stack project
- This [this api](https://sdg-staff-directory-app.herokuapp.com/index.html) to
  manage a company's list of employees. Check out `Additional Resources` for how
  to use the API.
- Create a relatively unique name for your company. You will use this as your
  company key when calling the endpoints of the API

### Setup

```shell
app-app --delta-hooks EmployeeDirectoryFrontEnd
```

### Explorer Mode

- Create a react app with three pages and navigation between the pages.s

  - View All Employees page
    - This page should list all the employees for your company
    - Each employee should display the employee's full name, job title,
      full-time status, and profile image. All employees that are returned
      by the `Get all employees endpoint`,
      `https://sdg-staff-directory-app.herokuapp.com/api/:companyName/employees`.
    - Each employee item should link to the `employee page` for that
      employee. The URL should look like: `/employee/:employeeId`
  - An Employee Page

    - This should display all the details for an employee, The details page
      should list the following:

      - full name
      - birthday
      - hired date
      - job title
      - job description
      - full address (address, city and zip)
      - Contact information (email, phone)
      - Emergency contact info
      - PTO hours
      - profile image

    - The API endpoint to use will look like this:
      `https://sdg-staff-directory-app.herokuapp.com/api/:companyName/employees/:employeeId`

  - Add an Employee Page
    - This should allow the user to add all of the fields for an employee.
    - The UI should let the user know that the person was added to the API
      successfully
  - Your app should be styled and responsive. Have fun with it.
  - Deploy your app

### Adventure Mode

- Add the ability to `delete` a user
- Add the ability to `update` a user

### Epic Mode

- You app currently only works for one company, but now add the ability to
  change companies.

## Additional Resources

### TIPS:

- This project is a typical weekend project, remember to plan, keep pace, and
  turn in however far you get on Sunday night.
- A good milestone for today would be
  - to have a wireframe for each completed
  - react-router-dom set up, including a component for each page, and be able to
    click to different pages
  - an understanding of the API
  - some HTML and CSS completed.
- The "profileImage" property is a URL to an image and should be treated as a
  string

### How to use the API

API Documentations:
[https://sdg-staff-directory-app.herokuapp.com/index.html](https://sdg-staff-directory-app.herokuapp.com/index.html)

- The use the API you will need to name your company for which you are making an
  employee directory. Your company name will serve as a unique key for your
  company. My fake company is called `honeydukes`. That means that I want to
  make an API call to get all of my employees, I will do a fetch to the URL.

```
https://sdg-staff-directory-app.herokuapp.com/api/honeydukes/employees
```

That will return me a list of employees that are apart of the company.

If I want to get a different company's (Boogle) employees. I would do

```
https://sdg-staff-directory-app.herokuapp.com/api/Boogle/employees
```

**For your project you will be using the same company for every request**

- To get an employee for that company, you will use the endpoint to get an
  employee. For me to get an employee of `honeydukes`, I would use the endpoint

`https://sdg-staff-directory-app.herokuapp.com/api/honeydukes/employees/3`

A GET request to the above URL will get the employee with the id of `3`, and
that works for `honeydukes`.

- To create an employee for a company, you will have to use the POST endpoint.
  If I wanted to add an employee for `honeydukes`, I will send a POST request
  this endpoint

```
https://sdg-staff-directory-app.herokuapp.com/api/honeydukes/employees/
```

with my data in this JSON format:

```{
  "firstName": "string",
  "lastName": "string",
  "birthday": "2019-06-06T16:48:57.256Z",
  "hiredDate": "2019-06-06T16:48:57.256Z",
  "isFullTime": true,
  "profileImage": "string",
  "jobTitle": "string",
  "jobDescription": "string",
  "phoneNumber": "string",
  "address": "string",
  "city": "string",
  "zip": "string",
  "state": "string",
  "salary": 0,
  "gender": "string",
  "email": "string",
  "emergencyContactPerson": "string",
  "emergencyContactPhone": "string",
  "emergencyContactAddress": "string",
  "ptoHours": 0,
}
```
