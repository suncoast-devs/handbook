# Who works here?

Over the last 6 weeks, you have learn many concepts about front-end development. To demostrate how far you have come, I want you to build an Employee Directory. For `Explorer Mode`, this will be a site with 3 pages; view all employees, add an employee, and view an employee. `Adventure Mode` adds delete and updating an employee.

## Objectives

- Use react-router-dom to build a multiple page SPA
- Create an API driven UI
- Practice the skills you have learned the past 6 weeks.
- practice wireframing a new app

## Requirements

- Create a new `gamma` stack project
- Add react-router-dom and set up 3 pages
- This [this api](https://sdg-staff-directory-app.herokuapp.com/swagger/index.html) to manage a company's list of employees. Check out `Additional Resources` for how to use the API.
- Create a relatively unique name for your company. You will use this as your company key when calling the endpoints of the API

### Explorer Mode

- [ ] Create a react app with 3 pages and navigation between the pages.s
  - [ ] View All Employees page
    - [ ] This page should list all the employees for your company
    - [ ] Each employee should display all the details for an employee that is returned by the `Get all employees endpoint`, [https://sdg-staff-directory-app.herokuapp.com/api/\${companyName}/employees](https://sdg-staff-directory-app.herokuapp.com/api/${companyName}/employees).
    - [ ] Each employee item should link to the `employee page` for that employee. The url should look like: `/employee/${employeeId}`
  - [ ] An Employee Page
    - [ ] This should display all the details for an employee, All the details that are on a employee should be listed on the page.
    - [ ] The API endpoint to use will look like this:[https://sdg-staff-directory-app.herokuapp.com/api/\${companyName}/employees/\${employeeId}].
  - [ ] Add a Employee Page
    - [ ] This should allow the usre to add all of the fields for an employee.
    - [ ] The UI should let the user know that the person was added to the API successfully
  - [ ] Your app should be styled and responsive. Have fun with it.
  - [ ] Deploy your app

### Adventure Mode

- [ ] Add the ability to `delete` a user
- [ ] Add the ability to `update` a user

### Epic Mode

- [ ] You app current only works for one company, but now add the ability to change companies.

## Additional Resources

### TIPS:

- This is a typical weekend project, remember to plan, keep pace and turn in how ever far you get on Sunday night.
- A good milestone for thursday would be
  - to have a wireframe for each completed
  - react-router-dom set up, including a component for each page, and be abel to click to different pages
  - an understanding of the API
  - some html and css done.

### How to use the API

API Documentations: [https://sdg-staff-directory-app.herokuapp.com/swagger/index.html](https://sdg-staff-directory-app.herokuapp.com/swagger/index.html)

- The use the API, you will need to name your company for which you are making an employee directory for. This will serve as the unique key for your company. My fake company is called `fakebook`. That means that I want to make an API call to get all of my employees, I will do a fetch to the url.

```
https://sdg-staff-directory-app.herokuapp.com/api/fakebook/employees
```

That will return me a list of employees that are apart of the company

If I want to get a different company's (Boogle) employees. I would do

```
https://sdg-staff-directory-app.herokuapp.com/api/Boogle/employees
```

**for your project you will using the same company for every request**

- To get an employee for that company, you will use the end point to get an employee. For me to get an employee of `fakebook` I would use the endpoint

`https://sdg-staff-directory-app.herokuapp.com/api/fakebook/employees/3`

A GET request to the above url, will get the employee with the id of `3`,and that works for `fakebook`.

- To create an employee for a company, you will have to use the POST endpoint. If I wanted to add an employee for `fakebook`, I will send a POST request this endpoint

```
https://sdg-staff-directory-app.herokuapp.com/api/fakebook/employees/
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

## Preview.

- On Monday we start learning SQL. [Read this as a preview](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-sql/)
