import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';

const invoices = [
    {
      signature: "INV001",
      block: "Paid",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Credit Card",
      by: "John Doe"
    },
    {
      signature: "INV002",
      block: "Pending",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "PayPal",
      by: "Jane Smith"
    },
    {
      signature: "INV003",
      block: "Paid",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Bank Transfer",
      by: "Alice Johnson"
    },
    {
      signature: "INV004",
      block: "Paid",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Cash",
      by: "Bob Brown"
    },
    {
      signature: "INV005",
      block: "Pending",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Credit Card",
      by: "Emily Davis"
    },
    {
      signature: "INV006",
      block: "Paid",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "PayPal",
      by: "Michael Wilson"
    },
    {
      signature: "INV007",
      block: "Paid",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Bank Transfer",
      by: "Sophia Martinez"
    },
    {
      signature: "INV008",
      block: "Pending",
      time: new Date("2024-03-30T10:30:00Z"), 
      instruction: "Cash",
      by: "David Garcia"
    },
  ];
  

function MainTable() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e : any) => {
    setSearchQuery(e.target.value);
  };

  // Filter invoices based on the search query
  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.signature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.instruction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.by.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to calculate time difference in a human-readable format
  const calculateTimeDifference = (invoiceTime: any, currentTime: any) => {
    const difference = Math.abs(currentTime - invoiceTime);
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };
  return (
    <>
      <h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        Transactions
      </h1>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '30px'}}>
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ width: "20%", minWidth: "200px" }}
      />
      </div>
 
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Signature</TableHead>
            <TableHead className="text-left">Block</TableHead>
            <TableHead className="text-left">Time</TableHead>
            <TableHead className="text-right">Instruction</TableHead>
            <TableHead className="text-right">By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={invoice.signature}>
              <TableCell className="font-medium">{invoice.signature}</TableCell>
              <TableCell className="text-left">{invoice.block}</TableCell>
              <TableCell className="text-left">{calculateTimeDifference(invoice.time, currentTime)}</TableCell>
              <TableCell className="text-right">{invoice.instruction}</TableCell>
              <TableCell className="text-right">{invoice.by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default MainTable;
