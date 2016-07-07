# Broadsheet

**Broadsheet** is a simple news aggregator that fetches RSS data from a handful of preselected media outlets and renders them in an easy-to-browse layout. Users can create profiles, subscribe to any of the preselected feeds the app provides, add new feeds using the RSS subscribe links for any outlet of their choice, save articles for later reference, and talk with other users about interesting stories.

### Run
After forking the repository, you'll need to get Bower and NPM initialized in the project root folder. Then, use ```bower install``` and ```npm install``` to install the developer dependencies that will allow the app to run.

Here's a list of the dependencies used on this project:

via Bower -
  * [AngularJS](https://angularjs.org/)
  * [Angular-filter](https://github.com/a8m/angular-filter)
  * [Angular-route](https://github.com/angular/bower-angular-route)
  * [Angular-sanitize](https://github.com/angular/bower-angular-sanitize)
  * [Firebase](https://github.com/firebase/firebase-bower)
  * [Bootstrap](https://github.com/twbs/bootstrap)
  * [MomentJS](http://momentjs.com/)

via NPM -
  * [http-server](https://www.npmjs.com/package/http-server)

After the dependencies are installed, running the command ```npm run start``` in your terminal will serve the app locally at [http://localhost:8080](http://localhost:8080).

### Features

##### Latest news
When you first load the app, **Broadsheet** sends requests for RSS data from 16 popular news outlets representing several different topics, from news and culture to music and videogames. Only the 10 latest articles for each outlet are returned, however, so you're not overwhelmed with hundreds stories to comb through. You can **refresh** this feed using the link in the navbar, and it automatically refreshes every time you navigate back to the "Latest News" page.

##### Filtering news
There are a few different options for filtering the results. From the navbar, you can click the **Topics** link to see a dropdown of topics to view. You can also click on the **publication title** ("Kill Screen", for example), and only the results from that outlet will be shown. The **search** box in the navbar matches your keyword searches with article titles, author names, publication titles, text content from the RSS item description, and user comments.


