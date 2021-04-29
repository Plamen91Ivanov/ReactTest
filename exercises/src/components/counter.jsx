import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: []
    };

    renderTags() {
        if (this.state.tags.length ===0) return <p>There no tags!</p>;

        return <ul> {this.state.tags.map(tag => <li key={tag}>{ tag }</li>)}  </ul>

    }
 
    render() {
        return (
            <div>
                {this.renderTags()}
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