# MERN stack auth with Google Sign-in

This repositary contains code of Mern stack authentication system with log in with google feature. I have developed this small project so that anyone can have their own authentication system in minutes. You have to just follow few steps and you will be good to go with your own auth.

## Installation

Clone the repositary and cd to folder where you have cloned it.

### Frontend

```bash
npm install
```
create .env file and put your google client id there like below. Don't forget to put your access URL credentials in google console (Here it is http://localhost:5173/)
```bash
VITE_GOOGLE_CLIENT_KEY = yourclientid
```
To run server
```bash
npm run dev
```
---
### Backend

```bash
npm install
```
create .env file, put your JWT secret and database URL there like below
```bash
JWT_SECRET = yoursecret
MONGOOSE_URL = yourdatabaseurl
```
To run server
```bash
supervisor index.js
```
After following these steps , your project is ready. You are good to go.
 
## Usage
* Once you perform all the above steps, make sure there are not errors in console and everything is running.
* There will be homepage, login and signup. Fill the fields make an api call and after successfully logging in/ signing up you will be having a user in context which can be accessed throughout the app.
* User state of context will be having his name, and id so now you can access user using this piece of code anywhere and use as you want.
```javascript
import {useContext} from 'react'
import AuthContext from "../context/AuthContext";

function HomePage(){
const { user } = useContext(AuthContext);
}
```
* Using Context API for state management so user will be logged in until localstorage is not cleared.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

[MIT](https://github.com/ishan249/mern-stack-auth-with-google-signin/blob/master/LICENSE)
