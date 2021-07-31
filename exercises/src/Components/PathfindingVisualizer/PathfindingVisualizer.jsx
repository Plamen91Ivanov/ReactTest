import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {dfs} from '../algorithms/dfs'
import {astarNew} from '../algorithms/aStarNew'

import './PathfindingVisualizer.css';

const START_NODE_ROW = 8;
const START_NODE_COL = 8;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 15;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      value: 20,
      speedValue: 120
    };
  }
  
componentDidMount() { 
    const grid = this.getInitialGrid();
    this.setState({grid});
  } 
  
 getInitialGrid() {
  const grid = [];
  for (let row = 0; row < this.state.value; row++) {
    const currentRow = [];
    for (let col = 0; col < this.state.value; col++) {
      currentRow.push(this.createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

 createNode(col, row) {
  return {
    col,
    row,  
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    cost: {
      F: Infinity,
      G: Infinity,
      H: Infinity,
    },
  };
};

handleChange = (e) =>{
  this.setState({value: e.target.value})
  
  const grid = this.getInitialGrid();
  this.setState({grid});
  console.log(this.state.value);
};

handleSpeedValueChange = (e) =>{
  this.setState({speedValue: e.target.value}) 
  const textElement = document.getElementById('speedText');
    if (this.state.speedValue > 130 && this.state.speedValue <= 150) {
      textElement.style.color = '#FFD502'
    }
    if (this.state.speedValue > 150 && this.state.speedValue <= 170) {
      textElement.style.color = '#FFAB02'
    }
    if (this.state.speedValue > 170 && this.state.speedValue <= 190) {
      textElement.style.color = '#FF5A02'
    }
    if (this.state.speedValue > 190) {
      textElement.style.color = '#FF0000'
    } 
    if (this.state.speedValue < 110 && this.state.speedValue >= 90) {
      textElement.style.color = '#D0FF02'
    }
    if (this.state.speedValue < 90 && this.state.speedValue >= 70) {
      textElement.style.color = '#99FF02'
    }
    if (this.state.speedValue < 70 && this.state.speedValue >= 50) {
      textElement.style.color = '#5BFF02'
    }
    if (this.state.speedValue < 50 && this.state.speedValue >= 10) {
      textElement.style.color = '#1BFF00'
    }
};

handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
};

handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
};

handleMouseUp() {
    this.setState({mouseIsPressed: false});
};

animateDFS(visitedNodes){
  this.disableAllButtons();
  this.addResetButton()
    for (let i = 0; i <= visitedNodes.length - 1; i++) {
        setTimeout(() => {
          if (i === visitedNodes.length - 1) {
            this.enableAllButtons();
            this.removeResetButton();
            this.disableAlgorithmButtons();
          }
          const node = visitedNodes[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, this.state.speedValue * i);
      }
};

animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  this.disableAllButtons();
  this.addResetButton();
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.state.speedValue * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, this.state.speedValue * i);
    }
  }

animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        if (i === nodesInShortestPathOrder.length  - 1) {
          this.enableAllButtons();
          this.removeResetButton();
          this.disableAlgorithmButtons();
        }
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, this.state.speedValue * i);
    }
  }

visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

visualizeDFS() {
      const {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodes = dfs(grid,startNode,finishNode);
      this.animateDFS(visitedNodes);
  }

visualizeAStar() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = astarNew(grid,startNode,finishNode);
        this.animateDijkstra(visitedNodes[0], visitedNodes[1]);
  }
      
  disableAllButtons(){
    document.getElementById('changeAnimationSpeed').disabled = true;
    const buttons = document.getElementsByClassName('sm-btn')
     for (let index = 0; index < buttons.length; index++) {
        buttons[index].disabled = true;
        buttons[index].className = "sm-btn disabled";
     }
  }
  disableAlgorithmButtons(){  
    const algoButtons = document.getElementsByClassName('algorithm-btn');
    console.log(algoButtons);
    for (let index = 0; index < algoButtons.length; index++) {
        algoButtons[index].disabled = true;
        algoButtons[index].className = 'sm-btn algorithm-btn algorithm-button-disabled';
    }
  }
  
  enableAllButtons(){
    document.getElementById('changeAnimationSpeed').disabled = false;
    const buttons = document.getElementsByClassName('sm-btn')
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].disabled = false;
      if (index > 3) {
        buttons[index].className = "glow-on-hover sm-btn algorithm-btn";
      }
      else{
        buttons[index].className = "glow-on-hover sm-btn";
      }
    }
  }

addResetButton(){
        let btn = document.createElement('button');
        btn.onclick = () => {
          this.stop()
        };
        btn.className = "sm-btn resetBtn";
        btn.innerHTML = "RESET"
        document.getElementById('resetBtn').appendChild(btn);
} 
removeResetButton(){
      const buttons = document.getElementsByClassName('glow-on-hover');
     buttons[buttons.length - 1].remove();
} 

stop(){
    window.location.reload();
    } 

clearBoard(){
    const grid = this.getInitialGrid();
    this.setState({grid});
    this.enableAllButtons();
    // const newGrid = getNewGrid(this.state.grid);
    // this.setState({grid: newGrid});
    // const {grid} = this.state;
    for (let i = 0; i < this.state.value ; i++) {
        for (let x = 0; x < this.state.value ; x++) {
            document.getElementById(`node-${i}-${x}`).className = 'node';
            if (START_NODE_COL === x && START_NODE_ROW === i) {
                const startNode = grid[START_NODE_ROW][START_NODE_COL];
                document.getElementById(`node-${i}-${x}`).className = 'node node-start';
                startNode.isStart = true;
            }
            if (FINISH_NODE_COL === x && FINISH_NODE_ROW === i) {
                document.getElementById(`node-${i}-${x}`).className = 'node node-finish';
                const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
                finishNode.isFinish = true;
            }
        }
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
      <div  className='algo-btn'>
      <button className="glow-on-hover sm-btn" onClick={() => this.clearBoard()}>
         Clear Board
        </button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.visualizeDijkstra()}>
          Dijkstra's
        </button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.visualizeDFS()}>
          DSF's
        </button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.visualizeAStar()}>
          AStar
        </button>
      </div>
      <div id="resetBtn"></div>
      <div className="slider">
        {/* <input id="changeArrLength" className = "sliderArrayLength"
           type="range"
           min={10}
           max={30}
           value={this.state.value} 
           onChange={this.handleChange}
             />
              <div>{this.state.value}</div> */}
             <input id="changeAnimationSpeed" className="sliderAnimationSpeed"
           type="range"
           min={5}
           max={250}
           value={this.state.speedValue} 
           onChange={this.handleSpeedValueChange}
             />
            <div id='speedText'>speed {this.state.speedValue}ms</div>
          </div>
      <div id="resetBtn"></div>
        <div className="grid board">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>  this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}>
                      </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); 
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGrid = (grid) => {
    const newGrid = grid.slice(); 
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            const newNode = {
                col,
                row,  
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previousNode: null,
              };
              newGrid[row][col] = newNode;
        }        
    }
    return newGrid;
}
