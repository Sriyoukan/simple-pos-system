import React from 'react'


function changeBackground(e) {
  e.target.style.background = 'blue';
}

function changeBack(e){
  e.target.style.background="white"
}

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.name}>
      <div style={{ width:100, borderTopWidth:1,borderTopStyle:"solid",cursor:"pointer"}}  onClick={()=>props.setProduct(r.name)} onMouseOver={changeBackground} onMouseLeave={changeBack}>{r.name}</div>
    </li>
  ))
  return <ul style={{listStyleType:"none",paddingLeft:300,paddingTop:5}}>{options}</ul>
}

export default Suggestions