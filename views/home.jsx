const React = require('react')
class Home extends React.Component {
  render () {
    return (
      <div>
      <h1> Home Page </h1>
        <a href='/fruits'>Go to Fruits Page</a><br/>
        <a href='/vegetables'>Go to Vegetables Page</a>
      </div>
      );
     }
   }
  module.exports  = Home;