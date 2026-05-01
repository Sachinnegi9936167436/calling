fetch('http://localhost:3000/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    studentName: 'Real Test Student',
    studentPhone: '+91 8888888888',
    transactionId: 'XYZ987'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
