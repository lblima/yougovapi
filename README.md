# YouGov Teams Api:

This API is a list of premier league football teams. This is the dataset to be used during this exercise. There's no database implementation, only a in memory cache using **node-cache**

There is a endpoint **/teams** where we can return the full dataset or an individual by passing the name of the team. Also we are able to add and update teams.

**endpoints**

get: /api/v1/teams/:team_name 

*- return one team by name. If there's no such team, the return will be 404*

get: /api/v1/teams 

*- return all teams*

post: /api/v1/teams 

*- add one team to the list. If the team already exists, return 400: {"This team already exists"}*

put: /api/v1/teams 

*- update one team of the list **(only the image)**. If the team do not exists, return 404: {"Team not found"}*

**Authorization**

In order to acccess the API we should pass a Bearer Token with the value: **yougovToken**

### How to test it

yarn test

### How to run it

yarn start
