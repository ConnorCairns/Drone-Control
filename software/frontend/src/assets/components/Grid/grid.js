import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './grid.css'
import './addCmds'
import createProgram from './addCmds';
import GridElement from './GridElement/GridElement'

const ResponsiveGridLayout = WidthProvider(Responsive)

export class Grid extends React.Component {
  
    
    state = {
        items: [],
        layout: [],
        counter: 0,
        variableData: {},
    };  

    sendMsg = () => {
        //Currently simulator does not respond but leaving here incase we need it in the future
        const handleResponse = function(e) {
            // console.log(e.data)
        }
        window.addEventListener("message", handleResponse, false)

        let program = createProgram(this.state.layout, this.state.variableData)
    
        var iframe = document.getElementById("simulator")
        iframe.contentWindow.postMessage(JSON.stringify({message: "new program", program: program}), "*")

        //Dont think this works but we arent recieving messages yet anyway
        return () => window.removeEventListener("message", handleResponse)
    }

    onFormChange = (event) => {
        var newvariableData = this.state.variableData
        var itemId = event.target.getAttribute("data-item")
        var type = event.target.getAttribute("data-type")
        
        if (type === "value") {
            newvariableData[itemId].value = event.target.value
        } else {
            newvariableData[itemId].variable = event.target.value
        }

        this.setState({ variableData: newvariableData },this.updateStorage)
    }

    onBreakPointChange = (breakpoint, cols) => {
        this.setState({breakpoint: breakpoint, cols: cols},this.updateStorage)
    }

    onLayoutChange = (layout) => {
        var sorted = [...layout]
        
        //On layout change need to modify order of items array so we know what comes first when passing to AUTONAVx
        if (this.state.items.length > 1) {
            sorted.sort((x, y) => {
                //JS sort functions just need a negative or positive num to sort
                //This will find y pos of both items then negate them to get order
                return layout.find(obj => obj.i === x.i).y - layout.find(obj => obj.i === y.i).y
            })
        }
        this.setState({layout: sorted},this.updateStorage)
    }

    removeItem(item) {
        this.setState({items: this.state.items.filter(x => x !== item)},this.updateStorage)
    }

    onDrop = (layout, layoutItem, event) => {
        //This will retrieve data added to event when block is dragged
        var blockType = event.dataTransfer.getData("blockType")
        var uniqueName = blockType + "." + this.state.counter

        var newvariableData = this.state.variableData
        if (["for loop", "while"].includes(blockType)) {
            newvariableData[uniqueName] = {value: 1, variable: "i"}
            layoutItem.w = 2
        } else if (["turn left", "turn right"].includes(blockType)) {
            newvariableData[uniqueName] = {value: 45}
        } else {
            newvariableData[uniqueName] = {value: 1}
        }

        layoutItem.i = uniqueName
        layoutItem.isResizable = false

        var sorted = [...layout]
        
        //On layout change need to modify order of items array so we know what comes first when passing to AUTONAVx
        if (this.state.items.length > 1) {
            sorted.sort((x, y) => {
                //JS sort functions just need a negative or positive num to sort
                //This will find y pos of both items then negate them to get order
                return layout.find(obj => obj.i === x.i).y - layout.find(obj => obj.i === y.i).y
            })
        } else {
            sorted = layout
        }

        this.setState({items: sorted, 
            layout: sorted,
            counter: this.state.counter + 1,
            variableData: newvariableData},this.updateStorage)

    }
    updateStorage(){
        localStorage.removeItem("state")
        localStorage.setItem("state",JSON.stringify(this.state))
    }


     //React Life Cyle
    componentDidMount(){
        const state = localStorage.getItem("state")
        if(state){
            this.setState(JSON.parse(state))
        }
            
            
    
         
        }
         
    
    
    
        
      


    render() {
        return (
            <div className="w-full bg-gray-600 rounded">
                <div className="py-1 bg-gray-500 rounded">
                    <button className="block ml-auto mr-1 bg-blue-500 rounded py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={this.sendMsg}>
                        <span className="text-white px-2">load code</span>
                    </button>
                </div>
                <ResponsiveGridLayout onLayoutChange={this.onLayoutChange}  onBreakpointChange={this.onBreakPointChange} isDroppable={true} onDrop={this.onDrop} {...this.props}>
                    {this.state.items.map((item) => (<GridElement key={item.i} item={item} variableData={this.state.variableData} onFormChange={this.onFormChange} removeItem={this.removeItem.bind(this, item)} />))}
                </ResponsiveGridLayout>
            </div>
        )
    }
}

Grid.defaultProps = {
    className: "layout",
    cols: {lg: 1, md: 1, sm: 1, xs: 1, xxs: 1},
    rowHeight: 40,
    vertical: false
}