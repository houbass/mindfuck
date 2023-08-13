import { useEffect, useState } from "react";
import Image from "next/image";

//firebase database
import { db, storage } from "config/Firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

//pic
import czImg from "pic/cz.svg";
import enImg from "pic/en.svg";

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

    const enText = {
        start: "START",
        again: "TRY AGAIN",
        textv1: "which color is written?",
        textv2: "which color is the text?",
        success: "success",
        wrong: "wrong",
        totaltime: "total time",
        rating: "YOUR RATING",
        submit: "SUBMIT",
        submitRating: "SUBMIT YOUR RATING",
        history: "your rating history",
        name: "write your name here",
        errtextName: "*name is mandatory",
        errTextLong: "*name is too long",
        top: "top ratings",
        red: "RED",
        green: "GREEN",
        blue: "BLUE",
        orange: "ORANGE",
        yellow: "YELLOW",
        white: "WHITE",
        pink: "PINK",
        purple: "PURPLE"
    }
    
    const czText = {
        start: "ZAČÍT",
        again: "ZNOVU",
        textv1: "jaká barva je napsaná?",
        textv2: "jakou barvu má text?", 
        success: "dobře",
        wrong: "špatně",
        totaltime: "celkový čas",
        rating: "VÁŠ RATING",
        submit: "ZAZNAMENAT",
        submitRating: "ZAZNAMENAT RATING",
        history: "vaše rating historie",
        name: "zde napiště vaše jméno",
        errtextName: "*jméno je povinné",
        errTextLong: "*jméno je moc dlouhé",
        top: "nejlepší ratingy",
        red: "ČERVENÁ",
        green: "ZELENÁ",
        blue: "MODRÁ",
        orange: "ORANŽOVÁ",
        yellow: "ŽLUTÁ",
        white: "BÍLÁ",
        pink: "RŮŽOVÁ",
        purple: "FIALOVÁ"
    }

    //DATABASE DATA
    //REFRESH FETCHING STATE
    const contentCollectionRef = collection(db, "records");
    const [refresh, setRefresh] = useState(false);
    const [myData, setMyData] = useState([]);

    const [language, setLanguage] = useState(enText);

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
    const [submitErrText, setSubmitErrText] = useState("");

    const [success, setSuccess] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [ratingHistory, setRatingHistory] = useState([]);

    //GET DATA FROM DATABASE
    const getData = async () => {
    try {
      const data = await getDocs(contentCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id, 
      }));
      filteredData.sort((a,b)=>{return a.rating - b.rating});
      const slicedData = filteredData.slice(0, 100);
      setMyData(slicedData);
    } 
    catch (err) {
      console.error(err);
    }
    };

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

    //language choice
    function czFun() {
        setLanguage(czText);
    }

    function enFun() {
        setLanguage(enText);
    }

    //translator
    function translateIt(color) {
        let text;
        switch(color) {
            default:
                text = "WHITE";
                break;
            case "red":
                text = language.red;
                break;
            case "green":
                text = language.green;
                break;
            case "blue":
                text = language.blue;
                break;
            case "orange":
                text = language.orange;
                break;
            case "yellow":
                text = language.yellow;
                break;
            case "white":
                text = language.white;
                break;
            case "pink":
                text = language.pink;
                break;
            case "purple":
                text = language.purple;
                break;
            case "color":
                text = "COLOR";
                break;
            case "textv1":
                text = language.textv1;
                break;
            case "textv2":
                text = language.textv2;
                break;
        }

        return text
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

    async function submitFun() {
        setSubmitVisibility("hidden");
        setSubmitBtnVisibility({opacity: "0", events: "none"});
    }

    function submitValidation() {
        if(name.length === 0){
            setSubmitErrText(language.errtextName)
        }
        if(name.length >= 14){
            setSubmitErrText(language.errTextLong)
        }
        if(name.length > 0 && name.length < 14){
            submitFun();
            addSubmit();
            setSubmitErrText("");
        }
        
    }

    useEffect(() => {

        const rating = (totalTime / success) + (wrong * 4)
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

    //update data list
    useEffect(() => {
        getData();
    }, [refresh]);

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
            <div 
            className="start" 
            style={{
                visibility: startVisibility,
            }}>
                <button className="startBtn" onClick={letsStart}>{language.start}</button>

                <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "10px"
                }}>
                    <Image className="flag" src={enImg} width={30} onClick={enFun} alt="english" title="english"/>
                    <Image className="flag" src={czImg} width={25} onClick={czFun} alt="czech" title="czech"/>
                </div>


            </div>

            <div 
            className="again" 
            style={{
                visibility: againVisibility,
            }}>
                <h3>{language.rating}</h3>
                <h1>{totalRating.toFixed(2)}</h1>
                <button 
                style={{
                    opacity: submitBtnVisibility.opacity,
                    pointerEvents: submitBtnVisibility.events
                }}
                className="startBtn" 
                onClick={() => {setSubmitVisibility("visible")}} 
                >{language.submitRating}</button>
                
                <p>{language.wrong}: {wrong}</p>
                <p>{language.totaltime}: {Math.round(totalTime)}s</p>
                <br/>
                <button className="startBtn" onClick={letsStart}>{language.again}</button>
                
                
                <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "10px"
                }}>
                    <Image className="flag" src={enImg} width={30} onClick={enFun} alt="english" title="english"/>
                    <Image className="flag" src={czImg} width={25} onClick={czFun} alt="czech" title="czech"/>
                </div>
                <br/>
                <p>{language.history}:</p>
                {ratingHistory.map((item) => (
                    <p>{item.toFixed(2)}</p>
                ))}

                <div 
                className="submit" 
                style={{
                    visibility: submitVisibility
                }}
                >
                    <div 
                    className="submitContainer">
                        <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder={language.name}></input>
                        <p className="submitErrText">{submitErrText}</p>
                        <button 
                        onClick={submitValidation}
                        className="startBtn" 
                        style={{
                            width: "fit-content"
                        }}>{language.submit}</button>
                    </div>

                    <button 
                    onClick={() => {setSubmitVisibility("hidden")}}
                    className="material-symbols-outlined closesubmit">close</button>
                </div>
                
                <br />
                <div 
                className="center"
                style={{
                    width: "100%"
                }}>
                    <p>{language.top}: </p>
                    {myData?.map((item, index) => {
                        const number = index + 1;

                        return(
                            <div 
                            className="records" 
                            title={"UTC: " + item.date}
                            key={item.date}>
                                <p>#{number} <strong>{item.name}</strong></p> 
                                <p><strong>{item.rating.toFixed(2)}</strong></p>
                            </div>
                        )
                    })}
                </div>

            </div>

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