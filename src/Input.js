
function Input(props) {
    
    return (
        <div className='seed'>
        Input a seed (number between 100 000 - 999 999 999 999)<br/>

        <div
          ref={props.errorRef}
          className='error'
        >
          Invalid input
        </div>

        <div>
          <button
            className='seed-input-button'
            onClick={() => props.randomizeValue()}
          >🔀</button>
          <input 
            ref={props.inputRef}
            className='seed-input' 
            type='text'
            min='100000' 
            max='999999999999'
            minLength='6'
            maxLength='12' 
            placeholder='Enter a seed'
            onInput={(e) => props.getValue(e)}
            onKeyDown={(e) => props.generatePerlinKey(e)}
          ></input>
          <button 
            className='seed-input-button'
            onClick={() => props.generatePerlinButton()}
          >Enter</button>
        </div>

        <input
          className='seed-size'
          type='range'
          defaultValue={3}
          min='0'
          max='6'
          list='sizes'
          onChange={(e) => props.handleSize(e)}
        ></input>

        <label
          className='seed-size-label'
        >x{props.size/32}</label>
      </div>
    );
}

export default Input;