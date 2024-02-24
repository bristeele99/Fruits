const React = require('react');

const DefaultLayout = require('../layout/Default');

class Signup extends React.Component{
    render() {
        return(
            <DefaultLayout>
                <form action="/users/signup" method="POST">
                <fieldset>
                    <legend>New User</legend>
                    <label htmlFor="username">USERNAME:</label>
                    <input 
                    type="text"
                    name="username"
                    required
                    />
                    <label htmlFor="password">PASSWORD:</label>
                    <input
                    type="password"
                    name="password"
                    required
                    />
                    <input 
                    type="submit"
                    value="Create Account"
                    />
                </fieldset>
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = Signup;