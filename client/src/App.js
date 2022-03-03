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
import MultPresentation from "./components/pages/multPresentation";


function App() {
    const [user, setUser] = useState('blank')
    const [userInfo, setUserInfo] = useState('')
    const [topMults, setTopMults] = useState('')
    const [newMults, setNewMults] = useState('')

    function GetTopMults() {
        axios.get(`http://localhost:3001/get_top_mults`, {}).then((response) => {
            setTopMults(response.data)
            localStorage.setItem('topMults', JSON.stringify(response.data))
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
            localStorage.setItem('newMults', JSON.stringify(response.data))
            console.log('новые мульты', response.data)
            return response.data
        }).then((res) => {
                console.log('new mults wad loaded', (res))


            }
        )
    }

    const [comments,setComments] = useState('')

    const getComments = () => {
        axios.get('http://localhost:3001/comments', {}).then((response) => {
            setComments(response.data)
        })
        console.log(('comments получены'));
    }

    useEffect(() => {
        setUser(localStorage.getItem('login'))
        GetUserInfo()
        GetNewMults()
        GetTopMults()
        getComments()
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
    const [currentMultForPresentation, setCurrentMultForPresentation] = useState('')
    return (
        <div className="App">
            <Router>
                <Header user={user}/>
                <Routes>
                    <Route path="/" element={<MainPage topMults={topMults} newMults={newMults}
                                                       setCurrentMultForPresentation={setCurrentMultForPresentation}/>}/>
                    <Route path="/main/*" element={<MainPage topMults={topMults} newMults={newMults}
                                                             setCurrentMultForPresentation={setCurrentMultForPresentation}/>}/>
                    <Route path={'/reg'} element={<RegisterPage user={user} setUser={setUser}/>}/>
                    <Route path={'/log'} element={<LoginPage GetUserInfo={GetUserInfo} user={user} setUser={setUser}/>}/>
                    <Route path={'/animation'}
                           element={<MultPresentation comments={comments} getComments={getComments} setComments={setComments} setCurrentMultForPresentation={setCurrentMultForPresentation} currentMultForPresentation={currentMultForPresentation}    multInfo={currentMultForPresentation} multframes = {currentMultForPresentation.frames}/>}/>
                    <Route path={'/animation_creation'}
                           element={<AnimationCreationPage user={user} setUser={setUser}/>}/>
                    <Route path={'/my_page'}
                           element={<MyPage setCurrentMultForPresentation={setCurrentMultForPresentation}
                                            user={user}
                                            setUser={setUser}
                                            userInfo={userInfo !== undefined ? userInfo : JSON.parse(localStorage.getItem('userInfo'))}/>}/>

                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
