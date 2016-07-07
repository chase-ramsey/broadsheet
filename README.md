# Broadsheet

**Broadsheet** is a simple news aggregator that fetches RSS data from a handful of preselected media outlets and renders them in an easy-to-browse layout. Users can create profiles, subscribe to any of the preselected feeds the app provides, add new feeds using the RSS subscribe links for any outlet of their choice, save articles for later reference, and talk with other users about interesting stories.

### Run

##### Basic setup
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

##### CORS
Because Broadsheet operates entirely on the front-end, there are some issues with cross-origin resource sharing when making requests for RSS data. In order for these requests to go through, you'll have to install an extension in your browser that adds the appropriate headers to whitelisted addresses. For Chrome, I recommend the [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) plugin, which allows you to save template addresses to add these headers to. Once installed, click on the extension at the top of the browser, and in the dropdown, enable the extension, and save the following templates:
  * https://*/rss
  * https://*/feed

These two templates will allow requests to all of the preselected feeds and most unique user feeds without interrupting any requests to Firebase. However, you may find that with some user unique feeds, additional address templates may need to be added to the extension to allow all requests. If you're having issues with this, please feel free to reach out to me.

### Features

##### Latest news
When you first load the app, Broadsheet sends requests for RSS data from 16 popular news outlets representing several different topics, from news and culture to music and videogames. Only the 10 latest articles for each outlet are returned, however, so you're not overwhelmed with hundreds stories to comb through. You can **refresh** this feed using the link in the navbar, and it automatically refreshes every time you navigate back to the "Latest news" page from "Your news".

The title of each article is linked to the original story, so clicking on it will launch another tab with the source article in its original context. Clicking on the body of an article will also bring up the article's "spotlight view", which displays any extra descriptive content or images provided by the RSS feed and allows you to save the article to your profile or comment on the story (you can only do these last two if you have already created a profile and logged in).

##### Filtering news
There are a few different options for filtering the results. From the navbar, you can click the **Topics** link to see a dropdown of topics to view. You can also click on the **publication title** ("Kill Screen", for example), and only the results from that outlet will be shown. The **search** box in the navbar matches your keyword searches with article titles, author names, publication titles, text content from the RSS item description, and user comments.

##### Your news
After creating a profile and logging in, you'll have access to a news feed that you can curate yourself by selecting from some of the default feeds provided by the app and providing new RSS feeds from your own favorite media outlets. You can access your news by clicking on the **Your News** link in the navbar.

If you haven't subscribed to any of your own feeds yet, the app will prompt you to do so when you first access your news. Each of the default RSS feeds will be listed for you to choose from, and you can also add your own favorite feeds by clicking on the **Add new** link on this screen. Enter your title for the feed (this is not necessarily the publication title that will appear when articles are fetched), paste in the RSS link, select a topic from the dropdown, and submit the form to add a new feed. After you subscribe to your initial feeds, you can access this screen again by clicking the **Add more feeds** link in the navbar when browsing your news.

If subscribe to some feeds initially that you decide later you no longer want to follow, simply click the **Unsubscribe** link in the navbar while browsing your news, and you can select the feeds you don't want to see anymore.

##### Saving articles

When looking at a story in spotlight view, a button appears at the top of the story card that allows you to save the article. Saved articles appear after clicking the **Saved** link in the navbar under the "Your news" section of the site. Navigating here will also allow you to **Unsave** previously saved articles. You can save articles from either the "Latest news" or the "Your news" sections of the site.

##### Commenting
Commenting is just as simple as it looks: when in an article's spotlight view, type a new comment in the text input below the box where comments are displayed, and submit the comment. Your comments and comments from other users appear in real-time, so you can always see what others are saying about articles you're interested in. Remember though, when an article is no longer one of the 10 latest from the outlet it's fetched from, your comments on that article will no longer be accessible. To save your conversation on a story, be sure to save the article. Then you and anyone else who has saved the article can continue talking.

### Contact me
As you're checking out the app, I'd love to hear any comments, suggestions, or issues you have. Broadsheet is still very much a work-in-progress, and user feedback is invaluable as I continue honing the app's functionality and layout. The best way to reach out about Broadsheet is at my Github repository [here](https://github.com/chase-ramsey/codename-mercury).

Thanks for giving Broadsheet a try, and don't be a stranger!
