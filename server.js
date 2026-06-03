const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- IN-MEMORY DATABASE ---
let tickets = [
  {
    id: 'TKT-1001',
    subject: 'Cannot login to my account',
    description: 'I keep getting an invalid password error even though I just reset it.',
    customerName: 'John Doe',
    customerId: 'CUST-8492',
    email: 'john.doe@example.com',
    phone: '+1 (555) 019-8372',
    status: 'Open',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    replies: [
      { sender: 'Admin', text: 'Hi John, we are looking into this. Could you please try clearing your browser cache?', time: new Date(Date.now() - 7200000).toISOString() }
    ]
  },
  {
    id: 'TKT-1002',
    subject: 'Billing discrepancy on invoice',
    description: 'I was charged twice for my subscription this month. Need a refund.',
    customerName: 'Alice Smith',
    customerId: 'CUST-2931',
    email: 'alice.smith@example.com',
    phone: '+1 (555) 928-1123',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    replies: []
  }
];

// --- API ENDPOINTS ---

app.get('/api/tickets', (req, res) => {
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sortedTickets);
});

app.post('/api/tickets', (req, res) => {
  const newTicket = {
    id: `TKT-${1000 + tickets.length + 1}`,
    subject: req.body.subject,
    description: req.body.description,
    customerName: req.body.name || 'Anonymous',
    customerId: req.body.customerId || 'N/A',
    email: req.body.email || 'N/A',
    phone: req.body.phone || 'N/A',
    status: 'Open',
    createdAt: new Date().toISOString(),
    replies: []
  };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

app.post('/api/tickets/:id/reply', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).send('Ticket not found');

  const reply = {
    sender: req.body.sender, // 'Admin' or 'Customer'
    text: req.body.text,
    time: new Date().toISOString()
  };
  
  ticket.replies.push(reply);
  res.status(201).json(reply);
});

app.patch('/api/tickets/:id/status', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).send('Ticket not found');

  ticket.status = req.body.status;
  res.json(ticket);
});

// Fallback to index.html for SPA routing (though not strictly needed here)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
