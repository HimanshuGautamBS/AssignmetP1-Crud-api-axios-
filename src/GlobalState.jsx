import {AppBar, Toolbar,Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
const GlobalState=()=>{

return  <header style={{padding:"30px"}}> 
<AppBar> 
  <Toolbar > 
    <NavLink to="/" style={{padding:'20px' , color:"goldenrod"}}>Logout</NavLink>  
     <Typography variant="h6" component="h1" style={{marginLeft:"20px" , color:"InactiveBorder"}}>Website</Typography>
     </Toolbar></AppBar>
</header>

}

export {GlobalState}