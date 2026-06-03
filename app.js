const { createApp, ref, onMounted, nextTick } = Vue;

createApp({
  setup() {
    const currentRole = ref('customer');
    const tickets = ref([]);
    const activeTicket = ref(null);
    const isCreatingTicket = ref(false);
    const replyText = ref('');
    
    const newTicket = ref({ 
      name: '',
      customerId: '',
      email: '',
      phone: '',
      subject: '', 
      description: '' 
    });

    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/tickets');
        tickets.value = await res.json();
        
        if (activeTicket.value) {
          const updated = tickets.value.find(t => t.id === activeTicket.value.id);
          if (updated) activeTicket.value = updated;
        }
      } catch (err) { console.error(err); }
    };

    const selectTicket = (ticket) => {
      activeTicket.value = ticket;
      isCreatingTicket.value = false;
      nextTick(() => { feather.replace(); });
    };

    const submitTicket = async () => {
      try {
        const res = await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTicket.value)
        });
        if (res.ok) {
          const created = await res.json();
          newTicket.value = { name: '', customerId: '', email: '', phone: '', subject: '', description: '' };
          isCreatingTicket.value = false;
          await fetchTickets();
          selectTicket(tickets.value.find(t => t.id === created.id));
        }
      } catch (err) { console.error(err); }
    };

    const addReply = async () => {
      if (!replyText.value.trim() || !activeTicket.value) return;
      try {
        const res = await fetch(`/api/tickets/${activeTicket.value.id}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: currentRole.value === 'admin' ? 'Admin' : 'Customer',
            text: replyText.value
          })
        });
        if (res.ok) {
          replyText.value = '';
          await fetchTickets();
        }
      } catch (err) { console.error(err); }
    };

    const updateStatus = async (ticketId, status) => {
      try {
        await fetch(`/api/tickets/${ticketId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        await fetchTickets();
      } catch (err) { console.error(err); }
    };

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const getStatusClass = (status) => {
      switch(status) {
        case 'Open': return 'bg-red-100 text-red-700';
        case 'In Progress': return 'bg-blue-100 text-blue-700';
        case 'Resolved': return 'bg-emerald-100 text-emerald-700';
        case 'Closed': return 'bg-slate-200 text-slate-700';
        default: return 'bg-slate-100 text-slate-700';
      }
    };

    onMounted(async () => {
      await fetchTickets();
      isCreatingTicket.value = true;
      feather.replace();
    });

    return {
      currentRole, tickets, activeTicket, isCreatingTicket,
      newTicket, replyText, selectTicket, submitTicket, addReply, updateStatus,
      formatDate, getStatusClass
    };
  }
}).mount('#app');
