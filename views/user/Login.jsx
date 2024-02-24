const React = require('react');

const DefaultLayout = require('../layout/Default');

class Login extends React.Component{
    render() {
        return(
            <DefaultLayout>
                <form 
                action="/users/login"
                method="POST"
                >
                <fieldset>
                    <legend>User Login</legend>
                    <label
                    htmlFor ="username">USERNAME:</label>
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
                    value="Login"
                    />
                </fieldset>
                </form>
            </DefaultLayout>
        )
    }
}
module.exports = Login;