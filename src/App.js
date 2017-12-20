import React, { Component } from 'react';
import Iframe from 'react-iframe'
import {HotKeys} from 'react-hotkeys';

const keyMap = {
    moveUp: 'up',
		test:'ctrl+x'
}

class App extends Component {

	constructor(props){
		super(props)
		this.state={
			urls:["https://paradeigm.com"],
			stagingUrls:["https://paradeigm.com"]
		}
	}
		
  render() {
		const {urls,stagingUrls} = this.state
		const height = (length,index) => {
			if (length < 3) {
				return "100vh"
			}
			if(length === 3 && (index === 2 || index === 0 )){
				return "50vh"
			}
			if(length === 3 && (index === 1)){
				return "100vh"
			}
			if(length === 4) {
				return "50vh"
			}
		}
		const handlers = {
			'moveUp': (event) => console.log('Move up hotkey called!'),
			'test':(event) => this.setState({urls:urls.concat('https://sdbeer.com'),stagingUrls:stagingUrls.concat('https://sdbeer.com')})
		};
		console.log(urls)
    return (
		<HotKeys keyMap={keyMap} handlers={handlers} focused={true}>
				<div style={{display:"flex"}}>
				{urls.map((url,i) => 
					<div style={{display:"flex",border:"solid rgba(0,0,0,0.1) 1px",width:urls.length > 1 ? "50vw" : "100vw"}} key={i} tabIndex="0"  >
					<div style={{position:"absolute",zIndex:"2",height:"100px"}}>
						<input 
							style={{border:"none",boxShadow:"none",width:"100%",padding:"10px"}}
							value={stagingUrls[i]} 
							onChange={e=>{
								var newState = this.state
								newState.stagingUrls[i] = e.target.value
								this.setState(newState)
							}}
							onKeyPress={e => {
								if(e.key==='Enter'){
									var newState = this.state
									newState.urls[i] = newState.stagingUrls[i]
									this.setState(newState)
								}
							}}
						/>
					</div>
						<Iframe 
							width={urls.length > 1 ? "50vw" : "100vw"}
							height={height(urls.length,i)}
							url={url}
							id="myid"
							 display="initial"
							position="relative"
							allowFullScreen
						/>
					</div>
				)}
			</div>
			</ HotKeys>
    );
  }
}

export default App;
