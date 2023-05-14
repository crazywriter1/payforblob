document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pfbFrom');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const ipAddress = document.getElementById('ipAddress').value;
        const gasLimit = document.getElementById('gasLimit').value;
        const feeInput = document.getElementById('fee').value;
        const nameSpaceId = document.getElementById('nameId').value;
        const data = document.getElementById('data').value;

        // Perform validation or further processing logic
        if (ipAddress === '') {
            alert('Please enter your ip address.');
            return;
        }

        if (gasLimit === '') {
            alert('Please enter your gas limit.');
            return;
        }

        if (feeInput === '') {
            alert('Please enter your fee.');
            return;
        }

        if (nameSpaceId === '') {
            alert('Please enter your nameSpaceId.');
            return;
        }

        if (data === '') {
            alert('Please enter your data.');
            return;
        }

        const url = `http://${ipAddress}:8080/pfb`;
        const payload = {
            namespace_id: nameSpaceId,
            data: data,
            gas_limit: parseInt(gasLimit),
            fee: parseInt(feeInput),
            ip_address: ipAddress,
        };
        const requestOptions = {
            method: 'POST',
            type: 'text/plain;charset=utf-8',
            body: JSON.stringify(payload)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                alert(`Your PFB Has been sent successfully. Your txhash is ${data['txhash']}`)
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Your PFB Has not been sent successfully. Please make sure your your port is opened`)

            });
        console.log(ipAddress, gasLimit, feeInput, nameSpaceId, data)
        // ... perform validation for other fields if needed ...

        // You can also submit the form programmatically using the following line:
        // form.submit();
    });

    function generateRandHexEncodedNamespaceID() {
        const nID = new Uint8Array(8);
        crypto.getRandomValues(nID);
        return Array.from(nID).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    function generateRandMessage() {
        const lenMsg = Math.floor(Math.random() * 101);
        const msg = new Uint8Array(lenMsg);
        crypto.getRandomValues(msg);
        return Array.from(msg).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    function generateRandomData() {
        let seed = 5405;
        const prevRandom = Math.random; // Save the previous Math.random function

        // Define a new random number generator based on the seed
        Math.random = function () {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        const nID = generateRandHexEncodedNamespaceID();
        const msg = generateRandMessage();

        document.getElementById('nameId').value = nID;
        document.getElementById('data').value = msg;
        Math.random = prevRandom; // Restore the original Math.random function
    }

// Add a click event listener to the button
    const button = document.getElementById('generateButton');
    button.addEventListener('click', generateRandomData);

});
