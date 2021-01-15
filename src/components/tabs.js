import axios from "axios";
const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //
  const topicsContainer = document.createElement("div");
  topics.forEach((topic) => {
    let tab = document.createElement("div");
    tab.classList.add("tab");
    tab.textContent = topic;
    topicsContainer.appendChild(tab);
  });
  console.log(topicsContainer);
  return topicsContainer;
};

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  const tabsContainer = document.querySelector(selector);
  axios
    .get("https://lambda-times-api.herokuapp.com/topics")
    .then((res) => {
      const topicsData = res.data.topics;
      // topicsData.console.log(res.data.topics);
      const tabsHeader = document.querySelector(selector);
      tabsHeader.appendChild(Tabs(topicsData));
    })
    .catch((err) => {
      console.log(err);
    });
};

export { Tabs, tabsAppender };
