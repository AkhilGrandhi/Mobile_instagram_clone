import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import Logo from './logo.png';
import Post from './Post';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme)=> ({
  paper:{
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2,4,3),
  },
}));





function App() {
      const classes = useStyles();
      const [modalStyle] = useState(getModalStyle);  
      const [posts, setPosts] = useState([]);
      const [open, setOpen] = useState(false);
      const [openSignIn, setOpenSignIn] = useState(false);
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');
      const [user, setUser] = useState(null);

      useEffect(() =>{
          const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                //user has logged in...
                console.log(authUser);
                setUser(authUser);                         
            } else {
                //user has logged out...
                setUser(null);
            }
          })

          return () => {
            //perform some cleanup actions
            unsubscribe();
          }
      }, [user, username]);


      useEffect(() => {
        //Fetching data from database
        db.collection('posts')
          .orderBy('timestamp', 'desc')        
          .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
              id: doc.id, 
              post: doc.data()
            })))
        })
       }, [])

       const signup = (event) => {

        event.preventDefault();
        
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser)=> {
            return authUser.user.updateProfile({
              displayName: username
            })
          })
          .catch((error) => alert(error.message))
        setOpen(false);  
      }

      const signIn = (event) => {
        event.preventDefault();

        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message))

        setOpenSignIn(false);  

      }
       

  return (
    <div className="app">    
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >          
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                <center>
                  <img className="app__headerImage" src={Logo} alt="Logo" />
                  
                </center> 
                  <Input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    /> 
                  <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />                   
                  <Button type="submit" onClick={signup} >Sign Up</Button> 
              </form>
            </div>                    
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
        >          
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                <center>
                  <img className="app__headerImage" src={Logo} alt="Logo" />                  
                </center> 
                  
                  <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />                   
                  <Button type="submit" onClick={signIn} >Sign In</Button> 
              </form>
            </div>                    
        </Modal>


      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt="Logo" />

        { 
          user ? (
          <Button onClick={() => auth.signOut()} >Log Out</Button>
          ):(
            <div className="app__logincontainer">
              <Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
              <Button onClick={() => setOpen(true)} >Sign Up</Button>
            </div>
            
          )
        }

      </div>

      {
        user?.displayName  ? (
          <ImageUpload username={user.displayName} />
        ): (
            <h3>Sorry you need to Log In to Upload</h3>
        )
      }

      <div className="app__posts">
        <div >
          {
            posts.map(({id, post}) => (
              <Post key={id} user={user} username={post.username} postId={id} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>
        

            

        
      </div>


      
     

     
      
      

    </div>
  );
}

export default App;
