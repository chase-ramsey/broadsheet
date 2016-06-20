angular.module('app')
  .factory('ParseFactory', function(CreateService, $sanitize) {

    return {

      docParse: function(xml, articleTopic) {
        let returnObjects = [];
        let articles = [];
      // Get publication title
        const pubTitle = xml.querySelector('title').textContent;
      // Get articles by 'item' or 'entry'
        if (xml.getElementsByTagName('item').length !== 0) {
          articles = Array.from(xml.getElementsByTagName('item'));
        } else if (xml.getElementsByTagName('entry').length !== 0) {
          articles = Array.from(xml.getElementsByTagName('entry'));
        }
      // Loop over each item/entry to get values for every article
        articles.forEach(function(article) {
        // Get article title
          const title = article.querySelector('title').textContent;
        // Get article author
          const author = (() => {
            if (article.getElementsByTagName('author').length !== 0) {
              return article.getElementsByTagName('author')[0].textContent;
            } else if (article.getElementsByTagName('creator').length !== 0) {
              return article.getElementsByTagName('creator')[0].textContent;
            } else {
              return '';
            }
          })();
        // Get article link
          const link = (() => {
            if (article.querySelector('link') === null) {
              console.log('link null on ', xml,   article);
              return '';
            } else if (article.querySelector('link').textContent === '') {
              return article.querySelector('link').getAttribute('href');
            } else {
              return article.querySelector('link').textContent;
            }
          })();
        // Get article date published
          const date = (() => {
            if (article.querySelector('pubDate') !== null) {
              return new Date(article.querySelector('pubDate').innerHTML).toISOString();
            } else if (article.querySelector('published') !== null) {
              return new Date(article.querySelector('published').innerHTML).toISOString();
            } else {
              return '';
            }
          })();
        // Get description
          const description = (() => {
            if (article.querySelector('description') !== null) {
              // var div = document.createElement('div');
              return $sanitize(article.querySelector('description').textContent);
            } else if (article.querySelector('content') !== null) {
              // var div = document.createElement('div');
              return $sanitize(article.querySelector('content').textContent);
            }
          })();

        // Add topic
          const topic = articleTopic;
        // Create new object with values and push them to the processedArticles array
          var articleObject = new CreateService.newArticle(title, author, link, description, date, pubTitle, topic);
          // console.log('articleObject: ', articleObject);
          returnObjects.push(articleObject);
        })
        return returnObjects;
      }

    }
  })
