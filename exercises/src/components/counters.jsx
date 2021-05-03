import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
    };

    handleIncrement = () => {
        console.log('count');
        this.setState({count: this.state.count + 1})
    }
 
    render() {
        return (
            <div>
              <span className={this.getBadgeClases()}>{this.formatCount()}</span>
              <button onClick={this.handleIncrement} className='btn btn-secondary btn-sm'>Increment</button>
            </div>
          );
    }

    getBadgeClases() {
        let clases = 'badge m-2 badge-';
        clases += (this.state.count === 0) ? 'warning' : 'primary';
        return clases;
    }

    formatCount() {
        const {count} = this.state;
        return count === 0 ? 'Zero' : count;
    }
}
 
export default Counter;