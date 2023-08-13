import Image from "next/image";

//pic
import czImg from "pic/cz.svg";
import enImg from "pic/en.svg";
import itImg from "pic/it.svg";
import spImg from "pic/sp.svg";

//components
import Languages from "./language/Languages";
import Topratings from "./Topratings";
import { useEffect, useState } from "react";


export default function FinishedCard({ 
    againVisibility, 
    refresh, 
    language, 
    setLanguage, 
    totalRating, 
    submitBtnVisibility, 
    wrong, 
    totalTime, 
    letsStart, 
    ratingHistory, 
    submitVisibility, 
    setSubmitVisibility, 
    addSubmit, 
    submitFun, 
    name,
    setName
    }) {

    //LANGUAGES
    const {itText, czText, enText, spText} = Languages();

    //STATES
    const [submitErrText, setSubmitErrText] = useState("");

    //SUBMIT VALIDATION
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

    return(
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
                <Image className="flag" src={enImg} width={30} onClick={() => {setLanguage(enText)}} alt="english" title="english"/>
                <Image className="flag" src={spImg} width={27} onClick={() => {setLanguage(spText)}} alt="spanish" title="spanish"/>
                <Image className="flag" src={itImg} width={25} onClick={() => {setLanguage(itText)}} alt="italian" title="italian"/>
                <Image className="flag" src={czImg} width={25} onClick={() => {setLanguage(czText)}} alt="czech" title="czech"/>
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
            <Topratings refresh={refresh} language={language} />

        </div>



    )
}