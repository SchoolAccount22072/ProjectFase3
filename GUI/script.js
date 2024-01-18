// This is a mock function simulating a barcode scan and lookup
function scanProduct() {
    // In a real-world scenario, you would get this barcode from a scanner or user input
    var barcode = document.getElementById('barcodeInput').value;

    // Simulate a database with a simple object
    // In a real-world scenario, you would make an AJAX call to your server here
    var database = {
        "123456789": { description: "Product 1 Description" },
        "987654321": { description: "Product 2 Description" },
        // Add more products as needed
    };

    // Simulate a product lookup
    var product = database[barcode];
    if (product) {
        document.getElementById('productDescription').innerText = product.description;
    } else {
        document.getElementById('productDescription').innerText = "Product not found.";
    }
}

function startScanner() {
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: document.querySelector('#barcode-scanner'),    // Or '#barcode-scanner-video' depending on your preference
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment" // or "user" for front-facing camera
            },
        },
        decoder : {
            readers : ["code_128_reader"] // List of all supported readers https://github.com/serratus/quaggaJS#decoder
        },
    }, function(err) {
        if (err) {
            console.log(err);
            alert('Error starting Quagga:', err);
            return;
        }
        console.log('Quagga initialized');
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        // This function is called when a barcode is detected
        // You can access the barcode data with data.codeResult.code
        var barcode = data.codeResult.code;
        
        // Stop Quagga scanner
        Quagga.stop();

        // Call a function to handle the barcode
        handleBarcode(barcode);
    });
}

function handleBarcode(barcode) {
    // Simulate a database with a simple object
    var database = {
        "123456789": { description: "Product 1 Description" },
        "987654321": { description: "Product 2 Description" },
        // Add more products as needed
    };

    // Simulate a product lookup
    var product = database[barcode];
    if (product) {
        document.getElementById('productDescription').innerText = product.description;
    } else {
        document.getElementById('productDescription').innerText = "Product not found.";
    }
}

function addProductWithDate() {
    var productName = document.getElementById('productInput').value;
    var productDate = document.getElementById('dateInput').value;

    if (productName && productDate) {
        var productList = document.getElementById('productList');
        var newProduct = document.createElement('li');
        newProduct.innerText = productName + ' --- ' + productDate;
        productList.appendChild(newProduct);

        // Clear the inputs after adding
        document.getElementById('productInput').value = '';
        document.getElementById('dateInput').value = '';
    } else {
        alert('Voer zowel een productnaam als een datum in.');
    }
}

function addProductWithDate() {
    var productName = document.getElementById('productInput').value;
    var productDate = document.getElementById('dateInput').value;
    var currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the same format as the input

    if (productName && productDate) {
        var productList = document.getElementById('productList');
        var newProduct = document.createElement('li');
        newProduct.innerText = productName + ' --- ' + productDate;

        // Compare dates and apply the appropriate class
        if (productDate < currentDate) {
            newProduct.classList.add('expired');
        } else if (productDate > currentDate) {
            newProduct.classList.add('future');
        } // If the date is the current date, no additional class is added

        productList.appendChild(newProduct);

        // Clear the inputs after adding
        document.getElementById('productInput').value = '';
        document.getElementById('dateInput').value = '';
        if (productName && productDate) {
            // ... previous code ...
    
            // Send the data to the server
            fetch('/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productName, productDate }),
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Success message from the server
            })
            .catch((error) => {
                console.error('Error:', error);
            });    
    
    } else {
        alert('Voer zowel een productnaam als een datum in.');
    }
    }}


const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});