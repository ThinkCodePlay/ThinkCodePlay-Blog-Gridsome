---
title: "Let's make a React To Do List App"
date: "2021-06-13"
categories: 
  - "react"
  - "tutorial"
tags: 
  - "github"
  - "primereact"
  - "react"
---

In this tutorial we are going to to build a quick and simple to do React to do list app. I will use PrimeReact creating the grid and using its built in styles and functionality.

You can see the live example on on my [GitHub pages](https://thinkcodeplay.github.io/resume-tracker-React.js) [](https://thinkcodeplay.github.io/resume-tracker-React.js/)and Source code on my [GitHub repo.](https://github.com/ThinkCodePlay/resume-tracker-React.js)

## Goals for this tutorial:

- Creating the app in React. As I'm still in the process of learning React, this is a good chance to get my hands dirty and program in React.
- Creating a table that can add, remove edit and export the data to a csv file.
- The data should persist even after refreshing or closing the browser.
- Upload this to git hub pages for anyone to use.

## Creating our To Do List app

Lets start with building the app with npm

```powershell
npx create-react-app to-do-list
```

We will be using some npm modules so lets start with installing them

```powershell
npm install primereact --save
npm install primeicons --save
npm install react-transition-group
npm install gh-pages --save-dev
```

PrimeReact, Primeicons and react-transition-group are all installed so we can use the primeReact open source library. For mode detail check out their [documentation page](https://www.primefaces.org/primereact).

gh-pages is used so that we can later deploy our react app to GitHub pages.

## Creating our components

We will create to components to build our page.

First component will be the header of the page. Second component will contain the list to display and an add button.

I created a folder components and under it **Header.js**, **Header.css**, **List.js** and **List.css**.

In App.js I imported the components to the file and set the CSS styles for primereact.

```javascript
import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Header from "./Components/Header";
import List from "./Components/List";

import PrimeReact from "primereact/api";

function App() {
  PrimeReact.ripple = true;

  return (
    <div className="layout">
      <Header />
      <List />
    </div>
  );
}

export default App;
```

## Header Component

In the Header component a created a header text with an animation when the app starts up a gradient background, and clip-path to style the header a bit.

```javascript
import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">To Do List</span>
          <span className="heading-primary-sub">Never Forget Again</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
```

```css
.header {
  height: 30vh;
  background-image: linear-gradient(to right bottom, #7ed56f9f, #28b4858e);
  background-size: cover;
  background-position: top;
  clip-path: polygon(0 0, 100% 0, 100% 20vh, 0 100%);
  position: relative;
}

.text-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  text-align: center;
}

.heading-primary {
  color: rgb(0, 0, 0);
  text-transform: uppercase;

  backface-visibility: hidden; /* stopes shaking in animations */
  margin-bottom: 60px;
}

.heading-primary-main {
  display: block;

  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}

.heading-primary-sub {
  display: block;
  font-size: 20px;
  font-weight: 700;

  animation: moveInRight 1s ease-out;
}

@keyframes moveInLeft {
    0% {
        opacity: 0;
        transform: translateX(-100px);
    }

    80%{
        transform: translateX(10px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes moveInRight {
    0% {
        opacity: 0;
        transform: translateX(100px);
    }

    80%{
        transform: translateX(-10px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
```

## List Component

In List.js we import the following to the project and created the table with each field defined by a template. Here's the code I implemented, I will break it down after in more detail.

```javascript
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const List = () => {
  const dt = useRef(null);

  const localStorageRows = localStorage.getItem("rows");
  let rowsAsObject = JSON.parse(localStorageRows);
  if (!rowsAsObject) {
    rowsAsObject = [];
  }

  const [rows, setRows] = useState(rowsAsObject);

  const createNewApplication = () => {
    return {
      id: Math.random() * 100000,
      company: "",
      date: "",
      time: "",
      title: "",
      url: "",
      status: "",
    };
  };
  const addNewRow = () => {
    console.log(...rows);
    setRows((prevRows) => [...prevRows, createNewApplication()]);
  };
  const onEditorValueChange = (props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setRows(updatedProducts);
    localStorage.setItem("rows", JSON.stringify(rows));
  };
  const inputTextEditor = (props, field) => {
    return (
      <div className="sizes">
        <InputText
          className="p-inputtext-sm p-d-block p-mb-2"
          type="text"
          value={props.rowData[field]}
          onChange={(e) => onEditorValueChange(props, e.target.value)}
        />
      </div>
    );
  };
  const taskEditor = (props) => {
    return inputTextEditor(props, "task");
  };
  const dateEditor = (props) => {
    return inputTextEditor(props, "date");
  };
  const timeEditor = (props) => {
    return inputTextEditor(props, "time");
  };
  const commentEditor = (props) => {
    return inputTextEditor(props, "comment");
  };
  const statusEditor = (props) => {
    return inputTextEditor(props, "status");
  };
  const deleteRow = (rowData) => {
    const newRows = rows.filter((x) => x.id !== rowData.id);
    setRows([...newRows]);
    localStorage.setItem("rows", JSON.stringify(newRows));
  };
  const deleteTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        iconPos="left"
        onClick={() => deleteRow(rowData)}
      />
    );
  };

  const exportCSV = (selectionOnly) => {
    console.log(dt.current);
    dt.current.exportCSV({ selectionOnly });
  };

  const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file-o"
        onClick={() => exportCSV(false)}
        className="p-mr-2"
        data-pr-tooltip="CSV"
      />
    </div>
  );

  return (
    <div className="center">
      <div className="table">
        <DataTable
          value={rows}
          className="p-datatable-gridlines"
          header={header}
          ref={dt}
        >
          <Column field="task" header="Task" editor={taskEditor}></Column>
          <Column field="date" header="Date" editor={dateEditor}></Column>
          <Column field="time" header="Time" editor={timeEditor}></Column>
          <Column field="status" header="Status" editor={statusEditor}></Column>
          <Column field="comment" header="Comment" editor={commentEditor}></Column>
          <Column field="delete" header="" body={deleteTemplate}></Column>
        </DataTable>
        <Button
          label="Add New Application"
          className="p-button-raised"
          onClick={addNewRow}
        />
      </div>
    </div>
  );
};
export default List;
```

For the data to persist we store the data in the browsers localSession when a cell was edited, and load it when it the page starts up:

```javascript
  const localStorageRows = localStorage.getItem("rows");
  let rowsAsObject = JSON.parse(localStorageRows);
  if (!rowsAsObject) {
    rowsAsObject = [];
  }

  const onEditorValueChange = (props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setRows(updatedProducts);
    localStorage.setItem("rows", JSON.stringify(rows));
  };
```

To add a new row we created an add row function by concatenating the data using the spread operator:

```javascript
  const createNewApplication = () => {
    return {
      id: Math.random() * 100000,
      company: "",
      date: "",
      time: "",
      title: "",
      url: "",
      status: "",
    };
  };
  const addNewRow = () => {
    console.log(...rows);
    setRows((prevRows) => [...prevRows, createNewApplication()]);
  };
```

And finally to export the data we added to the data table header a button to export the data as csv:

```javascript
  const exportCSV = (selectionOnly) => {
    console.log(dt.current);
    dt.current.exportCSV({ selectionOnly });
  };

const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file-o"
        onClick={() => exportCSV(false)}
        className="p-mr-2"
        data-pr-tooltip="CSV"
      />
    </div>
  );
```

## Deploying to GitHub pages

In order for us to deploy the app to GitHub pages, we will add the site homepage to **package.json**

```json
  "homepage": "https://thinkcodeplay.github.io/to-do-list/",
```

and two new scripts:

```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
```

After creating a repository on GitHub hook up the local git with the remote repo on GitHub:

```powershell
git remote add origin https://github.com/<Your Account Name>/<You Repo Name>.git
```

And finally deploy the app

```powershell
npm run deploy
```

Now you can find the app on at the repos GitHub pages: [https://thinkcodeplay.github.io/to-do-list/](https://thinkcodeplay.github.io/resume-tracker-React.js/)

## Conclusion

In this tutorial you learned how to create a react app, use reactPrime components, save the data on localSession and publish the page on GitHub pages.

Find something interesting in this article? leave a comment below.
