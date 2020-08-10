import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import { Typography } from '@material-ui/core';
const alanKey =
  '20bfd3602f1718c74c4dc4759c122fba2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  //useEffect takes two things callback func and dependency array
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText('Please try again');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening the article..');
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
        ></img>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <div className={classes.footer}>
        <Typography variant="body1" component="h2">
          Created by:-
          <a
            className={classes.link}
            href="https://www.linkedin.com/in/vivek-panchal-/"
          >
            Vivek Panchal
          </a>
        </Typography>
        {/* <img
          className={classes.image}
          src={logo}
          height="50px"
          alt="JSMastery logo"
        /> */}
      </div>
    </div>
  );
};
export default App;
