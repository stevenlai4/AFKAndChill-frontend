import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './layouts/RegisterPage'

function App() {
  return (

    <Register></Register>
    // <Router>
    //   <HeaderNavigation user={user} setToken={setToken}></HeaderNavigation>
    //   <main style={{marginTop: 100}}></main>
    //   <Switch>
    //     <Route path="/login">
    //       <Login setToken={setToken}></Login>
    //     </Route>
    //     <Route path="/signOut">
    //     <Login/>
    //     </Route>
    //     <Route path="/profile">
    //       <p>ID: {user?._id}</p>
    //       <p>User Name: {user?.username}</p>
    //     </Route>
    //     <Route path="/newPost">
    //       <NewPostPage token={token}/>
    //     </Route>
    //     <Route path="/posts/:postId">
    //       <PostDetailsPage token={token}/>
    //     </Route>
    //     <Route path="/">
    //       <PostsPage/>
    //     </Route>
    //   </Switch>
    // </Router>
  )
}

export default App;
