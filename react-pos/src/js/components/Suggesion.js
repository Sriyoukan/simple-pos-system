import React from 'react'


function changeBackground(e) {
  e.target.style.background = 'gray';
}

function changeBack(e){
  e.target.style.background="white"
}

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.name}>
      <div style={{border:'0.01px solid gray',cursor:"pointer",width:300}}  onClick={()=>props.setProduct(r.name)} onMouseOver={changeBackground} onMouseLeave={changeBack}>{r.name}</div>
    </li>
  ))
  return <ul style={{listStyleType:"none",paddingLeft:300,paddingTop:5}}>{options}</ul>
}

export default Suggestions