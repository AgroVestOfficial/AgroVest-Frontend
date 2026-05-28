import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { farmInvestments } from "@/utils/products";
import { Button } from "@nextui-org/react";

const DAO = () => {
  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-medium uppercase text-darkgreen md:text-xl">Governance</h1>

      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Proposals</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">10</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Locked Funds</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">980</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Delegated Votes</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">5</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Votes</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">1</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <Button className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen">
            Get Involved
          </Button>
        </div>
      </main>

      {/* table  */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-center text-lg font-medium uppercase text-gray-700">
          Recent Proposals
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Investor Address</TableHead>
              <TableHead>Fund&apos;s Target</TableHead>
              <TableHead>Farm ID</TableHead>
              <TableHead>Amount Deposited</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmInvestments.slice(0, 3).map((farm, index) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell className="text-start font-medium">{farm.farmName}</TableCell>
                <TableCell>{farm.fundsTarget}</TableCell>
                <TableCell>{farm.investors}</TableCell>
                <TableCell>{farm.amountRaised}</TableCell>
                <TableCell>{farm.balance}</TableCell>
                <TableCell className="text-center">{farm.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </section>
  );
};

export default DAO;
