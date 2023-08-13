import { useEffect, useState } from "react";

//firebase database
import { db } from "config/Firebase";
import { collection, addDoc } from "firebase/firestore";

//components
import Languages from "./language/Languages";
import Translator from "./language/Translator";
import FinishedCard from "./FinishedCard";
import Startcard from "./Startcard";

export default function Gamefield() {
    const colors = ["red", "green", "blue", "orange", "yellow", "white", "pink", "purple"]
    const beginning = [
        {
        index: 0,
        background: "white",
        color: "transparent",
        text: "color"
        }, 
        {
        index: 1,
        background: "white",
        color: "transparent",
        text: "color"
        }, 
                {
        index: 2,
        background: "white",
        color: "transparent",
        text: "color"
        }, 
    ];

    //LANGUAGES
    const {enText} = Languages();
    const [language, setLanguage] = useState(enText);
    const {translateIt} = Translator(language);

    //DATABASE DATA
    const contentCollectionRef = collection(db, "records");
    const [refresh, setRefresh] = useState(false);

    //GAME DATA
    const [gameData, setGameData] = useState(["white", "white"]);
    const [buttonsData, setButtonsData] = useState(beginning);
    const [previousData, setPreviousData] = useState("");

    const [question, setQuestion] = useState(language.start)
    const [GamefieldVisibility, setGameFieldVisibility] = useState("hidden");
    const [startVisibility, setStartVisibility] = useState("visible");
    const [againVisibility, setAgainVisibility] = useState("hidden");
    const [submitVisibility, setSubmitVisibility] = useState("hidden");
    const [submitBtnVisibility, setSubmitBtnVisibility] = useState({opacity: "1", events: "all"});
    const [name, setName] = useState("");

    const [success, setSuccess] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [ratingHistory, setRatingHistory] = useState([]);

    //submit record
    const addSubmit = async() => {
        const d = new Date()
        const year = d.getUTCFullYear()
        const month = (d. getUTCMonth() + 1);
        const day = d.getUTCDate()
        const hour = d.getUTCHours();
        const minutes = d.getUTCMinutes();
        const seconds = d.getUTCSeconds();

        try {
            await addDoc(contentCollectionRef, {
                name: name,
                rating: totalRating,
                totalTime: totalTime,
                date: year + "/" + month + "/" + day + "/" + hour + ":" + minutes + ":" + seconds,
                wrong: wrong
            });

            setRefresh(!refresh);
        }catch(err) {
            console.log(err);
        }
    } 

    //INFO TEXT
    function createInfoText(result) {
        const infotext = document.createElement("p");
        let text;
        let thisclass;
        switch(result){
            case "success":
                text = language.success;
                thisclass = "success";
                break;
            case "wrong":
                text = language.wrong;
                thisclass = "wrong";
                break;
        }
        infotext.innerText = text;
        infotext.className = "infotext" + " " + thisclass;

        document.getElementById("table").appendChild(infotext);

        setTimeout(() => {

            document.getElementById("table").removeChild(infotext);
        }, 1000);
    }

    //START
    function start() {

        //game fiel and menu visibility
        setGameFieldVisibility("visible");
        setStartVisibility("hidden");  
        setAgainVisibility("hidden");

        //choose version
        const version = Math.round(Math.random());

        //main text
        const randomNumber = Math.round(Math.random() * (colors.length - 1));
        const randomColor = colors[randomNumber];

        //random btn 1
        const filteredColors = colors.filter((item) => item != randomColor);
        const randomFilteredNumber = Math.round(Math.random() * (filteredColors.length - 1));
        const filteredColor = filteredColors[randomFilteredNumber];
        
        //random btn 2
        const filteredColors2 = filteredColors.filter((item) => item != filteredColor);
        const randomFilteredNumber2 = Math.round(Math.random() * (filteredColors2.length - 1));
        const filteredColor2 = filteredColors2[randomFilteredNumber2];

        setGameData([
            randomColor,
            filteredColor,
        ])
        
        //prevent repeating
        if(previousData.color === randomColor && previousData.version === version) {
            again();
        }else{
            //V1
            if(version === 0){
                setPreviousData({
                    color: randomColor,
                    version: version
                });

                setQuestion("textv1");
                const buttonColors = [
                    {
                    index: (Math.random() * 1000),
                    background: randomColor,
                    color: "transparent",
                    text: "color",
                    version: 1, 
                    time: Date.now()
                    }, 
                    {
                    index: (Math.random() * 1000),
                    background: filteredColor,
                    color: "transparent",
                    text: "color",
                    version: 1             
                    },
                    {
                    index: (Math.random() * 1000),
                    background: filteredColor2,
                    color: "transparent",
                    text: "color",
                    version: 1             
                    },
                ]

                buttonColors.sort((a, b) => {return a.index - b.index})
                setButtonsData(buttonColors);

            }else{

                setPreviousData({
                    color: randomColor,
                    version: version
                });
                
                setQuestion("textv2")
                const buttonColors2 = [
                    {
                    index: (Math.random() * 1000),
                    background: "white",
                    color: "black",
                    text: randomColor,
                    version: 2,
                    }, 
                    {
                    index: (Math.random() * 1000),
                    background: "white",
                    color: "black",
                    text: filteredColor,
                    time: Date.now(),
                    version: 2             
                    },
                    {
                    index: (Math.random() * 1000),
                    background: "white",
                    color: "black",
                    text: filteredColor2,
                    version: 2             
                    },
                ]

                buttonColors2.sort((a, b) => {return a.index - b.index})
                setButtonsData(buttonColors2);
            }
    } 
    }
    
    function again() {
        start();
    }

    function letsStart() {

        //previous reset
        setSuccess(0);
        setWrong(0);
        setTotalTime(0);
        setTotalRating(0);

        //submit
        setSubmitBtnVisibility({opacity: "1", events: "all"})

        start()
    }

    function validatation(item) {
        if(item.version === 1){    
            if(item.background === gameData[0]) {
                const timespent = (Date.now() - item.time) / 1000;
                setTotalTime(totalTime + timespent);
                setSuccess(success + 1);
                start();
                createInfoText("success");
                

            }else{
                setWrong(wrong + 1);
                createInfoText("wrong");
                
            }
        }

        if(item.version === 2){    
            if(item.text === gameData[1]) {
                const timespent = (Date.now() - item.time) / 1000
                setTotalTime(totalTime + timespent);
                setSuccess(success + 1)
                start();
                createInfoText("success");
                

            }else{
                setWrong(wrong + 1);
                createInfoText("wrong");
            }
        }

    }

    function restartFun() {
        //game fiel and menu visibility
        setGameFieldVisibility("hidden");
        setStartVisibility("visible");

        //previous reset
        setSuccess(0);
        setWrong(0);
        setTotalTime(0);
        setTotalRating(0);
    }

    function submitFun() {
        setSubmitVisibility("hidden");
        setSubmitBtnVisibility({opacity: "0", events: "none"});
    }

    useEffect(() => {

        const rating = (totalTime / success) + (wrong * 4);
        setTotalRating(rating);

        if(success >= 10) {
            //game fiel and menu visibility
            setGameFieldVisibility("hidden");
            setAgainVisibility("visible");

            //rating history
            setRatingHistory([
                ...ratingHistory, rating
            ])
    }
    }, [success]);

    return(
        <>
            <div className='center gamefield'>
                <div className="reset">
                    <button 
                    onClick={restartFun}
                    className="material-symbols-outlined resetbtn" 
                    style={{
                        visibility: GamefieldVisibility
                    }}>restart_alt</button>
                </div>

                <Startcard 
                startVisibility={startVisibility} 
                letsStart={letsStart} 
                language={language} 
                setLanguage={setLanguage}
                />

                <FinishedCard 
                refresh={refresh} 
                language={language} 
                setLanguage={setLanguage}
                againVisibility={againVisibility}
                totalRating={totalRating} 
                submitBtnVisibility={submitBtnVisibility} 
                wrong={wrong} 
                totalTime={totalTime} 
                letsStart={letsStart} 
                ratingHistory={ratingHistory} 
                submitVisibility={submitVisibility} 
                setSubmitVisibility={setSubmitVisibility} 
                addSubmit={addSubmit} 
                submitFun={submitFun} 
                name={name}
                setName={setName} 
                />

                <div 
                className='table center' 
                id="table"
                style={{
                    visibility: GamefieldVisibility
                }}>
                    <h2 
                    style={{
                        position: "absolute",
                        marginTop: "-200px"
                    }}>{translateIt(question)}</h2>
                    <h1 
                    className="mainquestion"
                    style={{
                    color: gameData[1]
                    }}>{translateIt(gameData[0])}</h1>
                    <p 
                    style={{
                        position: "absolute",
                        marginTop: "250px"
                    }}>{success} / 10</p>
                </div>
                
                <div 
                className='answers' 
                style={{
                    visibility: GamefieldVisibility
                }}>
                    {buttonsData.map((item) => {

                        return(
                            <button 
                            key={item.index}
                            onClick={() => {validatation(item)}}
                            className='choiceButton' 
                            style={{
                                color: item.color,
                                background: item.background
                            }}>{translateIt(item.text)}
                            </button>
                        )
                    })}

                </div>
            </div>
        </>
    )
}