import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Select, InputBase, MenuItem, TextField, FormControl, Button,Typography  } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000
      },
    formControl: {
      minWidth:100
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.text.secondary, 0.05),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    register: {
        display: 'flex', 
        justifyContent: 'space-between' 
    },
    registerForm: {
        flexDirection:'column',
        display: 'flex'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function Register(props){
    const classes = useStyles()
    const history = useHistory();

    const [search, setSearch] = useState("")
    const [genderPref, setGenderPref] = useState("")
    const [gender, setGender] = useState("")
    const [file, setFile] = useState()

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSearch = event => {
        event.preventDefault()
        props.onSearch({search})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
        // cognito register api
        await Auth.signUp({
            username:email,
            password,
            attributes: {
            email: email,
            name:username
            }
        });
        console.log("Successfully Register")
        history.push("/");
        } catch (error) {
            console.error(error.message)
        }
    };

 return (
    <section className="section auth">
        <form onSubmit={handleSubmit}>
            <div className={classes.register}>
                <div> 
                    <h1>Register</h1>
                    <div className={classes.registerForm}>
                        <TextField 
                            required={true}
                            type="text"
                            label="username" 
                            variant="outlined"
                            className="input"
                            id="username"
                            value={username}
                            autoComplete="on"
                            style={{marginTop: '20px'}}
                            onChange={e => setUserName(e.target.value)}
                        />
                    <TextField
                        required={true}
                        label="email"   
                        variant="outlined"
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        autoComplete="on"
                        style={{marginTop: '20px'}}
                        onChange={e => setEmail(e.target.value)}
                    />
                        <TextField
                            required={true}
                            label="password" 
                            variant="outlined"
                            className="input"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="on"
                            style={{marginTop: '20px'}}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            required={true}
                            label="confirm password" 
                            variant="outlined"
                            className="input"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            autoComplete="on"
                            style={{marginTop: '20px'}}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
        
                <div>
                <input 
                        filename={file} 
                        onChange={e => setFile(e.target.files[0])} 
                        type="file" 
                        accept="image/*"/>
                </div>
            </div>
            
            <h1>Preferences</h1>
            <p>What is your gender?</p>
            <FormControl className={classes.formControl}>
              <Select defaultValue="other" required={true} onChange={e => setGender(e.target.value)}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <p>What gender do you want to chill with?</p>
            <FormControl className={classes.formControl}>
              <Select defaultValue="other" required={true} onChange={e => setGenderPref(e.target.value)}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <p>Games to chill with:</p>
            <div className={classes.search} onSubmit={onSearch}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <p className="control">
                <Button variant="contained" color="primary" type="submit" id="Register">Submit</Button>
            </p>
        </form>
    </section>
);
}