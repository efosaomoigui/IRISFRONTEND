import State from '../common/State.json'

function GetStates(){
    const statesInNigeria = JSON.parse(JSON.stringify(State));
    return statesInNigeria;
}

export default GetStates