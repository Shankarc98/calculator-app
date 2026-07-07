import React, {useState, useEffect, useRef} from "react";
import Button from "./Components/Button"

function App(){  

  const[scr, setScr] = useState("");    
  const[cal, setCal] = useState("");  
  const op  = useRef('');
  const isOperatorAllowed = useRef(false); 
  const isDecimalAllowed = useRef(true);
  const first = useRef(0);
  const second = useRef(0); 
  const ans= useRef(0);  
  const decimalPresent = useRef(false);
  const decimalCalc = useRef(0);

 
  function handleClick(val){
    
    if(scr.length == 0){
      cleared();
    }

    isOperatorAllowed.current = true; 
    

    let v = val - '0';
    setScr(prev => prev + val);

    if(decimalPresent.current){      
      decimalCalc.current--;
      v = v * Math.pow(10, decimalCalc.current);
      first.current = first.current + v; 
      
    }
    else{
      first.current = first.current * 10 + v;            
    } 
        
       
    if(op.current != ''){
        calculation(); 
        setCal(ans.current.toFixed(4));
    }    
  }

  function decimal(){    

    if(isDecimalAllowed.current){
      
      setScr(prev => prev + ((first.current === 0 && second.current === 0 && scr.length == 0)? "0." : "."));
      
      isDecimalAllowed.current = false;
      isOperatorAllowed.current = false;
      decimalPresent.current = true; 
    }


  }

  function arithmetic(a){        

    decimalPresent.current = false;
    decimalCalc.current = 0;

    if(isOperatorAllowed.current){      
      op.current = a;

      setScr(prev => prev + a);         
      
      second.current = (ans.current !== 0 ? ans.current : first.current); 

      first.current = 0; 

      isDecimalAllowed.current = true;
      isOperatorAllowed.current = false; 
    }

  }

  function equalTo(){
                         
    setCal(ans.current); 
    
  }

    function isDigit(last){
    return last >= '0' && last <= '9';
  }
    

  function cleared(){
    setScr("");
    setCal("");
    op.current = '';
    isOperatorAllowed.current = false;
    isDecimalAllowed.current = true; 
    first.current = 0; 
    ans.current = 0; 
    second.current = 0; 
    decimalCalc.current = 0;
    decimalPresent.current = false;
  }

  function calculation(){
    
    switch (op.current) {
      case '+':
        ans.current = second.current + first.current;
        break;
      
      case '-' :
        ans.current = second.current - first.current;
        break;

      case 'x':        
        ans.current = second.current * first.current;
        break;
      
      case '/':
        ans.current = second.current / first.current;
        break; 

      case '%': 
        ans.current = second.current % first.current;        
        break;

      default:        
        break;
    }                
    

  }
  return <div className="container">
    <div className = "display-container">
      <input type="text" size="20" className="dis" value={scr}></input>
      <div className="calc"><p className = "answer">{cal}</p></div>
    </div>
    
    <div className="btncont">
      <Button onClick={() => handleClick('1')}  disp="1"/>
      <Button onClick={() => handleClick('2')}  disp="2"/>
      <Button onClick={() => handleClick('3')} disp="3"/>
      <Button onClick={() => handleClick('4')} disp="4"/>
      <Button onClick={() => handleClick('5')} disp="5"/>
      <Button onClick={() => handleClick('6')} disp="6"/>
      <Button onClick={() => handleClick('7')} disp="7"/>
      <Button onClick={() => handleClick('8')} disp="8"/>
      <Button onClick={() => handleClick('9')} disp="9"/>
      <Button onClick={() => handleClick('0')} disp="0"/>
      <Button onClick={() => arithmetic('+')}  disp="+" />
      <Button onClick={() => arithmetic('-')} disp="-" />
      <Button onClick={() => arithmetic('x')}disp="x" />
      <Button onClick={() => arithmetic('/')} disp="/" />
      <Button onClick = {() => arithmetic('%')} disp = "Rem" />  
      <Button onClick={equalTo}  disp="=" />
      <Button onClick={cleared} disp="C" />
      <Button onClick={decimal} disp="." />
    </div>
  </div>
  
}

export default App; 