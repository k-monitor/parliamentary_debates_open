# parldata_frontend

> **This site has moved to [parlamonitor.k-monitor.hu](https://parlamonitor.k-monitor.hu/).**
> parlament.k-monitor.hu now only serves a redirect to the new site; searches are
> carried over, e.g. `/parliamentary_debates_open?term=korrupció` lands on
> `/search?q=korrupció&cycle=all`. The React app below is no longer deployed — its
> source is kept here for reference.

This repository is for the frontend development of the parldata project.

Welcome to the Parliamentary Debates Open's frontend github repo. We are a bunch of people working on making Hungarian parliamentary speeches open. We are happy to see you here.

"Do you recall when Viktor Orbán said this and that? How was that exactly?" – This is the typical use case this project wants to address. The tool we are developing aims to make parliamentary speeches open and accessible covering Hungarian parliamentary debates since 1990. The scraped speeches (using Scrapy) are processed using Natural Language Processing (using Spacy), Elasticsearch is used for search backend. The minimal viable product is a filterable dashboard for name, party, and date, returning the relevant speeches. Additional features will include topics (using Gensim), top lists, histograms and comparisons.

If you are interested in an analysis we have made earlier, check out [this blog post in English](http://k.blog.hu/2017/12/05/the_language_of_the_hungarian_parliament_1990) or [this site in Hungarian.](http://k-monitor.github.io/) If you want to have a look at the raw data we downloaded for the sake of this project from parlament.hu click [here.](http://opendata.hu/dataset/parldata)

The backend associated with this project is available from K-Monitor upon request. If you need access to it, please contact us at info@k-monitor.hu.

Do you have experience in the listed technologies, you have free time and would you like to contribute? Contact us here on Github!


## Deploying the redirect

```bash
yarn build   # copies public/ into build/, adding 404.html for the old app's paths
yarn deploy  # builds and pushes build/ to the gh-pages branch
```

`public/` is the whole live site now: `index.html` (redirect + search-term mapping),
`service-worker.js` (unregisters the service worker the old app installed, so
returning visitors are not stuck on the cached app) and `CNAME`.


## Development

### Install development environment

```bash
nvm install 16  # Obtain node 16
nvm use 16  # Activate node 16
yarn install # Install dependencies
yarn fetchChartData  # Fetch static chart data from the server
```


### Start development environment

```bash
yarn start
```


### Create production build
```bash
yarn build
```
