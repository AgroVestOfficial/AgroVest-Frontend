/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllFarms from "@/hooks/ReadHooks/useGetAllFarms";
import useGetFarmInvestors from "@/hooks/ReadHooks/useGetFarmInvestors";
import useGetAllAvailableInvestment from "@/hooks/ReadHooks/useGetAllAvailableInvestment";
import { toast } from "sonner";
import useInvestEthers from "@/hooks/WriteHooks/useInvestEthers";
import { parseEther, formatEther } from "viem";
import { FarmType, InvestmentType, InvestorsType } from "@/utils/types";

const ExploreD = ({ id }: { id: string }) => {
  const { data: allFarms } = useGetAllFarms() as unknown as { data: FarmType[] };
  const { data: farmInvestors } = useGetFarmInvestors(Number(id)) as unknown as {
    data: InvestorsType[];
  };
  const { data: investment } = useGetAllAvailableInvestment() as unknown as {
    data: InvestmentType[];
  };
  const investEthers = useInvestEthers();

  const [currentData, setCurrentData] = useState<any>([]);
  const [investmentData, setInvestmentData] = useState<any>([]);

  useMemo(() => {
    const farmDetail = allFarms?.find((farm: any) => Number(farm.farm_id) === Number(id));
    setCurrentData(farmDetail);
  }, [id, allFarms]);

  useMemo(() => {
    const farmInvestment = investment?.find(
      (investor: any) => Number(investor.farmId) === Number(id)
    );
    setInvestmentData(farmInvestment);
  }, [id, investment]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error("Investment amount must be greater than 0");
      return;
    }
    try {
      await investEthers(Number(id), parseEther(amount.toString()));
      toast.dismiss();
      toast.success("Product added Successfully!");
      setAmount(0);
      onOpenChange();
    } catch (error) {
      toast.dismiss();
      toast.error("Error Adding farm product. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Investors</h1>

      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funding Target</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">
            {Number(investmentData?.minAmount)} ETH
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funds Raised</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">{0.1} ETH</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Investors</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">{1}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <Button
            onPress={onOpen}
            className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
          >
            Invest
          </Button>
        </div>
      </main>

      <main className="grid w-full bg-gray-200 md:h-[400px] md:grid-cols-2">
        <div className="h-full w-full">
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${currentData?.business_image}`}
            alt={currentData?.business_name}
            width={2480}
            height={1360}
            quality={100}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-8 pb-4 pt-8 md:pb-0">
          <h2 className="text-2xl font-semibold text-gray-700">{currentData?.business_name}</h2>
          <p className="text-gray-600">{investmentData?.about}</p>
          <div className="flex w-full flex-col gap-4 border-t border-gray-700 py-5">
            <p className="flex items-center gap-1.5 text-gray-600">
              <FaLocationDot />
              {currentData?.business_location}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <IoLogoWhatsapp />
              {Number(currentData?.business_contact)}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <MdEmail />
              {currentData?.business_email}
            </p>
          </div>
        </div>
      </main>

      {/* table  */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-start text-lg font-medium uppercase text-gray-700">
          Investor Listings
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Investor Id</TableHead>
              <TableHead>Investor Address</TableHead>
              <TableHead>Amount Invested</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmInvestors?.map((investor: any, index: number) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell>{Number(investor.id)}</TableCell>

                <TableCell className="text-start font-medium">{investor.investorAddress}</TableCell>
                <TableCell>{formatEther(investor.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Invest
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="amount" className="ml-1 font-medium text-gray-700">
                      Enter Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Enter amount (ETH)"
                      min="0.000001"
                      step="0.000001"
                      required
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ExploreD;