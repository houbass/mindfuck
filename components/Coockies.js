import { useEffect, useState } from "react"

// LIBRARIES
import useLocalStorageState from "use-local-storage-state";

// COMPONENTS
import { apiKeys } from "@/config/apiKeys";

export default function Coockies() {

    // STATES FOR COOCKIES SETTING
    const [askedForCoockies, setAskedForCoockies] = useLocalStorageState('askedForCoockies', {defaultValue: false });
    const [coockiesAccepted, setCoockiesAccepted] = useLocalStorageState('coockiesAccepted', {defaultValue: false });
    const [bannerClass, setBannerClass] = useState("0px 200px")

    // LOAD GOOGLE ANALYTICS
    function loadGoogleAnalytics() {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${apiKeys.googleId}`;
        script.async = true;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];

        function gtag(){
        dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', `${apiKeys.googleId}`, {
        page_path: window.location.pathname
        })
    }

    // CHECK IF USER AGREE WITH COOCKIES
    useEffect(() => {
        if(coockiesAccepted === true && askedForCoockies === true) {
        loadGoogleAnalytics();
        }
    }, [coockiesAccepted])



    useEffect(() => {

        if(askedForCoockies === false) {
            setBannerClass("0 0")
        }else{
            setBannerClass("0 200px");
        }

    }, [askedForCoockies])


    return(
        <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            bottom: "0px",
            width: "100%",
            translate: bannerClass,
            transition: "1s"
        }}>
            <div 
            style={{
                width: "100%"
            }}>
                <div
                style={{
                    padding: "0px 20px 20px 20px",
                }}>
                    <div className="coockiesContainer" >
                        <p style={{fontSize: "22px"}}>This site is using coockies.</p>

                        <div 
                        className="coockiesBtnContainer" >
                            <button 
                            className="coockiesBtn1"
                            onClick={() => {
                                setAskedForCoockies(true);
                                setCoockiesAccepted(true);
                            }}
                            >I agree</button>

                            <button 
                            className="coockiesBtn2"
                            onClick={() => {
                                setAskedForCoockies(true);
                                setCoockiesAccepted(false);
                            }}
                            >I decline</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}