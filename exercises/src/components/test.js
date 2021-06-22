import TestDate from './testDate'

function Test(props) { 
    return (
        <div>
        <div>{props.title}</div>
        <TestDate amound={props.amound} />
        </div>
    )
}
export default Test;