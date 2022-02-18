import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/pages/register_page";
import LoginPage from "./components/pages/login_page";
import MainPage from "./components/pages/main_page";
import AnimationCreationPage from "./components/pages/animation_creation_page";
import {useState, useEffect} from "react";
import MyPage from "./components/pages/my_page";
import axios from "axios";


function App() {
    const [user, setUser] = useState('blank')
    const [userInfo, setUserInfo] = useState('')
    const [topMults,setTopMults]=useState('')
    const [newMults,setNewMults]=useState('')

    function GetTopMults() {
        axios.get(`http://localhost:3001/get_top_mults`, {}).then((response) => {
            setTopMults(response.data)
            localStorage.setItem('setTopMults', JSON.stringify(response.data))
            console.log(response.data)
            return response.data
        }).then((res) => {
                console.log('top mults wad loaded', (res))


            }
        )
    }

    function GetNewMults() {
        axios.get(`http://localhost:3001/get_new_mults`, {}).then((response) => {
            setNewMults(response.data)
            localStorage.setItem('setNewMults', JSON.stringify(response.data))
            console.log(response.data)
            return response.data
        }).then((res) => {
                console.log('new mults wad loaded', (res))


            }
        )
    }

    useEffect(() => {
        setUser(localStorage.getItem('login'))
        GetUserInfo()
        GetTopMults()
        GetNewMults()
    }, [4, ,])


    const GetUserInfo = () => {
        axios.get(`http://localhost:3001/user_info/${localStorage.getItem('login')}`, {}).then((response) => {
            setUserInfo(response.data)
            localStorage.setItem('userInfo', JSON.stringify(response.data))
            console.log(response.data)
            return response.data
        }).then((res) => {
                console.log(`${user}'s info was loaded:`, (res))


            }
        )

    }
    return (
        <div className="App">
            <Router>
                <Header user={user}/>
                <Routes>
                    <Route path="/" element={''}/>
                    <Route path="/main/*" element={<MainPage topMults={topMults} newMults={newMults}/>}/>
                    <Route path={'/reg'} element={<RegisterPage user={user} setUser={setUser}/>}/>
                    <Route path={'/log'} element={<LoginPage user={user} setUser={setUser}/>}/>
                    <Route path={'/animation_creation'}
                           element={<AnimationCreationPage user={user} setUser={setUser}/>}/>
                    <Route path={'/my_page'} element={<MyPage user={user} setUser={setUser}
                                                              userInfo={userInfo !== undefined ? userInfo : JSON.parse(localStorage.getItem('userInfo'))}/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
