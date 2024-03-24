import './App.css';
import Main from './components/main/main.js';
import './components/navbar/navbar.js'
import SearchBar from './pages/search.js';
function App() {
    return (
        <div className="App overflow-y-scroll no-scrollbar ">
            {/* <Main/> */}
           <SearchBar/>
        </div>
    );
}

export default App;
