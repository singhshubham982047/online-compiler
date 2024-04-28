import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  code: {
    html: string;
    css: string;
    javascript: string;
  };

  currentLang: "html" | "css" | "javascript";
}

const initialState: InitialStateType = {
  code: {
    html: `<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>To-Do List</title>
      <link rel="stylesheet" href="styles.css">
   </head>
    <body>
        <div class="container">
            <h1>To-Do List</h1>
            <input type="text" id="taskInput" placeholder="Enter a task">
            <button onclick="addTask()">Add Task</button>
            <ul id="taskList"></ul>
        </div>

        <script src="script.js"></script>
    </body>
</html>

    `,
    css: `body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: darkgray;
  }
  
  .container {
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: gray;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
      text-align: center;
  }
  
  input[type="text"] {
      width: 70%;
      padding: 10px;
      margin-bottom: 10px;
  }
  
  button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  
  button:hover {
      background-color: #45a049;
  }
  
  ul {
      list-style-type: none;
      padding: 0;
  }
  
  li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
  }
  
  li:last-child {
      border-bottom: none;
  }
  `,
    javascript: `function addTask() {
      var taskInput = document.getElementById("taskInput");
      var taskList = document.getElementById("taskList");
      
      // Check if the input field is not empty
      if (taskInput.value.trim() !== "") {
          // Create a new list item
          var li = document.createElement("li");
          li.textContent = taskInput.value;
          
          // Add the new item to the list
          taskList.appendChild(li);
          
          // Clear the input field
          taskInput.value = "";
      } else {
          alert("Please enter a task!");
      }
  }
  `,
  },
  currentLang: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLang: (
      state,
      action: PayloadAction<InitialStateType["currentLang"]>
    ) => {
      state.currentLang = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.code[state.currentLang] = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLang, updateCodeValue } = compilerSlice.actions;
