import Link from "next/link"


export default function Welcomepage() {


    return(
        <>
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "800px",
                width: "100%",
            }}>
                <h1 style={{fontSize: "50px"}}>LET'S MINDFUCK YOURSELF</h1>
                <br />
                <p style={{fontSize: "25px", width: "70%"}}>So you think you are special? Test your cognitive functions and and try to be faster then others.</p>
                <Link href="/game">
                TEST ME
                </Link>


            </div>
        </>
    )
}