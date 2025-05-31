document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const categorySelect = document.getElementById("categorySelect");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const filterBtns = document.querySelectorAll(".filter-btn");
  
    function createTaskElement(text, category) {
      const li = document.createElement("li");
      li.setAttribute("data-category", category);
  
      // Task text and completion
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
      });
  
      // Task content
      li.innerHTML = `
        <span>
          ${text}
          <span class="category-tag ${category}">${category}</span>
        </span>
        <button class="remove-btn">Remove</button>
      `;
  
      // Remove button
      li.querySelector(".remove-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
      });
  
      return li;
    }
  
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      const category = categorySelect.value;
  
      if (taskText === "") return;
  
      const taskElement = createTaskElement(taskText, category);
      taskList.appendChild(taskElement);
      taskInput.value = "";
    });
  
    // Enter key = Add
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTaskBtn.click();
    });
  
    // Filter functionality
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
  
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
  
        const allTasks = taskList.querySelectorAll("li");
        allTasks.forEach(task => {
          if (category === "all" || task.getAttribute("data-category") === category) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
      });
    });
  });
  