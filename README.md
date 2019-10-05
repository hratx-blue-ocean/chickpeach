# Chickpeach

Chickpeach is your one stop meal planning, recipe discovery and grocery-management app. The app is able to be configured to several dietary restrictions and preferences, and can also be scaled to accommodate meal-planning for more than one person. Don't like bananas? They won't show up anywhere in your menu, or in search results. Once you've selected the recipes you'd like to cook in a week, the app will auto generate a shopping list. Chickpeach is fully responsive and can be taken on the go, or browsed as a rich desktop experience. 

## In Action

[Live demo]()

[SCREENSHOTS AND VIDEOS GO HERE]

# User Stories
We worked with a lot of feedback at every stage of this project, here are the user stories we decided to explore:

## Implemented:
- As a user, I want to plan my meals for the week so that I can eat nutritious, well-portioned meals.
- As a user, I want to declare my dietary restrictions so that recipes are filtered appropriately.
- As a user, I want to input the number of meals I intend to prepare for the week.
- As a user, I want my meal plans and favorites to be saved.
- As a user, I want a simple, clean UI.
- As a user, I want to search a variety of recipes so that I can explore new cuisines.
- As a user, I want to be able to directly add recipes from a search to my favorites.
- As a user, I want to filter recipes by dietary restrictions.
- As a user, I want to browse favorites so that I can make quick selections.
- As a user, I want to view the nutritional facts of my meals.
- As a user, I want an automatically generated grocery list so that I can be a smart shopper. 
- As a user, I want to be able to log in as a guest so that I can immediately use the application.
- As a user, I want to be able to navigate the site without sight and know what section of the site I am on.

## Coming Soon:
- As a user, I want to create and save my own recipes.
- As a user, I want to be able to login from any device to view my meals.
- As a user, I want to be able to post my recipes on social media so that I can share with friends.

# Stack

<table>
  <tr>
  </tr>
  <tr>
    <td align="center">Frontend</td>
    <td align="center">Backend</td>
    <td align="center">Deployment</td>
    <td align="center">APIs</td>
  </tr>
  <tr>
    <td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" title="React" width="80px"/></td>
    <td align="center"><img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" alt="Node.js" title="Node.js" width="60px"/></td>
    <td align="center"><img src="https://www.docker.com/sites/default/files/social/docker_facebook_share.png" alt="Docker" title="Docker" width="60px"/></td>
    <td align="center"><img src="https://d2.alternativeto.net/dist/icons/spoonacular_65983.png?width=200&height=200&mode=crop&upscale=false" alt="Spoonacular" title="Spoonacular" width="60px"/></td>
  </tr>
  <tr>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/react-router.svg" alt="React Router" title="React Router" width="70px"/></td>
    <td align="center"><img src="https://buttercms.com/static/images/tech_banners/ExpressJS.png" alt="Express" title="Express" width="60px"/></td>
    <td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" alt="AWS" title="AWS" width="60px"/></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/42357678?v=4" alt="Firebase Authentication" title="Firebase Authentication" width="60px"/></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="Redux" title="Redux" width="60px"/></td>
    <td align="center"><img src="https://www.elearningworld.org/wp-content/uploads/2019/04/MySQL.svg.png" alt="MySQL" title="MySQL" width="60px"/></td>
    <td align="center"><img src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" alt="Nginx" title="Nginx" width="60px"/></td>
  </tr>
  <tr>
    <td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Grommet-icon.svg/1024px-Grommet-icon.svg.png" alt="Grommet" title="Grommet" width="60px"/></td>
  </tr>
</table>

## Front-End
Although we lifted some components from the Grommet library, the majority of the styling is custom in order to match the [wireframes](https://www.figma.com/file/JnKGDEIyFEjL456ZDV97XL/chickpeach?node-id=5643%3A3615) we had designed. We were aso fans of Grommet's built in accessibility features. React Router was used to managed routes, and state is managed using Redux. Persistence is maintained at the browser level, but we will be moving it to the account level at a later date. 

## Back-End 
Users, preferences, favorites and recipes had to be tracked in our database. Additionally, because of how the Spoonacular api is structured, recipes were broken down into general info, nutrition, ingredients and steps. We chose to implement a relational database to both handle complex queries and reduce the amount of duplicated data. MySql was a great option for this, and the the MySql npm packages helped us easily design queries. The server was built on express.

## Deployment
As we were split into different teams, we manged deployment through working partitions (usually front-end and back-end) of Docker images. We then deployed on AWS EC2 using PM2 to keep our server running and routed traffic with the help of NGINX.

## APIs
We used the Firebase Auth API for authentication. For recipes, we found Spoonacular's API to be the most comprehensive.

# Work Flow

This project was manged using the git workflow:
[INSERT GIF/VIDEO]

We chose to have one development branch that would brand specific features. WHen they are ready to be deployed, features are deployed as follows:

1. The branch is rebased to consolidate commit history and ensure only working code is pushed to the dev branch.
2. The branch is pushed 
3. A pull request is made
4. Another member of the team is to perform a review before merging the branch into developer. 
5. At the end of a sprint, the developer branch is merged into production.

In addition to git, we also used trello to manage pending tasks, bugs and feedback.

# Coming Soon

This repo contains our first release. Here are the features we are currently working on:

- User generated recipes
- Calendar view for cook planning
- Tie state persistence to account, not browser
- Login with Google

# Get started

Take the following steps to run the app in your localhost, you will need to have the following:
- MySQL should be running on your machine
- You will need to register for a [Spoonacular api key](https://spoonacular.com/food-api/)

From your MySql shell:
```
source [PATH TO ROOT/db/schema.sql]
```

From terminal in the index folder:
```
npm install
npm run compile
npm start
```

# Challenges & Learnings
This is a project created by a group of friends all trying to fill a gap that we saw in many popular meal-planing apps. This app was also an opportunity for us to learn, as at the time of this writing we are a team of passionate new developers. Here are some of the learnings we've had so far:

## Challenges
- We all approached the project with a new technology to implement, and tried to do so in it's early stages. We've learned lessons on how to assess an entire tech stack before beginning to implement it. 
- On the front end, we planned to build and then add state management later. Eventually we had to refactor all of our React components to be stateless in order to work with hooks and redux. A more productive strategy would have been to start with redux and hooks, and build from that convention instead of refactoring.
- On the back-end, we had tried to use GraphQL but quickly realized it didn't make sense for us at the current scale. In this, we learned to apply the technology to the use case, and not simply add complexity for the sake of learning new technology or to greatly scale down the line. 

## Learnings
- The importance of planning is reinforced daily in our workflow. Between detailed wireframes on Figma and a detailed trello board, we were able to stay relatively organized. 
- Pair programming was a big part of building Chickpeach. Although it did slow us down a bit, the code pushed from pairs was visibly more accurate and concise.
- Good communication between stakeholders, the team, and user testing was a boon for development. As developers, we were able to articulate the direction of where the app was going and properly manage stakeholder expectations against user feedback and developer input.

## Potential Improvements
- We may benefit from dividing sprints into specific features instead of splitting our team into traditional (front-end/back-end) roles. As we're all full-stack developers, an iterative approach may have allowed us to develop more consistently. In our experience so far, with one team working on front-end and the other on back-end, we found ourselves waiting on each-other as well as in situations where we lost familiarity with the other side of the code base and had to spend more time catching up. 
- In the future, we will be extending our UI mockup to also include data flow between apps. 

# Contributors

[John Connolly](https://github.com/jkcryptolock), [Arohan Dutt](https://github.com/ArohanD), [Gibran Iqbal](https://github.com/Jibbscript), [Julia Kim](https://github.com/jxkim), [Whitney Lee](https://github.com/wiggitywhitney), [Sean McCarthy](https://github.com/SeanMcCarthy3223), [Jeff Salinas](https://github.com/JeffSalinas)