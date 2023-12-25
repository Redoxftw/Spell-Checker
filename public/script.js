async function CopyText() {
    // Get the textarea-output element
    const charvalOutput = document.getElementById("textarea-output");

    // Get the hidden input element
    const hiddenInput = document.getElementById("hidden-input");

    // Set the value of the hidden input to the text from textarea-output
    hiddenInput.value = charvalOutput.value;

    // Select the text in the hidden input
    hiddenInput.select();

    // Copy the selected text to the clipboard3
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Text copied to clipboard!');
        } else {
            alert('Failed to copy text to clipboard.');
        }
    } catch (err) {
        console.error("Unable to copy text to clipboard: ", err);
    }
}



// creating the api fucntion 
async function spellCheckAndCorrect() {

    // Get the input text from the textarea
    const inputText = document.getElementById("textarea-input");
    try {
        // Make a POST request to the Node Sever 
        const response = await fetch('/checkforspell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText.value,
            }),
        });
        if (response.ok) {
            const data=await response.json(); // this variable contains the corrected text
            console.log(data);
            document.getElementById("textarea-output").value=data.text;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
