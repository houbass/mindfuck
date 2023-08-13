import Image from "next/image";

//pic
import czImg from "pic/cz.svg";
import enImg from "pic/en.svg";
import itImg from "pic/it.svg";
import spImg from "pic/sp.svg";

//components
import Languages from "./language/Languages";

export default function Startcard({ startVisibility, letsStart, language, setLanguage }) {

    //LANGUAGES
    const {itText, czText, enText, spText} = Languages();

    return(
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
                <Image className="flag" src={enImg} width={30} onClick={() => {setLanguage(enText)}} alt="english" title="english"/>
                <Image className="flag" src={spImg} width={27} onClick={() => {setLanguage(spText)}} alt="spanish" title="spanish"/>
                <Image className="flag" src={itImg} width={25} onClick={() => {setLanguage(itText)}} alt="italian" title="italian"/>
                <Image className="flag" src={czImg} width={25} onClick={() => {setLanguage(czText)}} alt="czech" title="czech"/>
            </div>
        </div>

    )
}