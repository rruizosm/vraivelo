
const url = 'https://xuxuzavsyloyrbjgshmu.supabase.co/functions/v1/payment';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eHV6YXZzeWxveXJiamdzaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjI1NTIsImV4cCI6MjA4MzUzODU1Mn0.d2EQeqXy3_nr6s9iV7CRbFr7GhFobNy-Cjz3huUM6mA';

console.log('Fetching', url);

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'Origin': 'http://localhost:5173'
    },
    body: JSON.stringify({
        cartItems: [{ model: "Test Bike", brand: "TestBrand", price: "10.00€", quantity: 1, size: "M", image: "/test.png" }]
    })
})
    .then(async res => {
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Body:', text);
    })
    .catch(err => console.error('Error:', err));
