import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <h1 id="MenuTitle">User Page</h1>
            <Link to="/"><button class="MenuButton" role="button">User Profile</button></Link>
            <h1></h1>
            <Link to="/UserPlaylist"><button class="MenuButton" role="button">User Playlist</button></Link>
            <h1></h1>
            <Link to="/SuggestedMovies"><button class="MenuButton" role="button">Suggested Movies</button></Link>
            <h1></h1>
            <Link to="/"><button class="MenuButton" role="button">Rate Movies</button></Link>
            <h1></h1>
            <Link to="/"><button class="MenuButton" role="button">Settings</button></Link>
        </div>
    )
}

export default Menu