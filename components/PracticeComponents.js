import React, {useState} from 'react';

export function Paragraphs() {

const [isVisible, setIsVisible] = useState(true);

    function toggleState() {setIsVisible (prev => (!prev));}

return (
    <>
    {isVisible && <p>This is the sometimes visible paragraph</p>}
    <p>This is always visible</p>

    <button onClick={toggleState}>Toggle Visibility</button>
    </>
)

}

export function Counter() {

  const [count, setCount] = useState(0);

  function increment() {

    setCount((prev) => prev + 1);
  }



return (
    <>
    <h1>Current count: {count}</h1>

<button onClick={increment}>Increment</button>

</>
);  

}


export function NameInput() {

        const [name, setName] = useState('');
        function changeName(e) {
            setName(e.target.value) 
        }

    return (
    <>
        <p>What is your name</p>
        <input value={name} onChange={changeName}></input>

        <p>Your name is: {name || 'type your name'}</p>

    </>
    )
}

export function ChooseList() {
    return (
<>
<p>Select a list to view:</p>
<form>
    <select type='checkbox'>
        <option value = 'shogunMain.json'>Main Character List</option>
        <option value = 'shogun2nd.json'>Secondary Character List</option>
    </select>
<input type='submit'>View List</input>
</form> 
</>
);

}