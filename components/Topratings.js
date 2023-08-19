import { useEffect, useState } from "react";

//firebase database
import { db, storage } from "config/Firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";





export default function Topratings({ language, refresh }) {

    //DATABASE DATA
    //REFRESH FETCHING STATE
    const contentCollectionRef = collection(db, "records");
    const [myData, setMyData] = useState([]);
    const [ratingFixed, setRatingFixed] = useState([]);

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
          setRatingFixed(
            slicedData.map((el) => el.rating.toFixed(2))
        )
        } 
        catch (err) {
          console.error(err);
        }
        };


    //show rating on hover
    function mouseEnterFun(item, index) {
        setRatingFixed(
            ratingFixed.map((el, elindex) => {
                if(elindex === index){
                    return item.rating.toFixed(5);
                }

                return el
            })
        )
    }

    //hide rating on hover
    function mouseLeaveFun(item, index) {
        setRatingFixed(
            ratingFixed.map((el, elindex) => {
                if(elindex === index){
                    return item.rating.toFixed(2);
                }

                return el
            })
        )
    }


    //update data list
    useEffect(() => {
        getData();
    }, [refresh]);

    return(
        <>
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
                            <p 
                            onMouseEnter={() => mouseEnterFun(item, index)} 
                            onMouseLeave={() => mouseLeaveFun(item, index)} 
                            ><strong>{ratingFixed[index]}</strong></p>
                        </div>
                    )
                })}
            </div>
        
        </>
    )
}