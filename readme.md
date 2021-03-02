###To Run the Project Locally

```
yarn install
yarn start
```

The site should load on localhost:8088.

####Challenges

1. Where to get live crypto data?
    - Initial research took me to CoinAPI - https://www.coinapi.io/Pricing - but they were too costly for a demo project.
    - Eventually, I stumbled upon the following project: https://github.com/redcap3000/crypto-socket
    - This led be understand I could connect directly to BitFinex to get real-time Websocket data - https://docs.bitfinex.com/docs/ws-general
    - I took the top 12 crypto currencies by market cap and most of them were on BitFinex.  Unfortunately, BNB, LINK, and BCH were not available, but for this demo it would suffice.
2. Create a professional UI design
    - I wanted something professional to showcase a good user experience.  After some research I found: https://themeforest.net/item/cryptorio-blockchain-technology-dashboard-psd-template/22303847 which I purchased
    - I made some small design adjustments and needed to get some high quality SVG crypto icons - https://cryptologos.cc/
3. Setting up my local environment
    - We are dealing with real-time data - the only real choice is React
    - I setup my local environment with my typical webpack build process
    - I setup Webpack Dev Server so people not running Vagrant/Docker would be able to easily run this demo
    - I used Redux for State Management
4. Final Touches
    - The UI was good, but when prices updated it was not really apparent.  I needed something to "flash" for the user to see it better.  Ended up using React Animate OnChange - https://www.npmjs.com/package/react-animate-on-change
    - React wanted to re-render all child components as the parent data was updated which caused all tickers to flash when just one updated.  React.memo to the rescue.
    - Added responsive/mobile styling with a few breakpoints
5. Next Steps
    - Update the graphs (which are pictures currently) to be real-time as well.  This is a paid feature - not included in the DEMO :)

##
** Total Build Time: 7 hours
