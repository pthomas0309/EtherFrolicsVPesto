import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import MissionHistoryMultiRow from "./FormComponents/MissionHistoryMultiRow"


function MissionHistory () {

    const dispatch = useDispatch();
    const history = useHistory();

    const missionHistoryItems = useSelector(store => store.missionHistoryReducer)

    const [lastMission, setLastMission] = useState('')

    const [amountOfMissionHistories, setAmountOfMissionHistories] = useState([1])

    // state variable to track if at least 1 section
    // of mission history data has been submitted to the DB
    const [missionHistorySubmitted, setMissionHistorySubmitted] = useState(false);

    // increases the amount of mission history elements in the array above
    function addMissionHistoryItem() {

        setAmountOfMissionHistories(amountOfMissionHistories =>
            [...amountOfMissionHistories, amountOfMissionHistories.length + 1])

        // missionHistorySubmitted set to true enables
        // NEXT button to navigate to the next page
        setMissionHistorySubmitted(true);

    }

    // function handleChange(e) {
    //     setLastMission(e.target.value)
    // }

    function handleNext(e) {
        e.preventDefault

        dispatch({
            type: "PUT_LAST_MISSION",
            payload: {
                lastMission: lastMission
            }
        })
        
         dispatch({
             type: 'POST_MISSION_HISTORY_ITEMS',
             payload: missionHistoryItems

         })
       

        history.push('/education')
    }



    return(
        <div>
            {/* <label htmlFor="lastMissionInput">When was your last mission trip?</label>
            <select required name="lastMission" id="lastMissionInput" onChange={handleChange}>
                
                <option value="1">Within the last year</option>
                <option value="2">Within the last 2 years</option>
                <option value="3">Within the last 3 years</option>
                <option value="4">Within the last 4 years</option>
                <option value="5">Within the last 5 years</option>
                <option value="6">More than 5 years ago</option>
                </select> */}

                <br></br>
                <br></br>
                <br></br>

            {/* maps a state array to render relevant number of work history forms */}
            {amountOfMissionHistories.map((education, i) => {
                return (
                    <MissionHistoryMultiRow key={i} addMissionHistoryItem={addMissionHistoryItem} />
                )
            })}

        <button disabled={!missionHistorySubmitted ? true : false} onClick={handleNext}>Next</button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default MissionHistory




