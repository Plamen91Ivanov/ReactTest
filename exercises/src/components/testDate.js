import MoreTest from './MoreTest'

function TestDate(props){
    return (
        <div>
        <h1>{props.amound}</h1>
        <MoreTest amound= {props.amound}/>
        </div>
    );
}

export default TestDate;