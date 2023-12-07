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
