import React, { useEffect, useState } from 'react'

const Transactions = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(()=>{
    setTimeout(() => {
      let tickets1 = JSON.parse(localStorage.getItem('Tickets'));

      tickets1 = tickets1.reverse()
      let i = 0
      const finalTickets = []
      let a 
      if(tickets1.length > 6){
        a = 5
      }else{
        a = tickets1.length
      }
      for (i ;i < a ; i++){
        finalTickets.push(tickets1[i])
      }

      setTickets(finalTickets)
      }, 1000)
    
  }, [])
  return (
    <div className='mt-auto text-center transactions'>
        <h3 className='f-600' style={{fontSize: '1.2rem'}}>Latest Transactions</h3>
        {tickets.length<=0 ? (
          <p>No transactions yet.</p>
        ): (
          <div className='px-4 mt-3'>

            {tickets.map(ticket => {
              return (
                <div key={ticket._id} className='d-flex justify-content-between mb-3'>
                  <span>&#8358; {ticket.value}</span>
                  <span>{new Date(ticket.createdAt).toDateString()}</span>
                </div>
              )
            })}
          </div>
        )}
    </div>
  )
}

export default Transactions