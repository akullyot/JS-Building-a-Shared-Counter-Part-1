async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    const refreshButton = document.querySelector('#refresh-button');
    const resetButton = document.querySelector('#reset-button');


    let response = await fetch('http://localhost:9001/counter');
    let JSONresponse = await response.json();
    let countValue = JSONresponse.value;
    const startingValue = JSONresponse.value;
    function patchFetch()
    {
        //Increment in the db.json
        fetch('http://localhost:9001/counter', 
        {
            method: 'PATCH',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            (
                {
                    value: countValue
                }
            )
        });
        console.log('counter.value changed to ' + countValue);
    }
     function increment()
    {

        countValue++;
        countContainer.textContent = countValue;
        patchFetch();
    }

     function decrement()
    {
        countValue--;
        countContainer.textContent = countValue;
        patchFetch();
    }
     function refresh()
    {
        countValue = JSONresponse.value;
        countContainer.textContent = countValue;
        patchFetch()
        alert("I do nothing now since we are patching db.json")
    }
    function reset()
    {
        countValue = startingValue;
        countContainer.textContent = countValue;
        patchFetch()
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    refreshButton.addEventListener('click', refresh);
    resetButton.addEventListener('click', reset);
    countContainer.textContent = countValue;
}
//Run the JS
main();