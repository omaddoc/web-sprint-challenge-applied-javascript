import axios from "axios";
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const authorPhoto = document.createElement("img");
  const authorName = document.createElement("span");

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  headline.textContent = article.headline;
  authorPhoto.src = article.authorPhoto;
  authorName.textContent = `By ${article.authorName}`;

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(authorName);
  imgContainer.appendChild(authorPhoto);

  function logHeadline() {
    console.log(headline);
  }

  card.addEventListener("click", logHeadline);
  // console.log(card);
  return card;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  // console.log(Card);
  const cardContainer = document.querySelector(selector);
  axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((res) => {
      const articles = res.data.articles;
      const articleKeys = Object.keys(articles);
      // console.log(articleKeys);

      articleKeys.forEach((element) => {
        let pHolder = element;
        for (const key in articles[pHolder]) {
          // console.log("Javascript?", pHolder);
          const element = articles[pHolder][key];
          cardContainer.appendChild(Card(element));
        }
      });

      // for (const key in articles.bootstrap) {
      //   const bootstrap = articles.bootstrap[key];
      //   cardContainer.appendChild(Card(bootstrap));
      // }
      // for (const key in articles.javascript) {
      //   const javascript = articles.javascript[key];
      //   cardContainer.appendChild(Card(javascript));
      // }
      // for (const key in articles.jquery) {
      //   const jquery = articles.jquery[key];
      //   cardContainer.appendChild(Card(jquery));
      // }
      // for (const key in articles.node) {
      //   const node = articles.node[key];
      //   cardContainer.appendChild(Card(node));
      // }
      // for (const key in articles.technology) {
      //   const technology = articles.technology[key];
      //   cardContainer.appendChild(Card(technology));
      // }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { Card, cardAppender };
