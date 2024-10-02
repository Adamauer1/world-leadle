# World Leadle

This is a wordle like game where the goal is to guess the world leader based on the image of them.

This website is made with next.js and react. It is using the mantine component library. It is currently deployed with the url of worldleadle.com. It is deployed using amazon lightsail.

## Details

### Leaders

All information and images about the leaders are from wikipedia. The main list of leaders that are currently being used is in src/lib/data.ts. There may still be some errors with the leader informations or image links.

### Current Issues

* The way centuries are displayed
* Icons not displaying on mobile phones
* Tutorial secion is not clear enough (improve visuals on it)

### Future Plans

I am planning on adding more leaders but first I would like to figure out a good way to automate the process since it can be time consuming. I also would like to add google analytics.

## Local Deployment

In order to deploy locally you will have to clone the git page. Then use a terminal to run the following commands.

```
npm install

npm run dev
```

You will then be able to go to localhost:3000 in order to view the page.
